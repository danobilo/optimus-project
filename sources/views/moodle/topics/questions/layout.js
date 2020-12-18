import { DHXView } from "dhx-optimus";
import {MoodleTopicQuestionsGridView} from "./grid";
import {MoodleTopicsQuestionsGridToolbarView} from "./toolbar";
import {MoodleTopicsAnswersGridToolbarView} from "./answers/toolbar";
import {MoodleTopicsAnswersGridView} from "./answers/grid";
import {MoodleTopicsAnswersFormView} from "./answers/form";
import {MoodleTopicsQuestionsFormView} from "./form";

export class MoodleTopicQuestionsLayoutView extends DHXView {

    render() {

        this.ui = this.root.attachLayout("4C");
        this.ui.cells("a").hideHeader();
        // this.ui.cells("a").setWidth("350");
        this.show(MoodleTopicsQuestionsGridToolbarView, this.ui.cells("a"));
        this.show(MoodleTopicQuestionsGridView, this.ui.cells("a"));

        this.ui.cells("b").setText('Question Details');
        this.show(MoodleTopicsQuestionsFormView, this.ui.cells("b"));

        this.ui.cells("c").setText('Answers');
        this.show(MoodleTopicsAnswersGridToolbarView, this.ui.cells("c"));
        this.show(MoodleTopicsAnswersGridView, this.ui.cells("c"));

        this.ui.cells("d").setText('Answer Details');
        this.show(MoodleTopicsAnswersFormView, this.ui.cells("d"));


    }

}