import {DHXView} from "dhx-optimus";

export class MoodleTopicsQuestionsFormView extends DHXView {

    render() {

        this.toolbar_questions = this.root.attachToolbar({
            iconset: "awesome",
        });
        this.toolbar_questions.addButton("save", 1, "Save", "", "");
        // this.toolbar.attachEvent("onClick", (id) => this.app.callEvent("QuestionsFormToolbarClick", [id]));


        this.ui = this.root.attachForm([
            {type: "settings", position: "label-left", labelWidth: 110, inputWidth: 220, offsetTop: 10, offsetLeft: 10},
            {type: "input", name: "title", label: "Title", required: true},
            {type: "input", name: "text", label: "Contents", required: true, rows: 3},
            {type: "combo", name: "type", label: "Type"},
            {type: "checkbox", name: "qoption", label: "Multiple_answer", hidden: "true"}
        ]);
    }
}