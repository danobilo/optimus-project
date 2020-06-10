import { DHXView } from "dhx-optimus";

export class LocalLibGridView extends DHXView {
	render() {
		let grid_14 = (this.ui = this.root.attachGrid());
		grid_14.setIconsPath("./codebase/imgs/");

		grid_14.setHeader([
			"ID",
			"Title",
			"Start Time",
			"End Time",
			"Link (copy this to embed in moodle)",
			"Date",
		]);
		grid_14.setColTypes("ro,ro,ro,ro,ro,ro");

		grid_14.setColSorting("str,str,str,str,str,str");
		grid_14.setInitWidths("*,*,*,*,*,*");
		grid_14.init();
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
