import { DHXView } from "dhx-optimus";
import { getEventDetails, getUserList, updateEvent, addEventUser } from "../../api/eventsApi";

export class EventFormView extends DHXView {
	render() {
        
		this.toolbar = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.toolbar.addButton("save", 1, "Save", "", "");
		this.toolbar.attachEvent("onClick", (id) => this.app.callEvent("EventFormToolbarClick", [id]));
        

		this.ui = this.root.attachForm([
			{
				type: "settings",
				position: "label-left",
				labelWidth: 80,
				inputWidth: 200,
				offsetTop: 6,
				offsetLeft: 20
			},
            {type: "hidden", label: "ID", name: "event_id", value: ""},
            {type: "hidden", label: "Event Name", name: "title", value: ""},
            {type: "input", label: "Description", rows: 3, name: "details", value: ""},
            {type: "combo", comboType: "checkbox", label: "Assigned To", name: "emp", value: ""},
			{
				type: "label", offsetTop: 0, list: [
					{ type: "calendar", 
						position: "label-left", 
						dateFormat: "%Y-%m-%d", 
						serverDateFormat: "%Y-%m-%d", 
						enableTime: false, 
						label: "Start Date", 
						inputWidth: 90, 
						name: "start_date",
						value: "",
						readonly: false,
						offsetLeft: 0
					},
					{
						type: "calendar",
						position: "label-left",
						dateFormat: "%Y-%m-%d",
						serverDateFormat: "%Y-%m-%d",
						enableTime: false,
						label: "End Date",
						inputWidth: 90,
						name: "end_date",
						value: "",
						readonly: false,
						offsetLeft: 0
					}, 
                    {type: "newcolumn", offsetLeft: 10},
					{
						type: "input",
						label: "Time",
						position: "label-left",
						name: "begin_time",
						value: "",
						inputWidth: 90,
						offsetLeft: 10,
						labelWidth: 30
					},
					{
						type: "input",
						label: "Time",
						position: "label-left",
						name: "end_time",
						value: "",
						inputWidth: 90,
						offsetLeft: 10,
						labelWidth: 30
					}
				]
			},
            {type: "newcolumn", offset: 30},
			{
				type: "label", name: "label_days", label: "Select Days",
				list: [
                    {type: "checkbox", name: "days_select[1]", labelWidth: 25, offsetLeft: 0, label: "Mon"},
                    {type: "newcolumn"},
                    {type: "checkbox", name: "days_select[2]", labelWidth: 25, label: "Tue"},
                    {type: "newcolumn"},
                    {type: "checkbox", name: "days_select[3]", labelWidth: 25, label: "Wed"},
                    {type: "newcolumn"},
                    {type: "checkbox", name: "days_select[4]", labelWidth: 25, label: "Thur"},
                    {type: "newcolumn"},
                    {type: "checkbox", name: "days_select[5]", labelWidth: 25, label: "Fri"},
                    {type: "newcolumn"},
                    {type: "checkbox", name: "days_select[6]", labelWidth: 25, label: "Sat"},
                    {type: "newcolumn"},
                    {type: "checkbox", name: "days_select[7]", labelWidth: 25, label: "Sun"},
				],
			},
			{
				type: "combo", name: "frequency", label: "Frequency", offsetLeft: 20, inputWidth: 150, options: [
                    {value: "1", text: "Every Week", selected: true},
                    {value: "2", text: "Every (2) Weeks"},
                    {value: "10", text: "Every (3) Weeks"},
                    {value: "7", text: "Every (4) Weeks"},
                    {value: "9", text: "Every (8) Weeks"},
                    {value: "3", text: "Every Month"},
                    {value: "8", text: "Every (2) Month"},
                    {value: "4", text: "Every (12) Weeks"},
                    {value: "5", text: "Every half year"},
                    {value: "6", text: "Every year"}
				]
			},
			{
				type: "checkbox",
				name: "is_variable",
				position: "label-left",
				labelWidth: 100,
				value: "1",
				label: "Enable Variable",
				checked: false,
				offsetLeft: 20
			},
            {type: "input", label: "Information", rows: 3, name: "comments", value: ""},
		]);
        
		let UserCombo = this.ui.getCombo("emp");
		UserCombo.enableFilteringMode(true);
		this._loadUserCombo(UserCombo);

		UserCombo.attachEvent("onCheck", (value, state) => {

			var assigned = [];

			var checked_empl = UserCombo.getChecked();
			checked_empl.forEach( (item) => {	
				var option = UserCombo.getOption(item);
				assigned.push(option.text);
			});
			var n_text = assigned.join(", ");
			UserCombo.setComboText(n_text);

			this.app.callEvent("UpdateEventGridAssignedTo",[n_text]);

			this._addUser(value, state);
		});
        
		this.attachEvent("loadEventForm", (id) =>{

			var checked_empl = UserCombo.getChecked();
			checked_empl.forEach( (item) => {
				var index = UserCombo.getIndexByValue(item);
				UserCombo.setChecked(index, false);
			});

			this._load(id);
		});

		this.attachEvent("EventFormToolbarClick", () => {

			var eventId = this.app.getService("EventGrid").selected();

			if (eventId == null) {

				dhtmlx.alert({
					type: "alert-error",
					text: "First Select an Event.",
					title: "Error!"
				});
				return;
			}

			this._updateEvent(eventId);
		});
        

	}
	_load(id) {
		this.ui.clear();
		getEventDetails(this.ui, id);
	}
    
	_loadUserCombo(context){
		getUserList(context);
	}

	_updateEvent(id){
		updateEvent(this.ui, id);
	}

	_addUser(value, state){

		var eventId = this.app.getService("EventGrid").selected();

		let data = {
			event_id: eventId,
			user_id: value,
			new_value: ((state) ? 1 : 0)
		};
		
		addEventUser(data);
	}

}