import { DHXView } from "dhx-optimus";

export class ProjectMenuView extends DHXView {
	render() {

		this.ui = new dhtmlXMenuObject({
			context: true, // render it as context menu
		});
		this._load();
    }
    
    _load(){
		let struct = [
			{ id: "new", text: "New", items:[
				{ id: "main", text: "Main Item"},
				{ id: "sub", text: "Sub Item"},
			]},
			{id: "type", text: "Type", items:[
				{ id: "1", type: "checkbox", text: "Video"},
				{ id: "2", type: "checkbox", text: "Audio"},
				{ id: "3", type: "checkbox", text: "Moodle"},
			]},
			{ id: "delete", text: "Delete"}
		];

		this.ui.loadStruct(struct);
    }
}
