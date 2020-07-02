import {DHXView} from "dhx-optimus";
import { getUserDetails } from "../../api/userApi";
import { getSelectRoles } from "../../api/rolesApi";

export class UserFormView extends DHXView{
	render(){

		this.toolbar = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.toolbar.addButton("save", 1, "Save", "", "");
		this.toolbar.attachEvent("onClick", (id) => this.app.callEvent("UserFormToolbarClick", [id]));

		let struct = [
            { type: "settings", labelWidth: 100, inputWidth: 200, offsetLeft: "20", offsetTop: "5", position: "label-left" },
            { type: "input", name: "name", label: "Name" },
            { type: "input", name: "email", label: "Email" },
            { type: "multiselect", name: "roles", label: "Roles", size: 8, options:[]},
		];

		this.ui = this.root.attachForm();
		this.ui.loadStruct(struct, () => { getSelectRoles(this.ui); });

		this.attachEvent("LoadUserForm", (id) => {
			this._load(id);
		});

		this.attachEvent("UserFormToolbarClick", (id) => {

			let data = this.ui.getFormData();
			this.app.callEvent("UpdateUser", [data]);
		});
	}
	_load(id){

		this.ui.clear();
		getUserDetails(this.ui, id);
	}


	
}