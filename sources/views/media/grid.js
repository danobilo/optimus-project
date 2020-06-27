import {DHXView} from "dhx-optimus";
import getBaseUrl, { getFileUrl } from "../../api/baseUrl";
import { getMedia } from "../../api/mediaApi";


const baseUrl = getBaseUrl();
const fileUrl = getFileUrl();

export class MediaGridView extends DHXView {

	render() {

		let sId = null;
		let level = null;
        
		this.ui = this.root.attachGrid();
		this.ui.setImagePath("./codebase/terrace/imgs/");

		this.ui.setHeader(["Title","Link (Copy this to embed in moodle)","Start Time","End Time","Date","Type"]);
		this.ui.setColTypes("tree,ro,ro,ro,ro,ro");
		this.ui.enableCellIds(true);
		this.ui.setColumnIds("title,link,start_time,end_time,date,type");
		this.ui.setColSorting("str,str,str,str,str,str");
        this.ui.setInitWidthsP("20,*,12,12,14,10");        
		// this.ui.enableContextMenu(menu);		
		this.ui.init();
        
		this.attachEvent("MediaToolbarClick", (id) => {

            // alert(id);

			switch (id) {                    
				case "delete":
					this._delete();			
					break;
                    
				default:
					this._upload(id);		
					break;
			}
		});

		// this.ui.attachEvent("onEditCell", (stage, id, index, new_value) => this.app.callEvent("DocumentGridEditCell",[stage, id, index, new_value]));

		// this.attachEvent("DocumentGridEditCell", (stage, id, index, new_value) => this._editCell(stage, id, index, new_value) );

		// this.ui.attachEvent("onBeforeContextMenu", (id) => {
		// 	this.app.callEvent("selectDocumentGridRow", [id]);
		// 	return true;
		// });

		// this.attachEvent("selectDocumentGridRow", (id) => this.ui.selectRowById(id) );
						
		this.ui.attachEvent("onSelectStateChanged", (id) =>{

			sId = id;
			level = this.ui.getLevel(id);
            let path = this.ui.cells(id, 1).getValue();
			this.app.callEvent("showMediaContent",[path]);		
			// this.app.callEvent("UpdateDetailsForm", [level]);

			// this.app.callEvent("loadEventsGrid", [id, level]);
		});

		// this.addService("DocumentGrid", {
		// 	selected:() => sId,
		// 	rowLevel: () => level
		// });

		// this.attachEvent("UpdateDocumentText", (id, text) => {
		// 	this.ui.setItemText(id, text);
		// });

		// this.attachEvent("DocumentsToolbarClick", (id) => {

		// 	switch (id) {

		// 		case "document":
		// 			this._createDocument();		
		// 			break;

		// 		case "chapter":
		// 			this._createChapter();			
		// 			break;

		// 		case "delete":
		// 			this._delete();
		// 			break;		
		// 	}
		// });

		this.attachEvent("loadMediaGrid", (id) => {
			this._load(id);
		});

		// this.attachEvent("deleteDocument", (rowId, level)  => {		
		// 	this._deleteDocument(rowId, level);
		// });
	}
    
	_load(pId) {
		getMedia(this.ui, pId);
	}
    
	_upload(id) {

		let pId = this.app.getService("ProjectTree").selected();
		let isProject = pId > 0;

		if (!isProject) {
		
			dhtmlx.alert({
				type: "alert-error",
				text: "First select a project.",
				title: "Error!"
			});
			return;
		}	
        
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
					url: baseUrl + `media/upload/${pId}/${id}`,
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

			app.callEvent("loadMediaGrid", [pId]);
			picUploadMainWindow.window("uploadpic_win").hide();
		});

		uploadpicForm.attachEvent("onUploadFail", function (realName) {
			dhtmlx.alert({title: "Error", text: "The was an error uploading " + realName});
		});
	}	
}