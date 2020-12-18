import { DHXView } from "dhx-optimus";

export class SchedulerPersonalView extends DHXView {
	render(){

		scheduler.config.xml_date = "%Y-%m-%d %H:%i";
		this.ui = this.root.attachScheduler(new Date(), "week");
	}
}