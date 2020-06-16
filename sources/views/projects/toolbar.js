import {DHXView} from "dhx-optimus";

export class ProjectTopbarView extends DHXView{
	render(){
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		// this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.app.callEvent("ProjectToolbarClick", [id]));
		this._load();


	}

	_load(){
		let struct = [
			{type:"buttonSelect",text:"Select",renderSelect: true, mode:"select", selected:"all", options: [
				{id:"0",type:"button",text:"All",img:""},
				{id:"1",type:"button",text:"Video",img:""},
				{id:"2",type:"button",text:"Audio",img:""},
                {id:"3",type:"button",text:"Moodle",img:""}                
			]},
			{id:"button_separator_7",type:"separator"},
			{type:"buttonSelect",text:"New",options: [
				{id:"main",type:"button",text:"Root Item",img:""},
				{id:"sub",type:"button",text:"Sub Item",img:""},
			]},
			{id:"button_separator_8",type:"separator"},
			{id:"delete",type:"button",text:"Delete"},
			{id:"button_separator_9",type:"separator"},
			{id:"search",type:"button",text:"Search"},
		];
		this.ui.loadStruct(struct);
	}
}
