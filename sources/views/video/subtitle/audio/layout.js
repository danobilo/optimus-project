import { DHXView } from "dhx-optimus";
import { AudioClipTopbarView } from "./toolbar";
import { AudioClipGridView } from "./grid";

export class AudioClipView extends DHXView {
	render() {
        
        this.ui = this.root.attachLayout("2E");
        
		this.ui.cells("a").setText("Audio Clip");	

		this.show(AudioClipTopbarView, this.ui.cells("a"));
		this.show(AudioClipGridView, this.ui.cells("a"));
        
		this.ui.cells("b").setText("Audio Texts");
	}
}
