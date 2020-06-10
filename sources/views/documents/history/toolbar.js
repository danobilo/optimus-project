import { DHXView } from "dhx-optimus";

export class HistoryTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
        // this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("HistoryToolbarClick", [id]));
		this._load();
	}

	_load() {
		let struct = [
            { id: "delete", type: "button", text: "Delete" },
            { id: "button_separator_8", type: "separator" },
            { id: "delete_all", type: "button", text: "Delete All" },
		];
		this.ui.loadStruct(struct);
	}
}