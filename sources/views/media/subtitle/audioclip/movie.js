import {DHXView} from "dhx-optimus";

export class AudioClipMovieView extends DHXView{

	render(){

		let sId = null;
		let level = null;
        
		let grid_17 = (this.ui = this.root.attachGrid());
        grid_17.setSkin('dhx_web');
        grid_17.setImagesPath('./codebase/web/imgs/');

        grid_17.setHeader(["Audio Item", "Last Updated"]);
        grid_17.setColTypes("ro,ro");
      
        grid_17.setColSorting("str,str");
        grid_17.setInitWidths("*,*");
        grid_17.init();

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