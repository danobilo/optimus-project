import { DHXView } from "dhx-optimus";

export class AudioLanguageTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
    // this.ui.setIconSize(32);
    // this.ui.attachEvent("onClick", (id) => this.callEvent("ToolbarClick", [id]));
		this._load();
	}

	_load() {
		let struct = [
			{
				type: "buttonSelect",
				text: "New",
				width: 70,
				options: [
          { id: "english", type: "button", text: "English", img: "" },
          { id: "german", type: "button", text: "German", img: "" },
          { id: "dutch", type: "button", text: "Dutch", img: "" },
				],
			},
      { id: "button_separator_43", type: "separator" },
      { id: "delete", type: "button", text: "Delete" },
		];

		this.ui.loadStruct(struct);
	}
}
