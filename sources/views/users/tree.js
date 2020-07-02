import {DHXView} from "dhx-optimus";
import { getProjects } from "../../api/projectsApi";
import { addUserProjects, getUserProjects } from "../../api/userApi";

export class UserProjectTreeView extends DHXView{
	render(){

		this.ui = this.root.attachTreeView();
		this.ui.enableCheckboxes(true);
		this._load();
        
		this.ui.attachEvent("onCheck",  () => {
			this.app.callEvent("UpdateUserProjects");
		});
        
		this.attachEvent("UpdateUserProjects", () => {
			this._updateUserProjects();
		});
        
		this.attachEvent("checkUserProjects", (id) => {
			this._getProjects(id);
		});			

	}
    
	_getProjects(id){

		let tree = this.ui;
		var checkedIds = tree.getAllChecked();

		if (checkedIds.length > 0) {
			checkedIds.forEach(function (item) {

                tree.silent(function(){
                    tree.uncheckItem(item);
                });
            });

		}

		getUserProjects(tree, id);
	}

	_load(id = 0) {

		getProjects(this.ui, id);
	}
    
	_updateUserProjects() {        

		var user_id = this.app.getService("UserGrid").selected();
    
		if (user_id === null) {
			dhtmlx.alert({
				type: "alert-error",
				text: "No user selected",
				title: "Error!"
			});
			return false;
		}
        
    
		let data = {projects: this.ui.getAllChecked()};
		addUserProjects(data, user_id);

	}

}