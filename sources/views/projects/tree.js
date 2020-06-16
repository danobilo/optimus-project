import { DHXView } from "dhx-optimus";
import { getProjects, createProjects, deleteProject, addProjectType } from "../../api/projectsApi";
import { ProjectsFormStruct } from "./projects_form";

export class ProjectTreeView extends DHXView {
					
	render() {

		var pId = null;

		// initialize dhtmlx menu
		let menu = new dhtmlXMenuObject({
			context: true, // render it as context menu
		});
		this._loadMenu(menu);
		menu.attachEvent("onClick", (id) => this.app.callEvent("ProjectMenuClick", [id]));	
		menu.attachEvent("onCheckboxClick", (id, state) => {
			
			this.app.callEvent("ProjectMenuCheckboxClick", [id, state, menu.getItemText(id)]);

			// allow checkbox to be checked
			return true;
		});	

		this.ui = this.root.attachTreeView();
		this.ui.enableDragAndDrop(true);
		this.ui.enableContextMenu(true);		

		this.ui.attachEvent("onClick", (id) => {
			pId = id;

			this.app.callEvent("loadProjectForm", [id]);
			this.app.callEvent("loadDocumentGrid", [id]);

		});

		this.attachEvent("UpdateProjectText", (id, text) => {
			this.ui.setItemText(id, text);
		});

		this.addService("ProjectTree", {
            selected:() => pId
        });

		this.ui.attachEvent("onContextMenu", function (id, x, y, ev) {

			this.selectItem(id);

			// menu.forEachItem(function(itemId){

			// 	var type = menu.getItemType(itemId);
			// 	if(type == "checkbox"){
			// 		var state = this.getUserData(id, menu.getItemText(itemId)) ? true: false;
			// 		menu.setCheckboxState(itemId, false);
			// 	}

			// });

			menu.setCheckboxState(1, this.getUserData(id,"Video") == "1" ? true:false);
			menu.setCheckboxState(2, this.getUserData(id,"Audio") == "1" ? true:false);
			menu.setCheckboxState(3, this.getUserData(id,"Moodle") == "1" ? true:false);

		// show context menu here
			menu.showContextMenu(x, y);

		// prevent default context menu
			return false;
		});		

		this._load();		

		this.attachEvent("ProjectMenuCheckboxClick", (context_id, state, name) => {

			var value = state ? "0" : "1";
			var ids = this._addSubItemsType(this.ui.getSelectedId(), context_id, value, name);
			this._addProjectType(ids, context_id, value);	
			
		});

		
		this.attachEvent("ProjectMenuClick", (id) => {

			if(id == "main"){
				this._addProject();

			} else if( id == "sub"){

				if (!this._itemIsSelected()) {
					dhtmlx.alert({
						type: "alert-error",
						text: "First select an Item.",
						title: "Error!",
					});
					return;
				}				
				this._addProject(this.ui.getSelectedId(), 1);
			} else if(id == "delete") {
				this._deleteItem(this.ui.getSelectedId());
			}
		});
		
		this.attachEvent("ProjectToolbarClick", (id) => {

			switch (id) {
				case "main":
					this._addProject();
					break;

				case "sub":
					if (!this._itemIsSelected()) {
						dhtmlx.alert({
							type: "alert-error",
							text: "First select an Item.",
							title: "Error!",
						});
						return;
					}				
					this._addProject(this.ui.getSelectedId(), 1);

					break;

				case "delete":
					if (!this._itemIsSelected()) {
						dhtmlx.alert({
							type: "alert-error",
							text: "First select an Item.",
							title: "Error!",
						});
						return;
					}
					this._deleteItem(this.ui.getSelectedId());

					break;

				case "search":
					break;

				default:

					this.ui.clearAll();
					this._load(id);

					break;
			}
		});
	}

	_addSubItemsType(tree_id, id, value, name, ids = []) {	
		
		if(tree_id == null)
			return;
		
		this.ui.setUserData(tree_id, name, value);		

		let subItems = this.ui.getSubItems(tree_id);

		ids.push(tree_id);
		subItems.forEach(element => {			
			this._addSubItemsType(element, id, value, name, ids);
		});

		return ids;
	}

	_load(id = 0) {
		getProjects(this.ui, id);
	}

	_loadMenu(menu){
		let struct = [
			{ id: "new", text: "New", items:[
				{ id: "main", text: "Root Item"},
				{ id: "sub", text: "Sub Item"},
			]},
			{id: "type", text: "Type", items:[
				{ id: "1", type: "checkbox", text: "Video"},
				{ id: "2", type: "checkbox", text: "Audio"},
				{ id: "3", type: "checkbox", text: "Moodle"},
			]},
			{ id: "delete", text: "Delete"}
		];

		menu.loadStruct(struct);
	}

	_addProject(item_id = 0, level = 0){

		this.window = new dhtmlXWindows();	
		let window_1 = this.window.createWindow("add_root_win", 0, 0, 400, 150);
		window_1.center();
		window_1.setText("Add New Category");

		let form = window_1.attachForm();
		this._loadForm(form, "sub");

		form.attachEvent("onButtonClick", () => {
			form.setItemValue("level", level);
			form.setItemValue("parent_id", item_id);
			let project = form.getFormData();
			createProjects(this, project);
		});
	}

	_refresh() {
		this.ui.clearAll();
		this._load();
	}

	_loadForm(form, id) {
		form.load(ProjectsFormStruct[id], () => {
			form.setItemFocus("title");
		});
	}

	_addItem(id, title, parent) {
		this.ui.addItem(id, title, parent);		
		this.ui.selectItem(id);	
	}

	_deleteItem(id) {
		this.ui.deleteItem(id);
		deleteProject(id);
	}

	_itemIsSelected() {
		return this.ui.getSelectedId() > 0;
	}

	_addProjectType( ids, type, value){
		
		let data = { ids:ids, type_id: type, n_value: value };
		addProjectType(data);

	}

}


	