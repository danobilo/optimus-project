import {DHXView} from "dhx-optimus";
import { signin } from "../api/auth.js";
require("../helpers/centerform.js");

export class LoginView extends DHXView{
	render(){

		this.ui = this.root.attachLayout("1C");
		this.ui .cells("a").hideHeader();


		let form = this.ui.cells("a").attachForm([

			{type: "settings", position: "label-left", labelWidth: 75, inputWidth: 150},
			{type: "block", blockOffset: 30, offsetTop: 15, width: "auto", list: [
				{type: "label", label: "Please introduce yourself", labelWidth: "auto", offsetLeft: 35},
				{type: "input", label: "Email", name: "email", value: "", offsetTop: 20},
				{type: "password", label: "Password", name: "password", value: ""},
				{type: "button", name: "submit", value: "Login", offsetTop: 20, offsetLeft: 72}
			]}

            // {type: "settings", labelWidth: 80, inputWidth: 300, offsetLeft: "20", offsetTop: "10"},
            // {type: "input", name: "email", label: "Email"},
            // {type: "password", name: "password", label: "Password"},
            // {type: "button", name: "submit", value: "Save", offsetLeft: "150"},
		]);
		// this._load();
		form.centerForm();

		form.attachEvent("onButtonClick", () => {

			var data = form.getFormData();
			this._sendForm(data);
		});
	}

	_sendForm(data) {

		signin(this.ui, data);
		// updateDocument(this.ui, id.substring(4));
	}
	
}