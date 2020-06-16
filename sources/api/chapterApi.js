import axios from "axios";
import getBaseUrl from "./baseUrl";
import {DHXAlertView} from "../helpers/alerts";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function deleteChapter(context, id) {

	axios.get(baseUrl + `chapter/delete/${id}`)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
				context.deleteRow(id);
			} else {
				appAlerts._error(response.data.error.message);
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});

}