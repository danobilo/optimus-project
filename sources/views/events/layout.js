import { DHXView } from "dhx-optimus";
import { EventsTopbarView } from "./toolbar";
import { EventsGridView } from "./grid";
import { EventsTabbarView } from "./tabbar";

export class EventsView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2E");
		this.ui.cells("a").hideHeader();
		this.ui.cells("b").hideHeader();

		this.show(EventsTopbarView, this.ui.cells("a"));
		this.show(EventsGridView, this.ui.cells("a"));

		this.show(EventsTabbarView, this.ui.cells("b"));
	}
}