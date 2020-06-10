import { DHXView } from "dhx-optimus";

export class AudioFilesGridView extends DHXView {
	render() {
		let grid_13 = (this.ui = this.root.attachGrid());
		grid_13.setIconsPath("./codebase/imgs/");

		grid_13.setHeader(["ID", "Language", "File", "Last Updated"]);
		grid_13.setColTypes("ro,ro,ro,ro");

		grid_13.setColSorting("str,str,str,str");
		grid_13.setInitWidths("*,*,*,*");
		grid_13.init();
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
