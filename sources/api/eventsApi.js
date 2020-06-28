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

export function getEventDetails(context, id) {	
	context.load(baseUrl + `event/details/${id}`, () => {
		var combo = context.getCombo("emp");
		selectEventUsers(combo, id);
		selectEventDays(context, id);
	});
}

export function getUserList(context) {	
	context.load(baseUrl + "event/user/list");
}

export function updateEvent(context, id){

	context.send(baseUrl + `event/update/${id}`,"post",(loader, response) => {
		response = JSON.parse(response); 

		if (response.success) {
			appAlerts._message(response.message);
		} else {
			appAlerts._error("An error occured, please contact system admin");
		}
	});
}

export function addEventUser(data){
	axios.post(baseUrl + "event/add/user", data)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
			} else {
				appAlerts._error("An error occured, please contact system admin");
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}

export function generateEventReocurences(context, id){

	axios.get(baseUrl + `event/generate/${id}`)
		.then((response) => {
			// if (response.data.success) {
			// 	appAlerts._message(response.data.message);
				context.clearAndLoad(baseUrl + `event/reoccurences/${id}`);
			// } else {
			// 	appAlerts._error(response.data.error.message);
			// }
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}

export function getEventReoccurences(context, id) {
	context.clearAndLoad(baseUrl + `event/reoccurences/${id}`);
}

function selectEventUsers(context, id) {
	axios.get(baseUrl + `event/assigned/${id}`)
		.then((response) => {
			if (response.data) {

				var results = response.data;				
				var assigned = [];

				results.forEach( (item) => {	
					var index = context.getIndexByValue(item.id);
					context.setChecked(index, true);
					assigned.push(item.name);
				});
				context.setComboText(assigned.join(", "));
			} 
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}

function selectEventDays(context, id) {

	axios.get(baseUrl + `event/days/${id}`)
	.then((response) => {
		if (response.data) {

			var results = response.data;
			results.forEach( (item) => {
				context.checkItem("days_select[" + item + "]");
			});
		} 
	})
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.log(e);
	});
}

