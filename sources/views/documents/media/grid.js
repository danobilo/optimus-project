import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../../api/baseUrl";
import { getMedia } from "../../../api/mediaApi";
import { addDocumentMedia, getDocumentMedia } from "../../../api/documentsApi";

const baseUrl = getBaseUrl();

export class DocumentMediaGridView extends DHXView {
	render(){

		this.ui = this.root.attachGrid();
		this.ui.setSkin('dhx_web');
		this.ui.setImagesPath('./codebase/web/imgs/');
		this.ui.setHeader(["Title","Link (Copy this to embed in moodle)","Start Time","End Time","Date","Type"]);
		this.ui.setColTypes("tree,ro,ro,ro,ro,ro");
		this.ui.enableCellIds(true);
		this.ui.setColumnIds("title,link,start_time,end_time,date,type");
		this.ui.setColSorting("str,str,str,str,str,str");
		this.ui.setInitWidthsP("20,*,12,12,14,10");  

		this.ui.init();

		this.ui.attachEvent("onSelectStateChanged", (id) => {

			let path = this.ui.cells(id, 1).getValue();
			this.app.callEvent("showDocumentMedia",[path]);		
		});

		this.attachEvent("DocumentMediaToolbarClick", (id) => {

			switch (id) {

				case "add":

					let rowId = this.app.getService("DocumentGrid").selected();

					if (rowId === null) {
						dhtmlx.alert({
							type: "alert-error",
							text: "First select an document.",
							title: "Error!"
						});
						return;
					}

					this._addMedia();
					break;

				case "upload":
					this._uploadFile();		
					break;

				case "delete":
					this._delete();			
					break;
			}
		});

		this.attachEvent("AddDocumentMediaToolbarClick", (ids) => {
			this._sendMedia(ids);
		});

		this.attachEvent("loadDocumentMediaGrid", (id, level) => {
			this._load(id, level);
		});

		this.attachEvent("deleteDocumentMedia", (rowId)  => {		
			// this._deleteFile(rowId);
		});
	}
	
	_load(docId, level) {

		if (level == 0) {
			getDocumentMedia(this.ui, "document", docId.substring(4));
		} else {
			getDocumentMedia(this.ui, "chapter", docId);
		}
	}

	_uploadFile(){

		let rowId = this.app.getService("DocumentGrid").selected();

		if (rowId === null) {
			dhtmlx.alert({
				type: "alert-error",
				text: "First select an document.",
				title: "Error!"
			});
			return;
		}

		let level = this.app.getService("DocumentGrid").rowLevel();
		let doc_id = rowId.substring(4);
		let app = this.app;

		var uploadBoxformData = [
            // {type: "hidden", label: "ID", name: "id", value: ((level > 0) ? rowId : doc_id)},
            // {type: "hidden", label: "type", name: "type", value: ((level > 0) ? "chapter" : "document")},
			{	
				type: "fieldset",
				label: "Uploader",
				list: [{
					type: "upload",
					name: "file",
					inputWidth: 330,
					url: baseUrl + "file/upload/" + ((level > 0) ? rowId : doc_id) + "/" + ((level > 0) ? "chapter" : "document"),
					swfPath: "dhtmlx/codebase/ext/uploader.swf"
				}]			
			}
		];


		var picUploadMainWindow = new dhtmlXWindows();
		var picUploadWindow = picUploadMainWindow.createWindow("uploadpic_win", 0, 0, 420, 210);
		picUploadWindow.center();
		picUploadWindow.setText("Upload file(s)");

            //add form
		var uploadpicForm = picUploadWindow.attachForm(uploadBoxformData);


		uploadpicForm.attachEvent("onUploadComplete", function () {
			dhtmlx.message("file uploaded");

			app.callEvent("loadDocumentMediaGrid", [rowId, level]);
			picUploadMainWindow.window("uploadpic_win").hide();
		});

		uploadpicForm.attachEvent("onUploadFail", function (realName) {
			dhtmlx.alert({title: "Error", text: "The was an error uploading " + realName});
		});
	}	

	_delete(){

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
					app.callEvent("deleteDocumentMedia", [rowId]);					
				} else {
					return false;
				}
			}
		});

	}

	// _deleteFile(id){
	// 	deleteFile(this.ui, id);
	// }	

	_addMedia(){
		let app = this.app;
		this.window = new dhtmlXWindows();	
		let window_1 = this.window.createWindow("add_root_win", 0, 0, 900, 600);
		window_1.center();
		window_1.setText("Add Document Media");

		let layout = window_1.attachLayout("1C");
		layout.cells("a").hideHeader();

		let toolbar = layout.cells("a").attachToolbar();
		toolbar.addButton("save", 1, "Add Selected", "", "");
		toolbar.addSeparator("sep_01", 2);
		toolbar.addButton("upload", 3, "Upload New", "", "");
		toolbar.attachEvent("onClick", (id) => {

			if(id == "save") {

				var ids = grid.getSelectedRowId();
				app.callEvent("AddDocumentMediaToolbarClick", [ids]);
				this.window.unload();
			}
			
		});

		let grid = layout.cells("a").attachGrid();
		grid.setImagePath("./codebase/terrace/imgs/");

		grid.setHeader(["Title","Link (Copy this to embed in moodle)","Start Time","End Time","Date","Type"]);
		grid.setColTypes("tree,ro,ro,ro,ro,ro");
		grid.enableCellIds(true);
		grid.setColumnIds("title,link,start_time,end_time,date,type");
		grid.setColSorting("str,str,str,str,str,str");
		grid.setInitWidthsP("20,*,12,12,14,10");  
		grid.enableMultiselect(true);
		grid.setColumnHidden(2,true);
		grid.setColumnHidden(3,true);
		grid.setColumnHidden(4,true);
		grid.setColumnHidden(5,true);

		grid.init();

		this._load_grid(grid);


	}

	_sendMedia(ids){

		let rowId = this.app.getService("DocumentGrid").selected();
		let level = this.app.getService("DocumentGrid").rowLevel();
		let data = {ids: ids, n_value: 1, document_id: rowId.substring(4)};
		if (level == 0) {
			data.document_id = rowId.substring(4);
			addDocumentMedia(this.ui, "document", data);
		} else {
			data.document_id = rowId;
			addDocumentMedia(this.ui, "chapter", data);
		}
		

	}

	_load_grid(grid){
		var projectId = this.app.getService("ProjectTree").selected();
		getMedia(grid, projectId);

	}
}