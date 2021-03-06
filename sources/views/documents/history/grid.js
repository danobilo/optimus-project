import { DHXView } from "dhx-optimus";

export class HistoryGridView extends DHXView {
	render() {
		this.ui = this.root.attachGrid();
		this.ui.setSkin('dhx_web');
		this.ui.setImagesPath('./codebase/web/imgs/');

		this.ui.setHeader(["ID", "Date", "Author", "Char"]);
		this.ui.setColTypes("ro,ro,ro,ro");

		this.ui.setColSorting("str,str,str,str");
		this.ui.setInitWidths("*,*,*,*");
		this.ui.init();
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