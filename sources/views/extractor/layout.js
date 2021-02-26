import {DHXView} from "dhx-optimus";
import {getAuthHeader} from "../../api/auth";
import axios from "axios";
import getBaseUrl from "../../api/baseUrl";
import getAppUrl from "../../api/appUrl";

const baseUrl = getBaseUrl();
const appLoc = getAppUrl();

export class DocsExtractView extends DHXView {
    render() {

        this.ui = this.root.attachURL("https://bo.nts.nl/docs_extract_new/");

        // var config = {
        //     headers: getAuthHeader()
        // };
        //
        // axios.get(baseUrl + "auth/user", config)
        //     .then(response => {
        //         this.ui = this.root.attachURL(appLoc + "docs-extract/index.php?eid=" + response.data.id);
        //     });

    }
}