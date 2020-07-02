import axios from "axios";
import getBaseUrl from "./baseUrl";
import { getAuthHeader } from "./auth";
import {DHXAlertView} from "../helpers/alerts";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function getRoles(context) {
	context.load(baseUrl + "role/list");
}

export function createRole(context, data){

	axios.post(baseUrl + "role/create", data)
	.then((response) => {
		if (response.data.success) {
			appAlerts._message(response.data.message);
			context.updateFromXML(baseUrl + "role/list", true, true, function () {
				// context.selectRowById(response.data.id);		
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

export function updateRole(data, id) {

	axios.post(baseUrl + `role/update/${id}`, data)
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

export function getSelectRoles(context) {

	axios.get(baseUrl + "role/selectlist")
        .then((response) => {
            context.reloadOptions("roles", response.data.roles[0]);
        })
        .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e);
        });	
    
}