import { DHXView } from "dhx-optimus";

export class EventFormView extends DHXView {
	render() {
        
        this.toolbar = this.root.attachToolbar({
			iconset: "awesome",
		});
        this.toolbar.addButton("save", 1, "Save", "", "");
        

		this.ui = this.root.attachForm([
			{
				type: "block", name: "form_block_3", list: [
                    { type: "input", name: "form_input_6", label: "Description", rows: "3", labelWidth: 100 },
                    { type: "combo", name: "form_combo_2", label: "Assignee(s)", labelWidth: 100, inputWidth: 120 },
                    { type: "calendar", name: "form_calendar_1", label: "Begin Date", labelWidth: 100, dateFormat: "%m-%d-%Y" },
                    { type: "calendar", name: "form_calendar_2", label: "End Date", labelWidth: 100, dateFormat: "%m-%d-%Y" },
                    { type: "newcolumn", offset: 10},
					{
						type: "fieldset", name: "form_fieldset_1", label: "Select Days", list: [
                            { type: "checkbox", name: "form_checkbox_2", label: "Mon" },
                            { type: "newcolumn" },
                            { type: "checkbox", name: "form_checkbox_3", label: "Tue" },
                            { type: "newcolumn" },
                            { type: "checkbox", name: "form_checkbox_4", label: "Wed" },
                            { type: "newcolumn" },
                            { type: "checkbox", name: "form_checkbox_5", label: "Thu" },
                            { type: "newcolumn" },
                            { type: "checkbox", name: "form_checkbox_6", label: "Fri" },
                            { type: "newcolumn" },
                            { type: "checkbox", name: "form_checkbox_7", label: "Sat" }
						]
					},
					{
						type: "combo", name: "form_combo_3", label: "Frequency", labelWidth: 100, inputWidth: 120, options: [
                            { value: "form_option_3", text: "Once" },
                            { value: "form_option_4", text: "Daily" },
                            { value: "form_option_5", text: "Weekly" },
                            { value: "form_option_6", text: "Monthly" }
						]
					},
                    { type: "checkbox", name: "form_checkbox_8", label: "Enable Variable", labelWidth: 100 },
                    { type: "input", name: "form_input_8", label: "Extra Info", labelWidth: 100 }
				]
			}
		]);
		this._load();
        // this.ui.centerForm();
        // this.attachEvent("onContactSelect", e =>this._update(e.data.photo,e.data));
	}
	_load() {
        // this.ui.load("codebase/data/contacts.xml");
	}

}