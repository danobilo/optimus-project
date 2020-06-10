import {DHXView} from "dhx-optimus";

export class EventsGridView extends DHXView{
	render(){
		this.ui = this.root.attachGrid();
		this.ui.setIconsPath("./codebase/imgs/");

		this.ui.setHeader(["ID","Description","Owner","Assigned To","Begin Date","End Date","Visible","Status"]);
		this.ui.setColTypes("ro,ro,ro,ro,ro,ro,ch,coro");
        
		this.ui.setColSorting("str,str,str,str,date,date,str,str");
		this.ui.setInitWidths("*,*,*,*,*,*,*,*");
		this.ui.init();
		this._load();
	}
	
	_load(){
		// this.ui.load("codebase/data/contacts.xml",()=>{
		// 	if(this.app.$device==="desktop"){
		// 		this.ui.selectRow(0,true);
		// 	}
		// });
	}
	
}