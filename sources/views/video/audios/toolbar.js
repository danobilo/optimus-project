import { DHXView } from "dhx-optimus";

export class AudioFilesTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.ui.addButton("translate", 1, "Translate Audio", "", "");
	}

	_load() {

	}
}