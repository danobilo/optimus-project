import { DHXView } from "dhx-optimus";
import { DocumentsTopbarView } from "./toolbar";
import { DocumentsGridView } from "./grid";
import { DocumentsTabbarView } from "./tabbar";

export class DocumentsView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2U");
		this.ui.cells("a").setWidth("600");
		this.ui.cells("a").hideHeader();

		this.show(DocumentsTopbarView, this.ui.cells("a"));
		this.show(DocumentsGridView, this.ui.cells("a"));

		this.show(DocumentsTabbarView, this.ui.cells("b"));
	}
}