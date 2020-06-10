import { DHXView } from "dhx-optimus";

export class VideoScriptsView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2U");
		this.ui.cells("a").hideHeader();
		this.ui.cells("b").hideHeader();

	}
}