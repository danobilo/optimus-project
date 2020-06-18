import axios from "axios";
import getBaseUrl from "./baseUrl";
import { DHXAlertView } from "../helpers/alerts";
import { addGridRow } from "../helpers/utils";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function createEvent(context, data, pId, type, id) {

	const requestUrl = baseUrl + "event/create";
	const responseUrl = baseUrl + `event/list/${pId}/${type}/${id}`;

	addGridRow(context, data, requestUrl, responseUrl);
	
}

export function getEvents(context, pId, type, id) {
	context.clearAndLoad(baseUrl + `event/list/${pId}/${type}/${id}`);
}

export function deleteEvent(context, id) {

	axios.get(baseUrl + `event/delete/${id}`)
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