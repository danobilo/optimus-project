import { DHXView } from "dhx-optimus";
import {MoodleTopicQuestionsLayoutView} from "./questions/layout";
import {MoodleTopicContentView} from "./content";
import {ProjectsView} from "../../projects/layout";
import {MoodleTopicsLessonView} from "./lesson";

export class MoodleTopicsTabbarView extends DHXView {

    render() {

        this.ui = this.root.attachTabbar({
            close_button: false,
        });

        this.ui.addTab("tab_1", "Lesson Content");
        let tab_1 = this.ui.cells("tab_1");
        tab_1.setActive();

        this.addSlot("tab_1", tab_1);
        this.show(MoodleTopicContentView, "tab_1");

        this.ui.addTab("tab_2", "Lesson Questions");
        let tab_2 = this.ui.cells("tab_2");

        this.show(MoodleTopicQuestionsLayoutView, tab_2);

        this.attachEvent("TopicsSelect", (id) => {
            if (id === "lesson")
                this.show(MoodleTopicsLessonView, "tab_1");
            else
                this.show(MoodleTopicContentView, "tab_1");
        });
    }

}