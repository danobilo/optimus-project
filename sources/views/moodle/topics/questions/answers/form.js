import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../../../../api/baseUrl";
import {DHXAlertView} from "../../../../../helpers/alerts";


const baseUrl = getBaseUrl();
const appAlerts = new DHXAlertView();
export class MoodleTopicsAnswersFormView extends DHXView {

    render() {

        this.toolbar_answers = this.root.attachToolbar({
            iconset: "awesome",
        });
        this.toolbar_answers.addButton("save", 1, "Save", "", "");
        this.toolbar_answers.attachEvent("onClick", (id) => this.app.callEvent("TopicsAnswersFormToolbarClick", [id]));


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


        this.attachEvent("loadTopicsAnswersForm", (id) => {
            this.ui.clear();
            this.ui.load(baseUrl + `choice/show/${id}`);
        });

        this.attachEvent("TopicsAnswersFormToolbarClick", () => {

            let choice_id = this.app.getService("TopicsAnswersGrid").selected();

            if (choice_id == null) {

                dhtmlx.alert({
                    type: "alert-error",
                    text: "First Select a Choice.",
                    title: "Error!"
                });
                return;
            }

            let question_id = this.app.getService("TopicQuestionsGrid").question();

            this.ui.send(baseUrl + `choice/update/${choice_id}`, "post", (loader, response) => {
                response = JSON.parse(response);

                if (response.success) {
                    appAlerts._message(response.text);
                    this.app.callEvent("loadTopicsAnswersGrid", [question_id]);
                } else {
                    appAlerts._error("An error occured, please contact system admin");
                }
            });
        });

    }
}