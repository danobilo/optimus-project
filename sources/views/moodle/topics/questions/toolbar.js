import {DHXView} from "dhx-optimus";

export class MoodleTopicsQuestionsGridToolbarView extends DHXView {

    render() {

        this.ui = this.root.attachToolbar({
            iconset: "awesome",
        });

        let struct = [
            {
                type: "buttonSelect", text: "New", options: [
                    {id: "10", type: "button", text: "Essay", img: ""},
                    {id: "3", type: "button", text: "Multichoice", img: ""},
                    {id: "5", type: "button", text: "Matching", img: ""},
                    {id: "8", type: "button", text: "Numerical", img: ""},
                    {id: "1", type: "button", text: "Short Answer", img: ""},
                    {id: "2", type: "button", text: "True/False", img: ""},
                ]
            },
            {id: "button_separator_1", type: "separator"},
            {id: "import", type: "button", text: "Import", img: ""},
            {id: "button_separator_2", type: "separator"},
            {id: "link", type: "button", text: "Link", img: ""},
            {id: "button_separator_3", type: "separator"},
            {id: "export", type: "button", text: "Export", img: ""},
            {id: "button_separator_4", type: "separator"},
            {id: "delete", type: "button", text: "Delete"}
        ];


        // this.ui.setIconSize(32);
        this.ui.attachEvent("onClick", (id) => this.app.callEvent("TopicQuestionsToolbarClick", [id]));
        this.ui.loadStruct(struct);

    }
}