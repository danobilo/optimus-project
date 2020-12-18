import {DHXView} from "dhx-optimus";
import {MoodleTopbarView} from "./toolbar";
import {MoodleTreeView} from "./tree";
import {MoodleTabbarView} from "./tabbar";

export class MoodleView extends DHXView {
    render() {
        this.ui = this.root.attachLayout("2U");
        this.ui.cells("a").setText("Courses");
        this.ui.cells("a").setWidth("350");

        this.show(MoodleTopbarView, this.ui.cells("a"));
        this.show(MoodleTreeView, this.ui.cells("a"));

        this.show(MoodleTabbarView, this.ui.cells("b"));
    }

}
