import { DHXView } from "dhx-optimus";

export class AudioClipTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.ui.addButton("new", 1, "New", "", "");
		this.ui.addSeparator("sep_1", 2);
		this.ui.addButton("delete", 3, "Delete", "", "");
		this.ui.addSeparator("sep_2", 4);
		this.ui.addButton("generate_audio", 5, "Generate Audio", "", "");
		this.ui.addSeparator("sep_3", 6);
		this.ui.addButton("update_subtitle", 7, "Update Subtitle Text", "", "");
		this.ui.addSeparator("sep_4", 8);
		this.ui.addButton("update_overlaying", 9, "Update Overlaying Text", "", "");
	}

	_load() {}
}