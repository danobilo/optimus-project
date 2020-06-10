import { DHXView } from "dhx-optimus";

export class VideoFilesGridView extends DHXView {
	render() {
		let grid_12 = this.ui = this.root.attachGrid();
		grid_12.setIconsPath("./codebase/imgs/");

        grid_12.setHeader(["ID", "Uploaded", "Media Name", "Allias", "Size"]);
        grid_12.setColTypes("ro,ro,ro,ro,ro");
      
        grid_12.setColSorting("str,str,str,str,str");
        grid_12.setInitWidths("*,*,*,*,*");
		grid_12.init();
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