import {DHXView} from "dhx-optimus";
import { CommentsTopbarView } from "./toolbar";
import { CommentsGridView } from "./grid";

export class CommentsView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("1C");
		this.ui.cells("a").hideHeader();
        
		this.show(CommentsTopbarView, this.ui.cells("a"));
		this.show(CommentsGridView, this.ui.cells("a"));

	}
}