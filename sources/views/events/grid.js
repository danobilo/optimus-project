import {DHXView} from "dhx-optimus";
import { createEvent, getEvents, deleteEvent } from "../../api/eventsApi";

export class EventsGridView extends DHXView{
	render(){
		this.ui = this.root.attachGrid();
		this.ui.setIconsPath("./codebase/imgs/");

		this.ui.setHeader(["ID","Description","Owner","Assigned To","Begin Date","End Date","Visible","Status"]);
		this.ui.setColumnIds("id,details,creator,assigned,start_date,end_date,is_visible,status");
		this.ui.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,");
		this.ui.setColTypes("ro,ed,ro,ro,dhxCalendar,dhxCalendar,ch,combo");
		this.ui.setDateFormat("%Y-%m-%d %H:%i");
		this.ui.setColAlign("left,left,left,left,left,left,center,left");
		this.ui.setColSorting("str,str,str,str,date,date,int,str");
		this.ui.setInitWidthsP("8,*,9,20,15,15,6,10");
		this.ui.enableCellIds(true);
		this.ui.enableMultiline(true);
		this.ui.enableMultiselect(true);
		this.ui.init();

		let combo = this.ui.getColumnCombo(7);
		combo.addOption([
			{value: "0", text: "To do"},
			{value: "1", text: "In Progress"},
			{value: "2", text: "Done", css: "color:green;"},
			{value: "3", text: "Verified"},
			{value: "4", text: "Implemented"}
		]);


		this.attachEvent("PlanningToolbarClick", (id) => {

			switch (id) {

				case "new":
					this._createEvent();		
					break;

				case "delete":
					this._delete();			
					break;
			}
		});

		this.attachEvent("loadEventsGrid", (id, level) =>{
			this._load(id, level);
		});

		this.attachEvent("deleteEvent", (rowId)  => {		
			this._deleteEvent(rowId);
		});
	}
	
	_load(rowId, level) {

		var projectId = this.app.getService("ProjectTree").selected();

		if (level == 0) {
			getEvents(this.ui, projectId, "document", rowId.substring(4));
		} else {
			getEvents(this.ui, projectId, "chapter", rowId);
		}
	}

	_createEvent(){

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

		var rowId = this.app.getService("DocumentGrid").selected();

		if (rowId == null) {

			dhtmlx.alert({
				type: "alert-error",
				text: "First Select a Document.",
				title: "Error!"
			});
			return;
		}

		var level = this.app.getService("DocumentGrid").rowLevel();

		let data ={project_id: projectId};
		let type = null;

		if (level == 0) {

			data.document_id = rowId.substring(4);
			type = "document";

			createEvent(this.ui, data, projectId, type, rowId.substring(4));
		} else {

			data.chapter_id = rowId;
			type = "chapter";		

			createEvent(this.ui, data, projectId, type, rowId);
		}
		
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
			text: "Are you sure you to delete this Event?",
			callback: function (ok) {
				if (ok) {
					app.callEvent("deleteEvent", [rowId]);					
				} else {
					return false;
				}
			}
		});

	}

	_deleteEvent(id){
		deleteEvent(this.ui, id);
	}	
}