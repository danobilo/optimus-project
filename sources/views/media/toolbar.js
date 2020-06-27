import {DHXView} from "dhx-optimus";

export class MediaTopbarView extends DHXView{
	render(){
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
        // this.ui.setIconSize(32);
		this.ui.attachEvent("onClick", (id) => this.callEvent("MediaToolbarClick", [id]));
		this._load();
	}

	_load(){
		let struct = [
			{type:"buttonSelect",text:"Upload New",options: [
                {id:"video",type:"button",text:"Video",img:""},
                {id:"button_separator_7",type:"separator"},
				{id:"audio",type:"button",text:"Audio",img:""},
            ]},
            {id:"button_separator_8",type:"separator"},
            {id:"split",type:"button",text:"Split"},
            {id:"button_separator_6",type:"separator"},
			{id:"translate",type:"button",text:"Translate to text"},
			{id:"button_separator_9",type:"separator"},
			{id:"delete",type:"button",text:"Delete"},
		];
		this.ui.loadStruct(struct);
	}
}
