import {DHXView} from "dhx-optimus";

export class ProjectFormView extends DHXView{
	render(){
		this.ui = this.root.attachForm([
			{type: "settings", labelWidth: 150, inputWidth: 400, offsetLeft: "10", offsetTop: "0"},
			{
				type: "block", name: "form_block_3", blockOffset: 30, offsetTop: 15, width: "auto", list: [
					{type: "hidden", name: "id", label: "ID", readonly: true},
					{type: "input", name: "project_id", label: "ID", readonly: true},
					{type: "input", name: "title", label: "Description"},
					{type: "input", name: "goal", label: "Goal(s)", rows: "5"},
					// {type: "combo", name: "supervisor", label: "Supervisor(s)", comboType: "checkbox"},
					{type: "input", name: "created_by", label: "Created By", readonly: true},
		//                {type: "combo", name: "branch", label: "Branch", comboType: "checkbox"},
		//                {type: "combo", name: "category", label: "Category"},
		//             {type: "input", name: "duration", label: "Duration"},
		//             {type: "combo", name: "frequency", label: "Frequency", options: [
		//                     {value: "0", text: "One time", selected: true},
		//                     {value: "1", text: "Every Week"},
		//                     {value: "2", text: "Every (2) Weeks"},
		//                     {value: "10", text: "Every (3) Weeks"},
		//                     {value: "7", text: "Every (4) Weeks"},
		//                     {value: "9", text: "Every (8) Weeks"},
		//                     {value: "3", text: "Every Month"},
		//                     {value: "8", text: "Every (2) Month"},
		//                     {value: "4", text: "Every (12) Weeks"},
		//                     {value: "5", text: "Every half year"},
		//                     {value: "6", text: "Every year"}
		//                 ]
		//             },
		//             {type: "input", name: "p_input", label: "Input", rows: "5"},
		//             {type: "input", name: "p_output", label: "Output", rows: "5"},
		//                {type: "input", name: "comments", label: "Comments", rows: "5"},
					{type: "checkbox", name: "is_published", label: "Publish"}
				]
			}
		]);
		this._load();
		// this.ui.centerForm();
		// this.attachEvent("onContactSelect", e =>this._update(e.data.photo,e.data));
	}
	_load(){
		// this.ui.load("codebase/data/contacts.xml");
	}
	
}