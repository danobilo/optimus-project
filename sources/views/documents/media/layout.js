import {DHXView} from "dhx-optimus";
import { DocumentMediaTopbarView } from "./toolbar";
import { DocumentMediaGridView } from "./grid";


export class DocumentMediaView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2E");
		this.ui.cells("a").hideHeader();
		this.ui.cells("b").setText("File Viewer");
        
		this.show(DocumentMediaTopbarView, this.ui.cells("a"));
		this.show(DocumentMediaGridView, this.ui.cells("a"));

		this.addSlot(this.ui.cells("b"),"MediaViewer");

		this.attachEvent("showDocumentMedia", (path) => this.ui.cells("b").attachURL(path));
	}
}