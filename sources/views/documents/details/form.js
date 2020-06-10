import {DHXView} from "dhx-optimus";

export class DocumentFormView extends DHXView{
	render(){
		this.ui = this.root.attachForm([
            {type: "settings", labelWidth: 80, inputWidth: 300, offsetLeft: "20", offsetTop: "10"},
            //    {type: "input", name: "form_input_7", label: "Chapter", readonly: true},
            
                {type: "input", name: "title", label: "Title"},
                {type: "input", name: "topics", label: "Topics", rows: "5"},
                {
                    type: "combo", name: "category", label: "Category", inputWidth: 300, options: [
                        {value: "Procedure", text: "Procedure", selected: true},
                        {value: "Plan", text: "Plan"}
                    ]
                },
            //    {
            //        type: "combo", name: "status", label: "Status", inputWidth: 300, options: [
            //            {value: "To do", text: "To do", selected: true},
            //            {value: "Planned", text: "Planned"},
            //            {value: "Done", text: "Done"},
            //            {value: "Verified", text: "Verified"},
            //            {value: "Implemented", text: "Implemented"}
            //        ]
            //    },
		]);
		this._load();
		// this.ui.centerForm();
		// this.attachEvent("onContactSelect", e =>this._update(e.data.photo,e.data));
	}
	_load(){
		// this.ui.load("codebase/data/contacts.xml");
	}
	
}