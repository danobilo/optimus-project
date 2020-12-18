import {DHXView} from "dhx-optimus";

export class MoodleTopicsToolbarView extends DHXView {

    render() {
        let struct = [
            {
                type: "buttonSelect", text: "New", options: [
                    {id: "category", type: "button", text: "Category", img: ""},
                    {id: "course", type: "button", text: "Course", img: ""},
                ]
            },
            {id: "button_separator_8", type: "separator"},
            {id: "delete", type: "button", text: "Delete"}
        ];

        this.ui = this.root.attachToolbar({
            iconset: "awesome",
        });
        // this.ui.setIconSize(32);
        // this.ui.attachEvent("onClick", (id) => this.app.callEvent("MoodleToolbarClick", [id]));
        this.ui.loadStruct(struct);
    }

}