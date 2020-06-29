import {DHXView} from "dhx-optimus";

export class TopbarView extends DHXView{
	render(){
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
			skin: "dhx_web"
		});
		// this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("ToolbarClick", [id]));
		this._load();
	}

	_load(){
		let struct = [
			{type:"buttonSelect",text:"Manage",renderSelect: true, mode:"select", selected:"projects", width:80, options: [
				{id:"projects",type:"button",text:"Projects",img:""},
				{id:"button_separator_41",type:"separator"},
				{id:"users",type:"button",text:"Users",img:""},
				{id:"button_separator_42",type:"separator"},
				{id:"roles",type:"button",text:"Roles",img:""},
			]},
			{id:"button_separator_43",type:"separator"},
			{type:"buttonSelect",text:"Scheduler",options: [
				{id:"schedule_team",type:"button",text:"Team",img:""},
				{id:"button_separator_44",type:"separator"},
				{id:"schedule_personal",type:"button",text:"Personal",img:""},
			]},
			{id:"button_separator_45",type:"separator"},
			{type:"spacer"},
			{id:"button_text_2",type:"text",text:"<span class='topbar_title'>Username</span>"},
			{id:"button_separator_46",type:"separator"},
			{id:"button_normal_65",type:"button",text:"Profile"},
			{id:"button_separator_47",type:"separator"},
			{id:"logout",type:"button",text:"Logout"},
		];
		this.ui.loadStruct(struct);
	}
}