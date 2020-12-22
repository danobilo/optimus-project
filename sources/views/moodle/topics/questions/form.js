import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../../../api/baseUrl";
import {DHXAlertView} from "../../../../helpers/alerts";


const baseUrl = getBaseUrl();
const appAlerts = new DHXAlertView();

export class MoodleTopicsQuestionsFormView extends DHXView {

    render() {

        this.toolbar_questions = this.root.attachToolbar({
            iconset: "awesome",
        });
        this.toolbar_questions.addButton("save", 1, "Save", "", "");
        this.toolbar_questions.attachEvent("onClick", (id) => this.app.callEvent("TopicsQuestionsFormToolbarClick", [id]));


        this.ui = this.root.attachForm([
            {type: "settings", position: "label-left", labelWidth: 110, inputWidth: 220, offsetTop: 10, offsetLeft: 10},
            {type: "input", name: "title", label: "Title", required: true},
            {type: "input", name: "text", label: "Contents", required: true, rows: 3},
            {
                type: "combo", name: "type", label: "Type", options: [
                    {value: "10", text: "Essay"},
                    {value: "3", text: "Multichoice"},
                    {value: "5", text: "Matching"},
                    {value: "8", text: "Numerical"},
                    {value: "1", text: "Short Answer"},
                    {value: "2", text: "True/False"}
                ]
            },
            {type: "checkbox", name: "qoption", label: "Multiple_answer", hidden: "true"}
        ]);


        this.attachEvent("loadTopicsQuestionsForm", (question_id) => {
            this.ui.clear();
            this.ui.load(baseUrl + `question/show/${question_id}`);
        });

        this.attachEvent("TopicsQuestionsFormToolbarClick", () => {

            let question_id = this.app.getService("TopicQuestionsGrid").question();

            if (question_id == null) {

                dhtmlx.alert({
                    type: "alert-error",
                    text: "First Select a Question.",
                    title: "Error!"
                });
                return;
            }

            let page_id = this.app.getService("TopicsGrid").selected();

            this.ui.send(baseUrl + `question/update/${question_id}`, "post", (loader, response) => {
                response = JSON.parse(response);

                if (response.success) {
                    appAlerts._message(response.text);
                    this.app.callEvent("loadTopicQuestionsGrid", [page_id]);
                } else {
                    appAlerts._error("An error occured, please contact system admin");
                }
            });
        });
    }
}