import { DHXView } from "dhx-optimus";

export class DocumentMediaTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
        // this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("DocumentMediaToolbarClick", [id]));
		this._load();
	}

	_load() {
		let struct = [
			{ id: "add", type: "button", text: "Add New" },
            { id: "button_separator_7", type: "separator" },
            { id: "upload", type: "button", text: "Upload New" },
            { id: "button_separator_8", type: "separator" },
            { id: "delete", type: "button", text: "Delete" },           
		];
		this.ui.loadStruct(struct);
	}
}