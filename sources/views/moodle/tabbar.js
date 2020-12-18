import {DHXView} from "dhx-optimus";
import {MoodleCourseQuestionsView} from "./questions/layout";
import {MoodleTopicsView} from "./topics/layout";

export class MoodleTabbarView extends DHXView {
    render() {
        this.ui = this.root.attachTabbar({
            close_button: false,
        });

        this.ui.addTab("tab_1", "Course Topics");
        let tab_1 = this.ui.cells("tab_1");
        tab_1.setActive();

        this.show(MoodleTopicsView, tab_1);

        this.ui.addTab("tab_2", "Course Questions");
        let tab_2 = this.ui.cells("tab_2");
        this.show(MoodleCourseQuestionsView, tab_2);

    }
}
