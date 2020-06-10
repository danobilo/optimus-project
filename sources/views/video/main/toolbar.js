import { DHXView } from "dhx-optimus";

export class VideoMainTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
        // this.ui.setIconSize(32);
		// this.ui.attachEvent("onClick", (id) => this.callEvent("EventsToolbarClick", [id]));
		this._load();
	}

	_load() {
		let struct = [
            { id: "new", type: "button", text: "New" },
            { id: "button_separator_8", type: "separator" },
            { id: "delete", type: "button", text: "Delete" },
            { id: "button_separator_9", type: "separator" },
            { id: "up", type: "button", text: "Up" },
            { id: "button_separator_10", type: "separator" },
            { id: "down", type: "button", text: "Down" },
		];
		this.ui.loadStruct(struct);
	}
}