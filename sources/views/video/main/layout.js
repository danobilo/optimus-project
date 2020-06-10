import { DHXView } from "dhx-optimus";
import { VideoMainTopbarView } from "./toolbar";
import { VideoMainFormView } from "./form";
import { VideoMainGridView } from "./grid";

export class VideoMainView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2U");
		this.ui.cells("a").hideHeader();
		this.ui.cells("b").hideHeader();

		this.show(VideoMainTopbarView, this.ui.cells("a"));
		this.show(VideoMainGridView, this.ui.cells("a"));

		this.show(VideoMainFormView, this.ui.cells("b"));
	}
}