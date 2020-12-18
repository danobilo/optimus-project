import {DHXView} from "dhx-optimus";
import {MoodleQuestionsToolbarView} from "./toolbar";
import {MoodleQuestionsGridView} from "./grid";
import {MoodleAnswersToolbarView} from "./answers/toolbar";
import {MoodleAnswersGridView} from "./answers/grid";

export class MoodleCourseQuestionsView extends DHXView {

    render() {
        this.ui = this.root.attachLayout("2E");
        this.ui.cells("a").hideHeader();
        this.show(MoodleQuestionsToolbarView, this.ui.cells("a"));
        this.show(MoodleQuestionsGridView, this.ui.cells("a"));

        this.ui.cells("b").setText("Answers");
        this.show(MoodleAnswersToolbarView, this.ui.cells("b"));
        this.show(MoodleAnswersGridView, this.ui.cells("b"));

    }

}