import {DHXView} from "dhx-optimus";

export class DHXAlertView extends DHXView {
    _message(message) {
        dhtmlx.message({title: "Success", text: message});
    }

    _error(message) {
        dhtmlx.alert({title: "Error", text: message});
    }

    _info(message) {
        dhtmlx.alert({type: "alert-info", text: message});
    }
}
