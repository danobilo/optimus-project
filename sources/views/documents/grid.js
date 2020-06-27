import {DHXView} from "dhx-optimus";
import { createDocument, getDocuments, deleteDocument, editDocumentCell } from "../../api/documentsApi";
import { createChapter, deleteChapter,  editChapterCell } from "../../api/chapterApi";

export class DocumentsGridView extends DHXView{

	render(){

		let sId = null;
		let level = null;
		let menu = new dhtmlXMenuObject({
			context: true, // render it as context menu
		});
		this._loadMenu(menu);
		menu.attachEvent("onClick", (id) => this.app.callEvent("DocumentsToolbarClick", [id]));	

		this.ui = this.root.attachGrid();
		this.ui.setImagePath("./codebase/terrace/imgs/");

		this.ui.setHeader(["ID","Title","Owner","Date Created","Publish","Show Details"]);
		this.ui.setColTypes("ro,tree,ro,ro,ch,ch");
		this.ui.enableCellIds(true);
		this.ui.setColumnIds("id,title,author,created_at,is_published,details");
		this.ui.setColSorting("int,str,str,str,int,int");
		this.ui.setInitWidthsP("10,*,15,15,12,14");
		this.ui.enableContextMenu(menu);		
		this.ui.init();

		this.ui.attachEvent("onEditCell", (stage, id, index, new_value) => this.app.callEvent("DocumentGridEditCell",[stage, id, index, new_value]));

		this.attachEvent("DocumentGridEditCell", (stage, id, index, new_value) => this._editCell(stage, id, index, new_value) );

		this.ui.attachEvent("onBeforeContextMenu", (id) => {
			this.app.callEvent("selectDocumentGridRow", [id]);
			return true;
		});

		this.attachEvent("selectDocumentGridRow", (id) => this.ui.selectRowById(id) );
						
		this.ui.attachEvent("onSelectStateChanged", (id) =>{

			sId = id;
			level = this.ui.getLevel(id);

			this.app.callEvent("showDocumentContent",[id, level]);		
			this.app.callEvent("UpdateDetailsForm", [level]);

			this.app.callEvent("loadEventsGrid", [id, level]);
			this.app.callEvent("loadFilesGrid", [id, level]);
			this.app.callEvent("loadDocumentMediaGrid", [id, level]);
		});

		this.addService("DocumentGrid", {
			selected:() => sId,
			rowLevel: () => level
		});

		this.attachEvent("UpdateDocumentText", (id, text) => {
			this.ui.setItemText(id, text);
		});

		this.attachEvent("DocumentsToolbarClick", (id) => {

			switch (id) {

				case "document":
					this._createDocument();		
					break;

				case "chapter":
					this._createChapter();			
					break;

				case "delete":
					this._delete();
					break;		
			}
		});

		this.attachEvent("loadDocumentGrid", (id) =>{
			this._load(id);
		});

		this.attachEvent("deleteDocument", (rowId, level)  => {		
			this._deleteDocument(rowId, level);
		});
	}
	
	_load(pId) {
		getDocuments(this.ui, pId);
	}

	_createDocument(){

		var projectId = this.app.getService("ProjectTree").selected();
		var isProject = projectId > 0;

		if (!isProject) {
		
			dhtmlx.alert({
				type: "alert-error",
				text: "First select a project.",
				title: "Error!"
			});
			return;
		}					

		let document = {id: projectId, title: "New Document"};
		createDocument(this.ui, document);
	}

	_createChapter(){		

		if (this.ui.getSelectedRowId() === null) {
			dhtmlx.alert({
				type: "alert-error",
				text: "First Select a Document.",
				title: "Error!"
			});
			return;
		}

		var projectId = this.app.getService("ProjectTree").selected();
		var docId = this.ui.getSelectedRowId().substring(4);
		var parentId = (this.ui.getLevel(this.ui.getSelectedRowId()) == 0) ? 0 : this.ui.getSelectedRowId();

		let chapter = {document: docId, parent: parentId, title: "New Topic"};
		createChapter(this.ui, chapter, projectId);
	}

	_delete() {

		let rowId = this.ui.getSelectedRowId();
		let level = this.ui.getLevel(rowId);
		let app = this.app;
		
		if (rowId === null) {
			dhtmlx.alert({
				type: "alert-error",
				text: "No item selected!",
				title: "Error!"
			});
			return;
		}

		if (level > 0) {

			var hasChildren = this.ui.hasChildren(rowId);

			if (hasChildren) {

				dhtmlx.alert({
					type: "alert-error",
					text: "Row has child items!",
					title: "Error!"
				});
				return;		
			}

		}

		dhtmlx.confirm({
			title: "Confirm",
			type: "confirm-warning",
			text: "Are you sure you to delete this Document?",
			callback: function (ok) {
				if (ok) {
					app.callEvent("deleteDocument", [rowId, level]);					
				} else {
					return false;
				}
			}
		});
	}

	_deleteDocument(rowId, level) {

		if (level > 0) {
			deleteChapter(this.ui, rowId);
		} else {				
			var projectId = this.app.getService("ProjectTree").selected();
			deleteDocument(this.ui, rowId, {pId:projectId});
		}		
	}

	_loadMenu(menu){
		let struct = [
			{ id: "document", text: "New Document"},
			{ id: "chapter", text: "New Topic"},
			{ id: "delete", text: "Delete"}
		];

		menu.loadStruct(struct);
	}	

	_editCell(stage, id, index, new_value){

		var level = this.ui.getLevel(id);
		var cell = this.ui.cells(id, index);
	
		var colId = this.ui.getColumnId(index);
		var colType = this.ui.fldSort[index];
	
		if (stage === 2 && !cell.isCheckbox()) {
	
			if (id > 0 || typeof id !== "undefined") {				
	
				if (level == 0) {
					let data = {
						id: id.substring(4),
						index: index,
						nvalue: new_value,
						colId: colId,
						colType: colType
					};
					editDocumentCell(data);
				} else {

					let data = {
						id: id,
						index: index,
						nvalue: new_value,
						colId: colId,
						colType: colType
					};
					editChapterCell(data);
				}	
			}
			return true;
	
		} else if (stage === 0 && cell.isCheckbox()) {
			return true;
		}

	}
}
