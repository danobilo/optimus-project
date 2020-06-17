import { DHXView } from "dhx-optimus";

export class DocumentFormTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
        // this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", () => {
			var rowId = this.app.getService("DocumentGrid").selected();
			var level = this.app.getService("DocumentGrid").rowLevel();

			if(level > 0){
				this.app.callEvent("updateChapter",[rowId]);
			}else{
				this.app.callEvent("saveDocument",[rowId]);
			}
		});
		this._load();
	}

	_load() {
		let struct = [
            { id: "save", type: "button", text: "Save" },
		];
		this.ui.loadStruct(struct);
	}
}