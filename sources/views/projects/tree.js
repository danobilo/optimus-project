import {DHXView} from "dhx-optimus";

export class ProjectTreeView extends DHXView{
	render(){
		this.ui = this.root.attachTreeView();
	}

	_load(){

	}
}