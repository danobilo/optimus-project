import { DHXView } from "dhx-optimus";
import { MediaTabbarView } from "./tabbar";
import { MediaTopbarView } from "./toolbar";
import { MediaGridView } from "./grid";

export class MediaView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2E");
		this.ui.cells("a").hideHeader();
		this.ui.cells("a").setHeight("300");

		this.show(MediaTopbarView, this.ui.cells("a"));
		this.show(MediaGridView, this.ui.cells("a"));

		this.show(MediaTabbarView, this.ui.cells("b"));


	}

}
