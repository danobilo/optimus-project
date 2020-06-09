import {DHXView} from "dhx-optimus";
import { DocumentFormView } from "./form";
// import { ProjectFormView } from "./form";
// import { ProjectDetailsView } from "./details";
// import { DocumentsView } from "../documents/layout";


export class DocumentsTabbarView extends DHXView{
	render(){
		this.ui = this.root.attachTabbar({
			close_button: false
        });
        
        this.ui.addTab("tab_18", "Content");

        var tab_18 = this.ui.cells("tab_18");
        tab_18.setActive();

        this.ui.addTab("tab_19", "Details");
        var tab_19 = this.ui.cells("tab_19");
        this.show(DocumentFormView, tab_19);

        this.ui.addTab("tab_20", "Files");
        var tab_20 = this.ui.cells("tab_20");

        this.ui.addTab("tab_21", "Planning");
        var tab_21 = this.ui.cells("tab_21");

        this.ui.addTab("tab_22", "History");
        var tab_22 = this.ui.cells("tab_22");

        this.ui.addTab("tab_23", "Comments");
        var tab_23 = this.ui.cells("tab_23");

    }
}