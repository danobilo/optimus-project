import axios from "axios";
import {DHXAlertView} from "../helpers/alerts";
const appAlerts = new DHXAlertView();

export function addGridRow(context, data, requestUrl, responseUrl, isTree = false) {

	axios.post(requestUrl, data)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
				context.clearAndLoad(responseUrl, function () {
					context.selectRowById(response.data.id);
                    
					if(isTree){
						context.openItem(context.getParentId(response.data.id));
					}
				});
			} else {
				appAlerts._error(response.data.message);
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}