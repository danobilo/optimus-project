import {DHXView} from "dhx-optimus";

export class SubtitleLanguageView extends DHXView {

	render() {

		let grid_15 = (this.ui = this.root.attachGrid());
        grid_15.setSkin('dhx_web');
        grid_15.setImagesPath('./codebase/web/imgs/');

        grid_15.setHeader(["ID", "Language"]);
        grid_15.setColTypes("ro,ro");
      
        grid_15.setColSorting("str,str");
        grid_15.setInitWidths("*,*");
        grid_15.init();
		// this._load();
	}
}