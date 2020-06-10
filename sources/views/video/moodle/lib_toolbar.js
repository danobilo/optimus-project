import { DHXView } from "dhx-optimus";

export class LocalLibTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.ui.addButton("translate", 1, "Delete", "", "");
		this.ui.addSeparator("sep_1", 2);
		this.ui.addButton("translate", 3, "Translate to text", "", "");
	}

	_load() {}
}
