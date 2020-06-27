import axios from "axios";
import getBaseUrl from "./baseUrl";
import { DHXAlertView } from "../helpers/alerts";

const appAlerts = new DHXAlertView();

const baseUrl = getBaseUrl();

export function getMedia(context, pid) {
	context.clearAndLoad(baseUrl + `media/list/${pid}`, () => {
		context.groupBy(5);
	});
}
