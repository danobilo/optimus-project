import { DHXView } from "dhx-optimus";
import { EventFormView } from "./form";
import { EventsGridView } from "./grid";
import { EventReoccurenceTopbarView } from "./reocurrence_toolbar";

export class EventsTabbarView extends DHXView {
	render() {
		this.ui = this.root.attachTabbar({
			close_button: false,
		});

		this.ui.addTab("tab_24", "Event Details");

		var tab_24 = this.ui.cells("tab_24");
		tab_24.setActive();
		this.show(EventFormView, tab_24);

		this.ui.addTab("tab_25", "Re-occurences");
		var tab_25 = this.ui.cells("tab_25");
		this.show(EventReoccurenceTopbarView, tab_25);
		this.show(EventsGridView, tab_25);
	}
}
