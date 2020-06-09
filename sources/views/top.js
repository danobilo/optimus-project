import {DHXView} from "dhx-optimus";

import {TopbarView} 	from "views/topbar.js";
// import {SidebarView} 	from "views/sidebar.js";
// import {AboutView} 		from "views/about.js";
import {ProjectsView} 	from "./projects/layout";
import { UsersView } from "./users";
import { RolesView } from "./roles";

export class TopView extends DHXView{
	render(){
		this.ui = this.root.attachLayout("1C");

		this.show(TopbarView, this.ui);
		this.addSlot("main",this.ui.cells("a"));

		this.attachEvent("ToolbarClick", (id) => {
			if (id === "projects")
				this.show(ProjectsView, "main");
			else if (id === "users")
				this.show(UsersView, "main");
			else if (id === "roles")
				this.show(RolesView, "main");
		});

		// this.show(ProjectsView, this.ui.cells("a"));

		this.show(ProjectsView, "main");

		// this.ui.cells("a").setWidth(200);
		// this.ui.forEachItem( cell =>{
		// 	cell.hideHeader();
		// 	cell.fixSize(true);
		// });

		// this.addSlot("right", this.ui.cells("b"));

		// this.attachEvent("SideBar", (id) => {
		// 	if (id === "projects")
		// 		this.show(ProjectsView, "right");
		// 	else if (id === "about")
		// 		this.show(AboutView, "right");
		// });

		// this.show(ProjectsView, "right");
	}
}