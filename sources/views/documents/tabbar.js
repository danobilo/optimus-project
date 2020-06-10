import { DHXView } from "dhx-optimus";
import { DocumentFormView } from "./details/form";
import { FilesView } from "../files/layout";
import { EventsView } from "../events/layout";
import { DocumentHistoryView } from "./history/layout";
import { CommentsView } from "./comments/layout";
import { DocumentFormTopbarView } from "./details/toolbar";
export class DocumentsTabbarView extends DHXView {
	render() {
		this.ui = this.root.attachTabbar({
			close_button: false
		});

		this.ui.addTab("tab_18", "Content");

		var tab_18 = this.ui.cells("tab_18");
		tab_18.setActive();

		this.ui.addTab("tab_19", "Details");
		var tab_19 = this.ui.cells("tab_19");
		this.show(DocumentFormTopbarView, tab_19);
		this.show(DocumentFormView, tab_19);

		this.ui.addTab("tab_20", "Files");
		var tab_20 = this.ui.cells("tab_20");
		this.show(FilesView, tab_20);

		this.ui.addTab("tab_21", "Planning");
		var tab_21 = this.ui.cells("tab_21");
		this.show(EventsView, tab_21);

		this.ui.addTab("tab_22", "History");
		var tab_22 = this.ui.cells("tab_22");
		this.show(DocumentHistoryView, tab_22);

		this.ui.addTab("tab_23", "Comments");
		var tab_23 = this.ui.cells("tab_23");
		this.show(CommentsView, tab_23);

	}
}