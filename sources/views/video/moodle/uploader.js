import { DHXView } from "dhx-optimus";

export class MoodleUploaderView extends DHXView {
	render() {
		this.ui = this.root.attachForm([
			{
				type: "upload",
				name: "form_upload_2",
				inputWidth: 330,
				inputHeight: 60,
				inputLeft: 20,
				titleScreen: true,
				url: "./codebase/dhtmlxform_item_upload.php",
				swfPath: "./codebase/uploader.swf",
				swfUrl: "./dhtmlxform_item_upload.php",
			},
		]);
		this._load();
		// this.ui.centerForm();
    // this.attachEvent("onContactSelect", e =>this._update(e.data.photo,e.data));
	}
	_load() {
    // this.ui.load("codebase/data/contacts.xml");
	}
}
