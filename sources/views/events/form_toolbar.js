import { DHXView } from "dhx-optimus";

export class EventFormTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
        // this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("EventsToolbarClick", [id]));
		this._load();
	}

	_load() {
		let struct = [
            { id: "save", type: "button", text: "Save" },
		];
		this.ui.loadStruct(struct);
	}
}