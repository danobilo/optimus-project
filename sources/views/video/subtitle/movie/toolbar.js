import { DHXView } from "dhx-optimus";

export class AudioMovieTopbarView extends DHXView {
	render() {
		this.ui = this.root.attachToolbar({
			iconset: "awesome",
		});
		this.ui.addButton("generate_audio_movie", 1, "Generate Audio Movie", "", "");
		this.ui.addSeparator("sep_1", 2);
		this.ui.addButton("delete", 3, "Delete", "", "");
	}

	_load() {}
}