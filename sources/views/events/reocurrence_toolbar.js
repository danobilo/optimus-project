import { DHXView } from "dhx-optimus";

export class EventReoccurenceTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
        // this.ui.setIconSize(32);

		this._load();
	}

	_load() {
		let struct = [
            { id: "new", type: "button", text: "New" },
            { id: "button_separator_8", type: "separator" },
            { id: "delete", type: "button", text: "Delete" },
            { id: "button_separator_9", type: "separator" },
            { id: "generate", type: "button", text: "Generate Events" },
		];
		this.ui.loadStruct(struct);
	}
}