import { DHXView } from "dhx-optimus";
import {MoodleTopicsTabbarView} from "./tabbar";
import {MoodleTopicsToolbarView} from "./toolbar";
import {MoodleTopicsGridView} from "./grid";

export class MoodleTopicsView extends DHXView {

    render() {

        this.ui = this.root.attachLayout("2U");
        this.ui.cells("a").hideHeader();
        this.ui.cells("a").setWidth("600");

        this.show(MoodleTopicsToolbarView, this.ui.cells("a"));

        this.show(MoodleTopicsGridView, this.ui.cells("a"));

        this.show(MoodleTopicsTabbarView, this.ui.cells("b"));

    }

}