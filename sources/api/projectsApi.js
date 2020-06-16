import axios from "axios";
import getBaseUrl from "./baseUrl";
import {DHXAlertView} from "../helpers/alerts";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function getProjects(context, type) {
	context.loadStruct(baseUrl + `project/list/${type}`);
}

export function getProjectDetails(context, id) {	
	context.load(baseUrl + `project/details/${id}`);
}

export function createProjects(context, project) {

	axios.post(baseUrl + "project/create", project)
		.then((response) => {
			if (response.data.project) {
				let item = response.data.project;
				context.window.unload();
				appAlerts._message(response.data.message);
				context._addItem(item.id, item.title, item.parent_id);
			} else {
				appAlerts._error(response.data.message);
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}

export function deleteProject(id) {

	axios.get(baseUrl + `project/delete/${id}`)
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


export function addProjectType(project) {

	axios.post(baseUrl + "project/addtype", project)
		.then((response) => {
			if (response.data.success) {
				appAlerts._message(response.data.message);
			} else {
				appAlerts._error(response.data.message);
			}
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(e);
		});
}

export function updateProject(context, id){

	var data = context.getFormData();
	axios.post(baseUrl + `project/update/${id}`, data)
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
