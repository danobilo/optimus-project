import axios from "axios";
import getBaseUrl from "./baseUrl";
import { getAuthHeader } from "./auth";
import {DHXAlertView} from "../helpers/alerts";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function getUser (context) {

	var config = {
		headers: getAuthHeader()
	};

	axios.get(baseUrl + "auth/user", config)
        .then(response => {
	context.setItemText("button_text_2", "<span class='topbar_title'>" + sentenceCase (response.data.name) + "</span>");
});  
}

export function getUsers (context) {
	context.load(baseUrl + "user/list");
}

export function createUser(context, data) {

	axios.post(baseUrl + "auth/signup", data)
	.then((response) => {
		if (response.data.success) {
			appAlerts._message(response.data.message);
			context.updateFromXML(baseUrl + "user/list", true, true, function () {
				context.selectRowById(response.data.id);		
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

export function getUserDetails (context, id) {
	context.load(baseUrl + `user/details/${id}`);
}

export function updateUser (context, data, id) {

	axios.post(baseUrl + `user/update/${id}`, data)
        .then((response) => {
	if (response.data.success) {
		appAlerts._message(response.data.message);
		context.updateFromXML(baseUrl + "user/list", true, true, function () {
			context.selectRowById(response.data.id);		
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

export function addUserProjects (data, id) {

	axios.post(baseUrl + `user/projects/add/${id}`, data)
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

export function getUserProjects (context, id) {

    axios.get(baseUrl + `user/projects/get/${id}`)
        .then(response => {
            if (response.data.success) {
                    
                response.data.projects.forEach(function (item) {
                    context.silent(function(){
                        context.checkItem(item);
                    });
                });
            }
        });  

}

export function loadMultiselectOptions(context){



}

function sentenceCase (str) { 
	if ((str===null) || (str==="")) 
		return false; 
	else
     str = str.toString(); 
    
	return str.replace(/\w\S*/g,  
  function(txt){return txt.charAt(0).toUpperCase() + 
         txt.substr(1).toLowerCase();}); 
} 