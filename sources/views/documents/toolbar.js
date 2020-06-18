import {DHXView} from "dhx-optimus";

export class DocumentsTopbarView extends DHXView{
	render(){
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		// this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("DocumentsToolbarClick", [id]));
		this._load();
	}

	_load(){
		let struct = [
			{type:"buttonSelect",text:"Create", options: [
				{id:"document",type:"button",text:"Document",img:""},
				{id:"button_separator_5",type:"separator"},
				{id:"chapter",type:"button",text:"Topic",img:""},
			]},
			{id:"button_separator_6",type:"separator"},
            {id:"delete",type:"button",text:"Delete"},
            {id:"button_separator_7",type:"separator"},
            {id:"up",type:"button",text:"Up",img:""},
            {id:"button_separator_8",type:"separator"},
            {id:"down",type:"button",text:"Down",img:""},
			{id:"button_separator_9",type:"separator"},
			{id:"export",type:"button",text:"Export"},
		];
		this.ui.loadStruct(struct);
	}
}