import { DHXView } from "dhx-optimus";
import { HistoryTopbarView } from "./toolbar";
import { HistoryGridView } from "./grid";

export class DocumentHistoryView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2E");
		this.ui.cells("a").hideHeader();
		this.ui.cells("b").setText("Content");

		this.show(HistoryTopbarView, this.ui.cells("a"));
		this.show(HistoryGridView, this.ui.cells("a"));

	}
}