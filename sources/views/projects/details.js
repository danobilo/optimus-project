import {DHXView} from "dhx-optimus";
import { ProjectFormView } from "./form";

export class ProjectDetailsView extends DHXView{
	render(){

		let struct = [
			{id:"save",type:"button",text:"Save"},
		];


		this.ui = this.root.attachLayout("2U");
		this.ui.cells("a").hideHeader();
		this.ui.cells("b").setText("Project Scope");

		this.toolbar = this.ui.cells("a").attachToolbar();
		this.toolbar.attachEvent("onClick", (id) => this.app.callEvent("saveProjectForm"));
		this.toolbar.loadStruct(struct);

		this.show(ProjectFormView, this.ui.cells("a"));
	}
}