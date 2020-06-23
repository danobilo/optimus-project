import { DHXView } from "dhx-optimus";

export class AudioClipGridView extends DHXView {
	render() {
		let grid_16 = (this.ui = this.root.attachGrid());
		grid_16.setIconsPath("./codebase/imgs/");

		grid_16.setHeader(["Sort", "Begin", "End", "Updated", "Status"]);
		grid_16.setColTypes("ro,ro,ro,ro,ro");

		grid_16.setColSorting("str,str,str,str,str");
		grid_16.setInitWidths("*,*,*,*,*");
		grid_16.init();
		this._load();
	}

	_load() {
    // this.ui.load("codebase/data/contacts.xml",()=>{
    // 	if(this.app.$device==="desktop"){
    // 		this.ui.selectRow(0,true);
    // 	}
    // });
	}
}
