import { DHXView } from "dhx-optimus";
import scheduler from "../../../scheduler.html";
import getAppUrl from "../../api/appUrl";

const appLoc = getAppUrl();

export class SchedulerTeamView extends DHXView {
    render() {
        this.ui = this.root.attachURL("scheduler.html");
    }
}