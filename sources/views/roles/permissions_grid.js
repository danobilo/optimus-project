import {DHXView} from "dhx-optimus";

export class PermissionsGridView extends DHXView{
	render(){

		this.ui = this.root.attachGrid();
		this.ui.setIconsPath("./codebase/imgs/");

		this.ui.setHeader(",Name,Email"); //sets the headers of columns
		this.ui.setColumnIds("cntr,name,email"); //sets the columns' ids
		this.ui.setInitWidthsP("5,*,*"); //sets the initial widths of columns
		this.ui.setColAlign("left,left,left"); //sets the alignment of columns
		this.ui.setColTypes("cntr,ed,ro"); //sets the types of columns
		this.ui.setColSorting("str,str,str"); //sets the sorting types of columns

		this.ui.init();
		this._load();
	}

	_load(){

	}
}