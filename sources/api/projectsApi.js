import axios from "axios";
import getBaseUrl from "./baseUrl";
import { DHXAlertView } from "../helpers/alerts";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function getProjects(context) {
  axios.get(baseUrl + "projects/v1/list").then((response) => {
    context.loadStruct(response.data);
  });
}

export function createProjects(context, project) {
  axios
    .post(baseUrl + "projects/v1/create", project)
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

export function deleteProject(context, id){
  axios.get(baseUrl + `projects/v1/delete/${id}`).then((response) => {
      if (response.data.success) {
        appAlerts._message(response.data.message);
        context._deleteItem(id);
      } else {
        appAlerts._error(response.data.error.message);
      }
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
    });

}
