import { DHXView } from "dhx-optimus";
import { AudioClipAudioView } from "./audio";
import { AudioClipMovieView } from "./movie";

export class AudioClipView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("3U");
        
		this.ui.cells("a").setText("Audio clip");
		this.show(AudioClipAudioView, this.ui.cells("a"));
        
		this.ui.cells("b").setText("Audio Movie Grid");
		this.show(AudioClipMovieView, this.ui.cells("b"));

		this.ui.cells("c").setText("Audio Tester");
		this.ui.cells("c").setHeight(150);

	}

}
