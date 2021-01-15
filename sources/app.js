import "less/app.less";

import {DHXApp} from "dhx-optimus/index";
import {TopView} from "views/top.js";
import {loggedIn} from "./api/auth";
import {LoginView} from "./views/login";

class MyApp extends DHXApp {

    render() {
        if (loggedIn()) {
            this.show(TopView);
        } else {
            this.show(LoginView);
        }
    }
}

window.MyApp = MyApp;
