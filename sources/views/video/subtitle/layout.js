import { DHXView } from "dhx-optimus";
import { AudioMovieView } from "./movie/layout";
import { AudioLanguageGridView } from "./grid";
import { AudioLanguageTopbarView } from "./toolbar";
import { AudioClipView } from "./audio/layout";

export class AudioSubtitleView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("3W");
		this.ui.cells("a").setText("Langauge");
		this.ui.cells("a").setWidth("300");

		this.show(AudioLanguageTopbarView, this.ui.cells("a"));
		this.show(AudioLanguageGridView, this.ui.cells("a"));

		this.show(AudioClipView, this.ui.cells("b"));
		this.show(AudioMovieView, this.ui.cells("c"));
	}
}
