import { DHXView } from "dhx-optimus";

export class AudioMovieGridView extends DHXView {
	render() {
		let grid_17 = (this.ui = this.root.attachGrid());
        grid_17.setIconsPath("./codebase/imgs/");

        grid_17.setHeader(["Audio Item", "Last Updated"]);
        grid_17.setColTypes("ro,ro");
      
        grid_17.setColSorting("str,str");
        grid_17.setInitWidths("*,*");
        grid_17.init();
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
