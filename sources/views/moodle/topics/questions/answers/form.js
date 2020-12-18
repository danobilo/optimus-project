import {DHXView} from "dhx-optimus";

export class MoodleTopicsAnswersFormView extends DHXView {

    render() {

        this.toolbar_answers = this.root.attachToolbar({
            iconset: "awesome",
        });
        this.toolbar_answers.addButton("save", 1, "Save", "", "");
        // this.toolbar.attachEvent("onClick", (id) => this.app.callEvent("QuestionsFormToolbarClick", [id]));


        this.ui = this.root.attachForm([
            {type: "settings", position: "label-left", labelWidth: 110, inputWidth: 220, offsetTop: 10, offsetLeft: 10},
            {type: "input", name: "text", label: "Answer", required: true, rows: 3},
            {type: "input", name: "response", label: "Response", required: true},
            {type: "input", name: "score", label: "Score", required: true},
            {
                type: "combo", name: "jumpto", label: "Jumpto", options: [
                    {value: "0", text: "This Page"},
                    {value: "-1", text: "Next Page"}
                ]
            }
        ]);
        this.ui.setSkin('dhx_web');

        let page_answers_jumpto_combo = this.ui.getCombo("jumpto");
        page_answers_jumpto_combo.enableFilteringMode(true);

    }
}