import { DHXView } from "dhx-optimus";
import { ProjectsFormStruct } from "./projects_form";
import { createProjects } from "../../api/projectsApi";

export class ProjectDialog extends DHXView {
	render() {
		this.window = new dhtmlXWindows();
		this.window_1 = this.window.createWindow("add_root_win", 0, 0, 400, 150);
		this.window_1.center();
		this.window_1.setText("Add New Category");

		this.window_1.form = this.window_1.attachForm();
        this._loadForm("main");
        
		this.window_1.form.attachEvent("onButtonClick", () => {
			this.window_1.form.setItemValue("level", 0);
			let data = this.window_1.form.getFormData();
            createProjects(this, data);
            
            // console.log(response);

			// if (response.project) {
			// 	this.window_1.destroy();
			// 	dhtmlx.message({ title: "Success", text: response.message });
			// } else {
			// 	dhtmlx.alert({ title: "Error", text: response.message });
			// }
		});
	}

	_loadForm(id) {
		this.window_1.form.load(ProjectsFormStruct[id], () => {
			this.window_1.form.setItemFocus("title");
		});
	}
}
