import {DHXView} from "dhx-optimus";

export class FilesGridView extends DHXView{
	render(){
		this.ui = this.root.attachGrid();
		this.ui.setIconsPath("./codebase/imgs/");

		this.ui.setHeader(["ID","File name","File type","File size","Date Uploaded","Owner"]);
		this.ui.setColTypes("ro,ro,ro,ro,ro,ro");
        
		this.ui.setColSorting("str,str,str,int,date,str");
		this.ui.setInitWidths("*,*,*,*,*,*");
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