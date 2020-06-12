import { DHXView } from "dhx-optimus";

export class ProjectMenu extends DHXView {
	render() {
		let struct = [
			{
				id: "l_num", // required, will be generated automatically if empty
				type: "checkbox", // required, item type
				text: "Line Numbering", // required, item text
				checked: true, // optional, true to check on init
				hotkey: "Ctrl+L N", // optional, hotkey (text in menu only)
				userdata: {
          // optional, userdata, name:value pairs
					p1: "value1",
					p2: "value2",
				},
			},
		];

    // initialize dhtmlx menu
		let menu = new dhtmlXMenuObject({
			context: true, // render it as context menu
		});
		menu.loadStruct(struct);
	}
}
