import {DHXView} from "dhx-optimus";
import { showDocumentDetails, updateDocument } from "../../../api/documentsApi";

export class DocumentFormView extends DHXView{
	render(){		

		let docId = this.app.getService("DocumentGrid").selected();

		this.ui = this.root.attachForm([
            {type: "settings", labelWidth: 80, inputWidth: 300, offsetLeft: "20", offsetTop: "10"},
            {type: "input", name: "title", label: "Title"},
			{type: "combo", name: "category", label: "Category", inputWidth: 300, options: [
                    {value: "Procedure", text: "Procedure", selected: true},
                    {value: "Plan", text: "Plan"}
			]},
            {type: "button", name: "submit", value: "Save", offsetLeft: "150"},

		]);

		this._load(docId);
        
		this.ui.attachEvent("onButtonClick", () => {
			let text = this.ui.getItemValue("title");
			this.app.callEvent("UpdateDocumentText", [docId, text]);
			this._sendForm(docId);
		});
	}
    
	_load(docId) {

		this.ui.clear();    

		// let rowId = this.app.getService("DocumentGrid").selected();

		if(docId != null)
			showDocumentDetails(this.ui, docId.substring(4));
	
	}
    
	_sendForm(id) {
		updateDocument(this.ui, id.substring(4));
	}
	
}