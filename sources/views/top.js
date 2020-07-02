import {DHXView} from "dhx-optimus";

import {TopbarView} 	from "views/topbar.js";
import {ProjectsView} 	from "./projects/layout";
import { UsersView } from "./users/layout";
import { RolesView } from "./roles/layout";
import { logout } from "../api/auth";


export class TopView extends DHXView{
	render(){
		let top = this.root.attachLayout("1C");
		top.cells("a").hideHeader();

		this.show(TopbarView, top);
		this.addSlot("main",top.cells("a"));

		this.attachEvent("ToolbarClick", (id) => {
			if (id === "projects")
				this.show(ProjectsView, "main");
			else if (id === "users")
				this.show(UsersView, "main");
			else if (id === "roles")
				this.show(RolesView, "main");
			else if (id == "logout")
				logout();
		});

		this.show(ProjectsView, "main");
	}
}