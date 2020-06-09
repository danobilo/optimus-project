import {DHXView} from "dhx-optimus";
import { ProjectTopbarView } from "./toolbar";
import { ProjectTreeView } from "./tree";
import { TabbarView } from "./tabbar";


export class ProjectsView extends DHXView{
	render(){
		this.ui = this.root.attachLayout("2U");		
		this.ui.cells("a").setText("Categories");
		this.ui.cells("a").setWidth("350");

		this.show(ProjectTopbarView, this.ui.cells("a"));
		this.show(ProjectTreeView, this.ui.cells("a"));

		this.show(TabbarView, this.ui.cells("b"));
	}
}