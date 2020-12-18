import {DHXView} from "dhx-optimus";

export class MoodleTopicsQuestionsGridToolbarView extends DHXView {

    render() {

        let struct = [
            {id: "new", type: "button", text: "New", img: ""},
            {id: "button_separator_1", type: "separator"},
            {id: "import", type: "button", text: "Import", img: ""},
            {id: "button_separator_2", type: "separator"},
            {id: "link", type: "button", text: "Link", img: ""},
            {id: "button_separator_3", type: "separator"},
            {id: "export", type: "button", text: "Export", img: ""},
            {id: "button_separator_4", type: "separator"},
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