import { DHXView } from "dhx-optimus";

export class RolesTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.ui.setIconset("awesome");
		this.ui.addButton("newRole", 0, "<i class=\"fa fa-plus\" aria-hidden=\"true\"></i> New Role");
		this.ui.addSeparator("button_separator_1", 1);
        this.ui.addButton("deleteRole", 2, "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Delete");
        this.ui.attachEvent("onClick", (id) => this.callEvent("RolesToolbarClick", [id]));

	}
}