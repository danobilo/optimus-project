import {DHXView} from "dhx-optimus";
import { createDocument, getDocuments, createChapter, deleteDocument } from "../../api/documentsApi";
import { deleteChapter } from "../../api/chapterApi";

export class DocumentsGridView extends DHXView{

	render(){

		let sId = null;
		let level = null;
		this.ui = this.root.attachGrid();
		this.ui.setImagePath("./codebase/terrace/imgs/");

		this.ui.setHeader([
			"ID",
			"Title",
			"Owner",
			"Date Created",
			"Publish",
			"Show Details",
		]);
		this.ui.setColTypes("ro,tree,ro,ro,ch,ch");
      
		this.ui.setColSorting("int,str,str,str,int,int");
		this.ui.setInitWidthsP("10,*,15,15,12,14");
		this.ui.init();
			
		this.ui.attachEvent("onRowSelect", (id) =>{

			sId = id;
			level = this.ui.getLevel(id);

			if(level > 0){
				this.app.callEvent("showChapterContent",[id]);
			}
			
			this.app.callEvent("UpdateDetailsForm", [level]);

		});
		this.ui.attachEvent("onRowInserted",(r, index)=>{
			// this.ui.setCellTextStyle(this.ui.getRowId(index), this.ui.getColIndexById("name"), "font-weight:bold;border-left-width:0px;");
		});

		this.addService("DocumentGrid", {
			selected:() => sId,
			rowLevel: ()=> level
		});

		this.attachEvent("UpdateDocumentText", (id, text) => {
			this.ui.setItemText(id, text);
		});

		this.attachEvent("DocumentsToolbarClick", (id) => {

			var pId = this.app.getService("ProjectTree").selected();
			var rowId = this.ui.getSelectedRowId();
			var level = this.ui.getLevel(rowId);

			switch (id) {

				case "document":					

					if (!(pId > 0)) {
		
						dhtmlx.alert({
							type: "alert-error",
							text: "First select a project.",
							title: "Error!"
						});
						return;
					}					
					this._createDocument(pId);
		
					break;

				case "chapter":

					if (this.ui.getSelectedRowId() === null) {
						dhtmlx.alert({
							type: "alert-error",
							text: "First Select a Document.",
							title: "Error!"
						});
						return;
					}
		
					var docId = this.ui.getSelectedRowId().substring(4);
		
					var parentId = (this.ui.getLevel(this.ui.getSelectedRowId()) == 0) ? 0 : this.ui.getSelectedRowId();

					this._createChapter(pId, docId, parentId);
	
		
					break;

				case "delete":

					this._delete(rowId, level, pId);
					break;
				

			}
		});

		this.attachEvent("loadDocumentGrid", (id) =>{
			this._load(id);
		});

		this.attachEvent("deleteDocument", (rowId, level, pId)  => {
			if (level > 0) {
				this._deleteChapter(rowId);
			} else {
				this._deleteDocument(rowId, pId);
			}
		});
	}
	
	_load(pId) {
		getDocuments(this.ui, pId);
	}

	_createDocument(pId){

		let document = {id: pId, title: "New Document"};
		createDocument(this.ui, document);
	}

	_createChapter(pId, docId, parentId){

		let chapter = {document: docId, parent: parentId, title: "New Chapter"};
		createChapter(this.ui, chapter, pId);

	}

	_delete(rowId, level, pId) {

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
					app.callEvent("deleteDocument", [rowId, level, pId]);					
				} else {
					return false;
				}
			}
		});
	}

	_deleteDocument(rowId, pId){
		deleteDocument(this.ui, rowId, {pId:pId});
	}

	_deleteChapter(rowId){
		deleteChapter(this.ui, rowId);
	}
	
}
