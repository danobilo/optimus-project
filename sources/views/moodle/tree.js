import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../api/baseUrl";

const baseUrl = getBaseUrl();

export class MoodleTreeView extends DHXView {

    render() {

        let course_id = null;
        let server_id = null;

        this.ui = this.root.attachTreeView();
        // this.ui.setIconsPath('./codebase/skyblue/imgs/dhxtree_skyblue/');
        this.ui.setSkin('dhx_web');
        this.ui.enableContextMenu(true);
        this.ui.loadStruct(baseUrl + `course/list`);

        this.ui.attachEvent("onClick", (id) => {

            let selectedId = id.split("_");
            course_id = selectedId[1];
            server_id = selectedId[0];

            this.app.callEvent("loadTopicsGrid", [server_id, course_id]);
            this.app.callEvent("loadMainQuestionsGrid",[course_id]);
        });

        this.addService("CoursesTree", {
            course:() => course_id,
            server:() => server_id,
        });
    }

}


	