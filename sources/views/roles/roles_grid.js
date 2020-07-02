import {DHXView} from "dhx-optimus";
import { createRole, getRoles, updateRole } from "../../api/rolesApi";

export class RolesGridView extends DHXView {
    
	render(){

		this.ui = this.root.attachGrid();
		this.ui.setIconsPath("./codebase/imgs/");

		this.ui.setHeader("Name");
		this.ui.setColumnIds("name");
		this.ui.setInitWidths("*");
		this.ui.setColAlign("left");
		this.ui.setColTypes("ed"); 
		this.ui.setColSorting("str"); 

		this.ui.init();
        this._load();
        
        this.ui.attachEvent("onEditCell", (stage, id, index, new_value) => this.app.callEvent("RolesGridEditCell",[stage, id, index, new_value]));
        
		this.attachEvent("RolesGridEditCell", (stage, id, index, new_value) => this._editCell(stage, id, index, new_value) );        

		this.attachEvent("RolesToolbarClick", (id) => {

			if (id === "newRole") { 
				this._createRole();
			}
        
			if (id === "deleteRole") {
				var rowId = this.ui.getSelectedRowId();
				var rowIndex = this.ui.getRowIndex(rowId);
				if (rowId !== null) {
					this.ui.deleteRow(rowId);
					if (rowIndex !== (this.ui.getRowsNum() - 1)) {
						this.ui.selectRow(rowIndex + 1, true);
					} else {
						this.ui.selectRow(rowIndex - 1, true);
					}
				}            
			}
		});

	}

	_load(){
		getRoles(this.ui);
	}
    
	_createRole(){
		let data ={name: "new role"};
		createRole(this.ui, data);
	}
    
	_editCell(stage, id, index, new_value){

		var cell = this.ui.cells(id, index);

		if (stage === 2 && !cell.isCheckbox()) {
	
			if (id > 0 || typeof id !== "undefined") {				

				let data = {
					name: new_value
				};
				updateRole(data, id);
				
			}
			return true;
	
		} else if (stage === 0 && cell.isCheckbox()) {
			return true;
		}
	}
}