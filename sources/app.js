import "less/app.less";

import { DHXApp } from "dhx-optimus/index";
import {TopView} from "views/top.js";

class MyApp extends DHXApp {
	render() {
		this.show(TopView);	
	}
}

window.MyApp = MyApp;
