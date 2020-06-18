import { DHXView } from "dhx-optimus";

export class VideoMainFormView extends DHXView {
	render() {
		this.toolbar = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.toolbar.addButton("save", 1, "Save", "", "");
    // this.ui.setIconSize(32);


		this.form = this.root.attachForm([
			{
				type: "block",
				name: "form_block_4",
				list: [
					{
						type: "input",
						name: "form_input_9",
						label: "Description",
						labelWidth: 100,
					},
					{
						type: "input",
						name: "form_input_10",
						label: "Date Updated",
						labelWidth: 100,
					},
					{
						type: "combo",
						name: "form_combo_4",
						label: "Type",
						labelWidth: 100,
						inputWidth: 170,
						options: [
              { value: "form_option_7", text: "Video" },
              { value: "form_option_8", text: "Video Guide" },
						],
					},
				],
			},
		]);
	}
}
