import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../api/baseUrl";
import {DHXAlertView} from "../../helpers/alerts";

const baseUrl = getBaseUrl();
const appAlerts = new DHXAlertView();


export class ServerFormView extends DHXView {
    render() {

        this.toolbar = this.root.attachToolbar({
            iconset: "awesome",
        });
        this.toolbar.addButton("save", 1, "Save", "", "");
        this.toolbar.attachEvent("onClick", (id) => this.app.callEvent("ServerFormToolbarClick", [id]));

        let struct = [
            {
                type: "settings",
                labelWidth: 120,
                inputWidth: 400,
                offsetLeft: "20",
                offsetTop: "5",
                position: "label-left"
            },
            {type: "input", name: "name", label: "Name", tooltip: "Server Name", required: true},
            {type: "input", name: "domain", label: "Domain", tooltip: "IP", required: true},
            {type: "input", name: "path", label: "Path", tooltip: "path", rows: 3, required: true},
            {type: "input", name: "token", label: "Token", tooltip: "token", rows: 3},
            {type: "input", name: "location", label: "Location", tooltip: "Location"},
            {type: "checkbox", name: "is_moodle", label: "Has Moodle"}
        ];

        this.ui = this.root.attachForm();
        this.ui.setSkin('dhx_web');
        this.ui.loadStruct(struct);

        this.attachEvent("LoadServerForm", (id) => {
            this.ui.clear();
            this.ui.load(baseUrl + `server/show/${id}`);
        });

        this.attachEvent("ServerFormToolbarClick", (id) => {

            let server_id = this.app.getService("ServerGrid").selected();

            this.ui.send(baseUrl + `server/update/${server_id}`, "post", (loader, response) => {
                response = JSON.parse(response);

                if (response.success) {
                    appAlerts._message(response.text);
                    this.app.callEvent("loadServersGrid");
                } else {
                    appAlerts._error("An error occured, please contact system admin");
                }
            });
        });
    }

}