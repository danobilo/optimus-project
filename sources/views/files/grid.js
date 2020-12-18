import {DHXView} from "dhx-optimus";
import getBaseUrl, { getFileUrl } from "../../api/baseUrl";
import { getFiles, deleteFile } from "../../api/filesApi";

const baseUrl = getBaseUrl();
const fileUrl = getFileUrl();

export class FilesGridView extends DHXView{
	render(){

		this.ui = this.root.attachGrid();
		this.ui.setSkin('dhx_web');
		this.ui.setImagesPath('./codebase/web/imgs/');

		this.ui.setHeader(["ID", "File Name", "File Type", "File Size", "Upload Date", "Uploaded By", "Path"]);
		this.ui.setColTypes("ro,ro,ro,ro,ro,ro,ro");
		this.ui.setColSorting("str,str,str,str,str,str,str");
		this.ui.enableCellIds(true);
		this.ui.setColumnIds("id,title,type,size,created_at,uploader,path");
		this.ui.setInitWidthsP("7,*,15,10,*,*,0");

		this.ui.init();

		this.ui.attachEvent("onSelectStateChanged", (id) => {

			let path = fileUrl + this.ui.cells(id, 6).getValue();
			this.app.callEvent("showDocumentFile",[path]);		
		});

		this.attachEvent("FilesToolbarClick", (id) => {

			switch (id) {

				case "upload":
					this._uploadFile();		
					break;

				case "delete":
					this._delete();			
					break;
			}
		});

		this.attachEvent("loadFilesGrid", (id, level) => {
			this._load(id, level);
		});

		this.attachEvent("deleteFile", (rowId)  => {		
			this._deleteFile(rowId);
		});
	}
	
	_load(docId, level) {

		if (level == 0) {
			getFiles(this.ui, "document", docId.substring(4));
		} else {
			getFiles(this.ui, "chapter", docId);
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

			app.callEvent("loadFilesGrid", [rowId, level]);
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
					app.callEvent("deleteFile", [rowId]);					
				} else {
					return false;
				}
			}
		});

	}

	_deleteFile(id){
		deleteFile(this.ui, id);
	}	
}