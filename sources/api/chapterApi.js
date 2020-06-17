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

export function updateContent(data, id){

	axios.post(baseUrl + `chapter/content/update/${id}`, data)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
			} else {
				appAlerts._error(response.data.error.message);
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}

export function getChapterContent(context, id) {

	axios.get(baseUrl + `chapter/content/show/${id}`)
		.then((response) => {
			if (response.data.success) {
				if (response.data.content != null) {
					context.activeEditor.setContent(response.data.content);
				}
			} else {
				appAlerts._error(response.data.error.message);
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});

}

export function showChapterDetails(context, id) {	
	context.load(baseUrl + `chapter/details/${id}`);
}


export function updateChapter(context, id){

	var data = context.getFormData();
	axios.post(baseUrl + `chapter/update/${id}`, data)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
				// context._deleteItem(id);
			} else {
				appAlerts._error(response.data.error.message);
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}



