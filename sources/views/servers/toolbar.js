import { DHXView } from "dhx-optimus";

export class ServersTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.ui.setIconset("awesome");
		this.ui.addButton("new", 0, "<i class=\"fa fa-plus\" aria-hidden=\"true\"></i> New Server");
		this.ui.addSeparator("button_separator_1", 1);
		this.ui.addButton("delete", 2, "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Delete");
        // this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("ServersToolbarClick", [id]));

	}
}