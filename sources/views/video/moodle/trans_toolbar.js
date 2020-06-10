import { DHXView } from "dhx-optimus";

export class TransTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.ui.addButton("save", 1, "Save", "", "");
	}

	_load() {}
}