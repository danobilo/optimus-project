import axios from "axios";
import getBaseUrl from "./baseUrl";
import {DHXAlertView} from "../helpers/alerts";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function addGridRow(context, data, requestUrl, responseUrl, isTree = false) {

	axios.post(requestUrl, data)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
				context.updateFromXML(responseUrl, true, true, function () {
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

export function createDocument(context, data) {

	const requestUrl = baseUrl + "document/create";
	const responseUrl = baseUrl + `document/list/${data.id}`;

	addGridRow(context, data, requestUrl, responseUrl);
	
}

export function getDocuments(context, pId) {
	context.clearAndLoad(baseUrl + `document/list/${pId}`);
}

export function createChapter(context, data, pId) {

	const requestUrl = baseUrl + "chapter/create";
	const responseUrl = baseUrl + `document/list/${pId}`;

	addGridRow(context, data, requestUrl, responseUrl, true);
	
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