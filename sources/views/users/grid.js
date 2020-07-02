import {DHXView} from "dhx-optimus";
import { getUsers, createUser, updateUser } from "../../api/userApi";
import { getSelectRoles } from "../../api/rolesApi";

export class UsersGridView extends DHXView{
	render(){

		let sId = null;

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

		this.ui.attachEvent("onSelectStateChanged", (id) => {

			sId = id;
			this.app.callEvent("LoadUserForm", [id]);
			this.app.callEvent("checkUserProjects", [id]);
			
		});

		this.addService("UserGrid", {
			selected:() => sId,
		});

		this.attachEvent("UpdateUser", (data) => this._updateUser(data));

		this.attachEvent("UsersToolbarClick", (id) => {

			if (id === "newContact") {
				this._addUser();
			}
	
			if (id === "delContact") {
				let rowId = contactsGrid.getSelectedRowId();
				let rowIndex = contactsGrid.getRowIndex(rowId);
				if (rowId !== null) {
					$.post("./users/" + rowId + "/delete", null, function (data) {
						contactsGrid.deleteRow(rowId);
						if (rowIndex !== (contactsGrid.getRowsNum() - 1)) {
							contactsGrid.selectRow(rowIndex + 1, true);
						} else {
							contactsGrid.selectRow(rowIndex - 1, true);
						}
					});
				}
			}
		});

	}
	
	_load() {
		getUsers(this.ui);
	}

	_addUser(){

		let grid = this.ui;
		let windows = new dhtmlXWindows();
		let add_doc_window = windows.createWindow("add_doc_window", 0, 0, 500, 400);
		add_doc_window.setText("Add New User");
		add_doc_window.setModal(1);
		add_doc_window.centerOnScreen();
		add_doc_window.button("park").hide();
		add_doc_window.button("minmax").hide();

		let str = [
			{
				type: "settings",
				position: "label-left",
				offsetLeft: "20",
				offsetTop: "5",
				labelWidth: 150,
				inputWidth: 200
			},
		{type: "input", name: "name", label: "Name", required: true},
		{type: "input", name: "email", label: "Email", required: true},
		{type: "password", name: "password", label: "Password", required: true},
		{type: "password", name: "password_confirmation", label: "Confirm Password", required: true},
		{type: "multiselect", name: "roles", label: "Roles", size: 8, options:[] },
		{type: "button", name: "form_button_2", value: "Save", inputLeft: 200}
		];

		let form_3 = add_doc_window.attachForm(str);
		getSelectRoles(form_3);
		
		// form_3.attachEvent("onOptionsLoaded", function(name) {
		// 	console.log(name);				
		// });

		form_3.attachEvent("onButtonClick", function () {
			let data = form_3.getFormData();
			createUser(grid, data);
			add_doc_window.close();			
		});
	}	

	_deleteRow(){

		let rowId = this.ui.getSelectedRowId();
		let app = this.app;
	
		if (rowId === null) {
			dhtmlx.alert({
				type: "alert-error",
				text: "No item selected!",
				title: "Error!"
			});
			return;
		}

		dhtmlx.confirm({
			title: "Confirm",
			type: "confirm-warning",
			text: "Are you sure you to delete this File?",
			callback: function (ok) {
				if (ok) {
					app.callEvent("deleteUser", [rowId]);					
				} else {
					return false;
				}
			}
		});

	}

	_updateUser(data) {
		updateUser(this.ui, data, this.ui.getSelectedRowId());
	}

	_deleteUser(id){

	}	
}