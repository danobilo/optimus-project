import { DHXView } from "dhx-optimus";
import { getProjects, createProjects, deleteProject } from "../../api/projectsApi";
import { ProjectsFormStruct } from "./projects_form";

export class ProjectTreeView extends DHXView {
	render() {
		
		this.ui = this.root.attachTreeView();
		this.ui.enableDragAndDrop(true);
		this.ui.enableContextMenu(true);
		this._load();

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

		// initialize dhtmlx menu
		let menu = new dhtmlXMenuObject({
			context: true, // render it as context menu
		});
		menu.loadStruct(struct);

		this.ui.attachEvent("onContextMenu", function (id, x, y, ev) {
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
					this.window = new dhtmlXWindows();
					this.window_1 = this.window.createWindow("add_root_win", 0, 0, 400, 150);
					this.window_1.center();
					this.window_1.setText("Add New Category");

					this.window_1.form = this.window_1.attachForm();
					this._loadForm("main");

					this.window_1.form.attachEvent("onButtonClick", () => {
						this.window_1.form.setItemValue("level", 0);
						let project = this.window_1.form.getFormData();
						createProjects(this, project);
					});

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

					this.window = new dhtmlXWindows();
					this.window_1 = this.window.createWindow("add_sub_win", 0, 0, 400, 150);
					this.window_1.center();
					this.window_1.setText("Add Sub Category");

					this.window_1.form = this.window_1.attachForm();
					this._loadForm("sub");

					this.window_1.form.attachEvent("onButtonClick", () => {
						this.window_1.form.setItemValue("parent_id", item_id);
						this.window_1.form.setItemValue("level", 1);
						let project = this.window_1.form.getFormData();
						createProjects(this, project);
					});

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
					deleteProject(this, item_id);

					break;

				default:
					break;
			}
		});
	}

	_load() {
		getProjects(this.ui);
	}

	_refresh() {
		this.ui.clearAll();
		this._load();
	}

	_loadForm(id) {
		this.window_1.form.load(ProjectsFormStruct[id], () => {
			this.window_1.form.setItemFocus("title");
		});
	}

	_addItem(id, title, parent) {
		this.ui.addItem(id, title, parent);
		this.ui.selectItem(id);
	}

	_deleteItem(id) {
		this.ui.deleteItem(id);
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
}
