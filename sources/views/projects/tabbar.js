import {DHXView} from "dhx-optimus";
import { ProjectFormView } from "./form";
import { ProjectDetailsView } from "./details";
import { DocumentsView } from "../documents/layout";


export class TabbarView extends DHXView{
	render(){
		this.ui = this.root.attachTabbar({
			close_button: false
        });
        
        this.ui.addTab("tab_8", "Project Details");
        this.ui.cells("tab_8").setActive();

        this.show(ProjectDetailsView, this.ui.cells("tab_8"));

        this.ui.addTab("tab_9", "Documents");
        this.show(DocumentsView, this.ui.cells("tab_9"));

        this.ui.addTab("tab_18", "Content");
    }
}