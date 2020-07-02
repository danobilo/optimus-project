import { DHXView } from "dhx-optimus";

export class PermissionsTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.ui.setIconset("awesome");
		this.ui.addButton("newContact", 0, "<i class=\"fa fa-plus\" aria-hidden=\"true\"></i> New User");
		this.ui.addSeparator("button_separator_1", 1);
		this.ui.addButton("delContact", 2, "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Delete");
        // this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("UsersToolbarClick", [id]));

	}
}