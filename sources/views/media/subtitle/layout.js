import { DHXView } from "dhx-optimus";
import { SubtitleLanguageView } from "./language";
import { AudioClipTabbarView } from "./tabbar";

export class SubtitleAudioView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("2U");
		this.ui.cells("a").setText("Language");
		this.ui.cells("a").setWidth("300");

		this.show(SubtitleLanguageView, this.ui.cells("a"));
		// this.show(MediaGridView, this.ui.cells("a"));

		this.show(AudioClipTabbarView, this.ui.cells("b"));

	}

}
