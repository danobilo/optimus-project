import { DHXView } from "dhx-optimus";
var webvtt_content =  require("templates/webvtt.html");

export class WebvttContentView extends DHXView{
	render(){

		this.ui = this.root.attachHTMLString(webvtt_content({
			content: "",
		}));
	}
}