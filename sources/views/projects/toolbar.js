import {DHXView} from "dhx-optimus";

export class ProjectTopbarView extends DHXView{
	render(){
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		// this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("ProjectToolbarClick", [id]));
		this._load();


	}

	_load(){
		let struct = [
			{type:"buttonSelect",text:"Select",renderSelect: true, mode:"select", selected:"all", options: [
				{id:"video",type:"button",text:"Video",img:""},
				{id:"audio",type:"button",text:"Audio",img:""},
                {id:"moodle",type:"button",text:"Moodle",img:""},
                {id:"all",type:"button",text:"All",img:""},
			]},
			{id:"button_separator_7",type:"separator"},
			{type:"buttonSelect",text:"New",options: [
				{id:"main",type:"button",text:"Main Project",img:""},
				{id:"sub",type:"button",text:"Sub Project",img:""},
			]},
			{id:"button_separator_8",type:"separator"},
			{id:"delete",type:"button",text:"Delete"},
			{id:"button_separator_9",type:"separator"},
			{id:"search",type:"button",text:"Search"},
		];
		this.ui.loadStruct(struct);
	}
}
