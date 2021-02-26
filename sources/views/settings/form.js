import {DHXView} from "dhx-optimus";
import {getAuthHeader} from "../../api/auth";
import axios from "axios";
import getBaseUrl from "../../api/baseUrl";
import {DHXAlertView} from "../../helpers/alerts";

const appAlerts = new DHXAlertView();
const baseUrl = getBaseUrl();

export class SettingsFormView extends DHXView{
    render(){

        var myWidth, myHeight;

        if (typeof (window.innerWidth) == "number") {

            //Non-IE

            myWidth = window.innerWidth;
            myHeight = window.innerHeight;

        } else if (document.documentElement &&
            (document.documentElement.clientWidth || document.documentElement.clientHeight)) {

            //IE 6+ in 'standards compliant mode'

            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;

        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {

            //IE 4 compatible

            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;

        }

        let struct = [
            {type: "settings", labelWidth: 200, inputWidth: myWidth * 0.2, offsetLeft: "20", offsetTop: "5", position: "label-left"},
            {type: "block", name: "form_block_1", width: myWidth * 0.4, list: [
                    {type: "password", name: "current_password", label: "Current password", required: true},
                    {type: "password", name: "new_password", label: "New password", required: true},
                    {type: "password", name: "new_password_confirmation", label: "New password confirmation", required: true},
                    {type: "button", name: "submit", value: "Save", inputLeft: 350}
                ]}
        ];

        this.ui = this.root.attachForm();
        this.ui.setSkin('dhx_web');
        this.ui.loadStruct(struct);
        this.ui.attachEvent("onButtonClick", (id) => this.app.callEvent("SettingsFormToolbarClick", [id]));


        this.attachEvent("SettingsFormToolbarClick", (id) => {

            let data = this.ui.getFormData();

            var config = {
                headers: getAuthHeader()
            };

            axios.post(baseUrl + `auth/update`, data, config)
                .then((response) => {
                    if (response.data.success) {
                        appAlerts._message(response.data.message);
                    } else {
                        appAlerts._error(response.data.message);
                    }
                })
                .catch((e) => {
                    // eslint-disable-next-line no-console
                    // appAlerts._error(response.data.message);
                    console.log(e);
                });

            // axios.get(baseUrl + "auth/user", config)
            //     .then(response => {
            //         this.ui = this.root.attachURL(appLoc + "docs-extract/index.php?eid=" + response.data.id);
            //     });
            // this.app.callEvent("UpdateUser", [data]);
        });
    }

}