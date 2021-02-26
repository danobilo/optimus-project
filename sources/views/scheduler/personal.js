import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../api/baseUrl";
import {getAuthHeader} from "../../api/auth";
import axios from "axios";

const baseUrl = getBaseUrl();

export class SchedulerPersonalView extends DHXView {
    render() {

        var config = {
            headers: getAuthHeader()
        };

        axios.get(baseUrl + "auth/user", config)
            .then(response => {
                scheduler.config.xml_date = "%Y-%m-%d %H:%i";
                this.ui = this.root.attachScheduler(new Date(), "week");
                this.ui.load(baseUrl + "schedule/user/" + response.data.id);
            });


    }
}