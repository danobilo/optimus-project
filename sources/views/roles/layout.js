import {DHXView} from "dhx-optimus";
import { RolesTopbarView } from "./roles_toolbar";
import { RolesGridView } from "./roles_grid";
import { PermissionsTopbarView } from "./permissions_toolbar";
import { PermissionsGridView } from "./permissions_grid";


export class RolesView extends DHXView {
	render() {
        
		this.ui = this.root.attachLayout("2U");
        
		this.ui.cells("a").setText("Roles");
		this.ui.cells("b").setText("Permissions");		

		this.show(RolesTopbarView, this.ui.cells("a"));
		this.show(RolesGridView, this.ui.cells("a"));

		this.show(PermissionsTopbarView, this.ui.cells("b"));
		this.show(PermissionsGridView, this.ui.cells("b"));
	}
}