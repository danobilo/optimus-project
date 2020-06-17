import {DHXView} from "dhx-optimus";
import { showChapterDetails, updateChapter } from "../../../api/chapterApi";

export class ChapterFormView extends DHXView{
	render(){

		let docId = this.app.getService("DocumentGrid").selected();

		// this.toolbar = this.root.attachToolbar({
		// 	iconset: "awesome",
		// });
		// this.toolbar.loadStruct([{ id: "save", type: "button", text: "Save" }]);
		// this.toolbar.attachEvent("onClick", () => {
		// 	this.app.callEvent("saveChapter",[docId]);
		// });
        
		this.ui = this.root.attachForm([
            {type: "settings", labelWidth: 80, inputWidth: 300, offsetLeft: "20", offsetTop: "10"},
            {type: "input", name: "title", label: "Title"},
            {type: "button", name: "submit", value: "Save", offsetLeft: "150"},
		]);
		this._load(docId);
        
		this.ui.attachEvent("onButtonClick", () => {
			let text = this.ui.getItemValue("title");
			this.app.callEvent("UpdateDocumentText", [docId, text]);
			this._sendForm(docId);
		});

	}
	_load(docId){

		this.ui.clear();        
		// var rowId = this.app.getService("DocumentGrid").selected();

		if(docId != null)
			showChapterDetails(this.ui, docId);
	}
    
	_sendForm(id){
		updateChapter(this.ui, id);
	}
	
}