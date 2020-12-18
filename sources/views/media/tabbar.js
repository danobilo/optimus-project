import { DHXView } from "dhx-optimus";
import { SubtitleAudioView } from "./subtitle/layout";
import { WebvttContentView } from "./webvtt";

export class MediaTabbarView extends DHXView {
	render() {
		this.ui = this.root.attachTabbar({
			close_button: false,
		});

		this.ui.addTab("tab_27", "WEBVTT FILE");
		let tab_27 = this.ui.cells("tab_27");
		tab_27.setActive();

		this.show(WebvttContentView, tab_27);

		this.ui.addTab("tab_28", "Subtitle Audio");
		let tab_28 = this.ui.cells("tab_28");
		this.show(SubtitleAudioView, tab_28);


		this.ui.addTab("tab_32","Media Player");
        let tab_32 = this.ui.cells("tab_32");

		this.attachEvent("showMediaContent", (path) => tab_32.attachURL(path));

		
	}
}
