import { DHXView } from "dhx-optimus";
import { DocumentFormView } from "./details/document_form";
import { FilesView } from "../files/layout";
import { EventsView } from "../events/layout";
import { DocumentHistoryView } from "./history/layout";
import { CommentsView } from "./comments/layout";
import { DocumentContentView } from "./content";
import { ChapterFormView } from "./details/chapter_form";
import { DocumentMediaView } from "./media/layout";

export class DocumentsTabbarView extends DHXView {
	render() {
		this.ui = this.root.attachTabbar({
			close_button: false
		});

		this.ui.addTab("tab_18", "Content");

		var tab_18 = this.ui.cells("tab_18");
		this.show(DocumentContentView, tab_18);

		// var editorLayout = tab_18.attachLayout("1C");
		// editorLayout.cells("a").hideHeader();
		// this.show(DocumentContentView, editorLayout.cells("a"));
		tab_18.setActive();

		this.ui.addTab("tab_19", "Details");

		var tab_19 = this.ui.cells("tab_19");
		// this.show(DocumentFormTopbarView, tab_19);
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

		this.ui.addTab("tab_24", "Media");

		var tab_24 = this.ui.cells("tab_24");
		this.show(DocumentMediaView, tab_24);

		this.attachEvent("UpdateDetailsForm", (level) => {

			if (level == 0){
				this.show(DocumentFormView, tab_19);
			} else {
				this.show(ChapterFormView, tab_19);
			}

		});

	}
}