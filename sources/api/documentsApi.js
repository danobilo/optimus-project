/* eslint-disable no-undef */
import axios from "axios";
import getBaseUrl from "./baseUrl";
import { DHXAlertView } from "../helpers/alerts";
import { addGridRow } from "../helpers/utils";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function createDocument(context, data) {

	const requestUrl = baseUrl + "document/create";
	const responseUrl = baseUrl + `document/list/${data.id}`;

	addGridRow(context, data, requestUrl, responseUrl);
	
}

export function getDocuments(context, pId) {
	context.clearAndLoad(baseUrl + `document/list/${pId}`);
}

export function deleteDocument(context, rowId, data) {

	let id = rowId.substring(4);

	axios.post(baseUrl + `document/delete/${id}`, data)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
				context.deleteRow(rowId);
			} else {
				appAlerts._error(response.data.error.message);
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});

}

export function showDocumentDetails(context, id) {	
	context.load(baseUrl + `document/details/${id}`);
}

export function updateDocument(context, id){

	var data = context.getFormData();
	axios.post(baseUrl + `document/update/${id}`, data)
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

export function getDocumentContent(context, id) {

	axios.get(baseUrl + `document/content/show/${id}`)
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

export function editDocumentCell(data) {

	axios.post(baseUrl + "document/editcell", data)
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

export function addDocumentMedia(context, type, data) {
	axios.post(baseUrl + `${type}/media`, data)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
				getDocumentMedia(context, type, data.document_id);
			} else {
				appAlerts._error("An error occured, please contact system admin");
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}

export function getDocumentMedia(context, type, id) {

	context.clearAndLoad(baseUrl + `${type}/media/${id}`, () => {
		context.groupBy(5);
	});
}