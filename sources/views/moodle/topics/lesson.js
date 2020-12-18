import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../../api/baseUrl";
import axios from "axios";

const baseUrl = getBaseUrl();

export class MoodleTopicsLessonView extends DHXView {

    render() {

        this.ui = this.root.attachLayout("1C");
        this.ui.cells("a").hideHeader();

        this.ui.attachEvent("onContentLoaded", function (id) {
            this.ui.cells(id).progressOff();
        });

        let lessonId = this.app.getService("TopicsGrid").selected();

        this.ui.cells('a').progressOn();
        axios.get(baseUrl + 'course/lesson/' + lessonId.split("_")[1])
            .then((response) => {
                if (response.data.success) {
                    this.ui.cells("a").attachURL(response.data.url);
                    this.ui.cells(id).progressOff();
                }
            })
            .catch((e) => {
                this.ui.cells('a').progressOff();
                // eslint-disable-next-line no-console
                console.log(e);
            });
    }
}