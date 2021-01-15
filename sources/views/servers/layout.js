import {DHXView} from "dhx-optimus";
import { ServersTopbarView } from "./toolbar";
import { ServersGridView } from "./grid";
import { ServerFormView } from "./form";


export class ServersView extends DHXView {
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

		this.ui = this.root.attachLayout("2U");
		this.ui.cells("a").setText("Servers");
		this.ui.cells("a").setWidth(myWidth * 0.6);

		this.ui.cells("b").setText("Server Details");

		this.show(ServersTopbarView, this.ui.cells("a"));
		this.show(ServersGridView, this.ui.cells("a"));

		this.show(ServerFormView, this.ui.cells("b"));
	}
}