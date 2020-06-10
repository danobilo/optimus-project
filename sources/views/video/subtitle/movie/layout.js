import { DHXView } from "dhx-optimus";
import { AudioMovieTopbarView } from "./toolbar";
import { AudioMovieGridView } from "./grid";

export class AudioMovieView extends DHXView {
	render() {

		this.ui = this.root.attachLayout("2E");
        this.ui.cells("a").setText("Audio Movie Grid");
        this.show(AudioMovieTopbarView, this.ui.cells("a"));  
        this.show(AudioMovieGridView, this.ui.cells("a"));   

		this.ui.cells("b").setText("Audio Tester");
		

	}
}