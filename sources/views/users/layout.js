import {DHXView} from "dhx-optimus";
import { UsersTopbarView } from "./toolbar";
import { UsersGridView } from "./grid";
import { UserFormView } from "./form";
import { UserProjectTreeView } from "./tree";


export class UsersView extends DHXView {
	render() {
		var myWidth, myHeight;

		if (typeof (window.innerWidth) == "number") {

		//Non-IE

			myWidth = window.innerWidth;
			myHeight = window.innerHeight;

		} else if (document.documentElement &&
				(document.documentElement.clientWidth || document.documentElement.clientHeight)) {

		//IE 6+ in 'standards compliant mode'

			myWidth = document.body.clientWidth;
			myHeight = document.body.clientHeight;

		} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {

		//IE 4 compatible

			myWidth = document.body.clientWidth;
			myHeight = document.body.clientHeight;

		}

		this.ui = this.root.attachLayout("3W");
		this.ui.cells("a").setText("Users");
		this.ui.cells("a").setWidth(myWidth * 0.4);

		this.ui.cells("b").setText("User Details");		

		this.ui.cells("c").setText("User Map Rights");
		this.ui.cells("c").setWidth(myWidth * 0.3);

		this.show(UsersTopbarView, this.ui.cells("a"));
		this.show(UsersGridView, this.ui.cells("a"));

		this.show(UserFormView, this.ui.cells("b"));

		this.show(UserProjectTreeView, this.ui.cells("c"));
	}
}