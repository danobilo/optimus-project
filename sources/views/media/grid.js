import {DHXView} from "dhx-optimus";

export class MediaGridView extends DHXView{

	render(){

		let sId = null;
		let level = null;
        
		this.ui = this.root.attachGrid();
		this.ui.setImagePath("./codebase/terrace/imgs/");

		this.ui.setHeader(["Title","Link (Copy this to embed in moodle)","Start Time","End Time","Date"]);
		this.ui.setColTypes("tree,ro,ro,ro,ro");
		this.ui.enableCellIds(true);
		this.ui.setColumnIds("title,link,start_time,end_time,date");
		this.ui.setColSorting("str,str,str,str,str");
		this.ui.setInitWidthsP("20,*,12,12,14");
		// this.ui.enableContextMenu(menu);		
		this.ui.init();

		// this.ui.attachEvent("onEditCell", (stage, id, index, new_value) => this.app.callEvent("DocumentGridEditCell",[stage, id, index, new_value]));

		// this.attachEvent("DocumentGridEditCell", (stage, id, index, new_value) => this._editCell(stage, id, index, new_value) );

		// this.ui.attachEvent("onBeforeContextMenu", (id) => {
		// 	this.app.callEvent("selectDocumentGridRow", [id]);
		// 	return true;
		// });

		// this.attachEvent("selectDocumentGridRow", (id) => this.ui.selectRowById(id) );
						
		// this.ui.attachEvent("onSelectStateChanged", (id) =>{

		// 	sId = id;
		// 	level = this.ui.getLevel(id);

		// 	this.app.callEvent("showDocumentContent",[id, level]);		
		// 	this.app.callEvent("UpdateDetailsForm", [level]);

		// 	this.app.callEvent("loadEventsGrid", [id, level]);
		// });

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

		// this.attachEvent("loadDocumentGrid", (id) =>{
		// 	this._load(id);
		// });

		// this.attachEvent("deleteDocument", (rowId, level)  => {		
		// 	this._deleteDocument(rowId, level);
		// });
	}
}