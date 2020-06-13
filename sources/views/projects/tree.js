import { DHXView } from "dhx-optimus";
import { getProjects, createProjects, deleteProject } from "../../api/projectsApi";
import { ProjectsFormStruct } from "./projects_form";

export class ProjectTreeView extends DHXView {
					
	render() {

		// initialize dhtmlx menu
		let menu = new dhtmlXMenuObject({
			context: true, // render it as context menu
		});
		this._loadMenu(menu);
		menu.attachEvent("onClick", this.menuClicked);

		this.ui = this.root.attachTreeView();
		this.ui.enableDragAndDrop(true);
		this.ui.enableContextMenu(true);
		this._load();		

		this.ui.attachEvent("onContextMenu", function (id, x, y, ev) {

			this.selectItem(id);
		// show context menu here
			menu.showContextMenu(x, y);

		// prevent default context menu
			return false;
		});		

		this.attachEvent("ProjectToolbarClick", (id) => {
			let item_id = this.ui.getSelectedId();
			let is_item_id = item_id > 0;

			switch (id) {
				case "main":
					this._addProject();
					break;

				case "sub":
					if (!is_item_id) {
						dhtmlx.alert({
							type: "alert-error",
							text: "First select an Item.",
							title: "Error!",
						});
						return;
					}				
					this._addProject(item_id, 1);

					break;

				case "delete":
					if (!is_item_id) {
						dhtmlx.alert({
							type: "alert-error",
							text: "First select an Item.",
							title: "Error!",
						});
						return;
					}
					this._deleteItem(item_id);

					break;

				default:
					break;
			}
		});
	}

	_load() {
		getProjects(this.ui);
	}

	_loadMenu(menu){
		let struct = [
			{ id: "new", text: "New", items:[
				{ id: "main", text: "Main Item"},
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

	_selectedItemCheck(item_id) {
		let is_item_id = item_id > 0;
		if (!is_item_id) {
			dhtmlx.alert({
				type: "alert-error",
				text: "First select an Item.",
				title: "Error!",
			});
			return;
		}
	}

	menuClicked(id) {

		switch (id) {
	
			case "main":	
				this._addProject();
				break;
		}
	}
}


	