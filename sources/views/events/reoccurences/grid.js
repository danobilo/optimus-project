import {DHXView} from "dhx-optimus";
import { generateEventReocurences, getEventReoccurences } from "../../../api/eventsApi";

export class EventReoccurencesGridView extends DHXView{
	render(){

		this.ui = this.root.attachGrid();
		this.ui.setSkin('dhx_web');
		this.ui.setImagesPath('./codebase/web/imgs/');

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


		this.attachEvent("EventReoccurenceToolbarClick", (id) => {

			switch (id) {

				case "new":

					break;

				case "delete":

					break;

				case "generate":

					this._generateEvents();
					break;
                    
			}
		});

		this.attachEvent("loadEventReoccurenceGrid", (id) =>{
			this._load(id);
		});
	}
	
	_load(event_id) {

		getEventReoccurences(this.ui, event_id);
	}

	_createEvent(){

		
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
				
				} else {
					return false;
				}
			}
		});

	}

	_deleteEvent(id){

	}	
    
	_generateEvents(){

		var eventId = this.app.getService("EventGrid").selected();
		generateEventReocurences(this.ui, eventId);
	}
}