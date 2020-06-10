import {DHXView} from "dhx-optimus";
import { FilesTopbarView } from "./toolbar";
import { FilesGridView } from "./grid";

export class FilesView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2E");
		this.ui.cells("a").hideHeader();
		this.ui.cells("b").setText("File Viewer");
        
		this.show(FilesTopbarView, this.ui.cells("a"));
		this.show(FilesGridView, this.ui.cells("a"));

		this.addSlot(this.ui.cells("b"),"fileViewer");
	}
}