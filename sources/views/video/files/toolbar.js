import { DHXView } from "dhx-optimus";

export class VideoFilesTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
        // this.ui.setIconSize(32);

		this._load();
	}

	_load() {
		let struct = [
            { id: "upload", type: "button", text: "Upload" },
            { id: "button_separator_8", type: "separator" },
            { id: "download", type: "button", text: "Download" },
            { id: "button_separator_9", type: "separator" },
            { id: "replace", type: "button", text: "Replace" },
            { id: "button_separator_10", type: "separator" },
            { id: "up", type: "button", text: "Up" },
            { id: "down", type: "button", text: "Down" },
            { id: "button_separator_11", type: "separator" },
            { id: "delete", type: "button", text: "Delete" },
		];
		this.ui.loadStruct(struct);
	}
}