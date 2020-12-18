import {DHXView} from "dhx-optimus";
import {ProjectDetailsView} from "./details";
import {DocumentsView} from "../documents/layout";
import {MediaView} from "../media/layout";

export class TabbarView extends DHXView {
    render() {
        this.ui = this.root.attachTabbar({
            close_button: false,
        });

        this.ui.addTab("tab_8", "Project Details");
        let tab_8 = this.ui.cells("tab_8");
        tab_8.setActive();

        this.show(ProjectDetailsView, tab_8);

        this.ui.addTab("tab_9", "Documents");
        let tab_9 = this.ui.cells("tab_9");
        this.show(DocumentsView, tab_9);

        // this.ui.addTab("tab_18", "Content");
        // let tab_18 = this.ui.cells("tab_18");
        // this.show(VideoTabbarView, tab_18);

        this.ui.addTab("tab_26", "Media");
        let tab_26 = this.ui.cells("tab_26");
        this.show(MediaView, tab_26);

    }
}
