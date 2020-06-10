import { DHXView } from "dhx-optimus";

export class AudioLanguageGridView extends DHXView {
	render() {
		let grid_15 = (this.ui = this.root.attachGrid());
        grid_15.setIconsPath("./codebase/imgs/");

        grid_15.setHeader(["Column 1", "Column 2"]);
        grid_15.setColTypes("ro,ro");
      
        grid_15.setColSorting("str,str");
        grid_15.setInitWidths("*,*");
        grid_15.init();
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
