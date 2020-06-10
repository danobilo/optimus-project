import { DHXView } from "dhx-optimus";
import { VideoFilesGridView } from "./grid";

export class VideoFilesView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2U");
		this.ui.cells("a").hideHeader();
		this.ui.cells("b").setText("Media Player");

		
		this.show(VideoFilesGridView, this.ui.cells("a"));

	}
}