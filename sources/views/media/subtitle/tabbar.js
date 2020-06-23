import { DHXView } from "dhx-optimus";
import { AudioClipView } from "./audioclip/layout";


export class AudioClipTabbarView extends DHXView {
	render() {
		this.ui = this.root.attachTabbar({
			close_button: false,
		});

		this.ui.addTab("tab_29", "Audio Clip");
		let tab_29 = this.ui.cells("tab_29");
		this.show(AudioClipView, tab_29);
		tab_29.setActive();		

		this.ui.addTab("tab_30", "Audio Texts");
		let tab_30 = this.ui.cells("tab_30");
		// this.show(VideoTabbarView, tab_30);
		
	}
}