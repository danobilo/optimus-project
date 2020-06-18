import { DHXView } from "dhx-optimus";
import { VideoMainView } from "./main/layout";
import { VideoFilesView } from "./files/layout";
import { VideoFilesTopbarView } from "./files/toolbar";
import { AudioFilesTopbarView } from "./audios/toolbar";
import { AudioFilesGridView } from "./audios/grid";
import { VideoMoodleView } from "./moodle/layout";
import { VideoScriptsView } from "./scripts/layout";
import { AudioSubtitleView } from "./subtitle/layout";

export class VideoTabbarView extends DHXView {
	render() {
		this.ui = this.root.attachTabbar({
			close_button: false
		});

		this.ui.addTab("tab_11", "Main");

		var tab_11 = this.ui.cells("tab_11");
		tab_11.setActive();
		this.show(VideoMainView, tab_11);

		this.ui.addTab("tab_12", "Video Files");
		var tab_12 = this.ui.cells("tab_12");
		this.show(VideoFilesTopbarView, tab_12);
		this.show(VideoFilesView, tab_12);

		this.ui.addTab("tab_13", "Available audios");
		var tab_13 = this.ui.cells("tab_13");
		this.show(AudioFilesTopbarView, tab_13);
		this.show(AudioFilesGridView, tab_13);

		this.ui.addTab("tab_14", "Webvtt Files");
		var tab_14 = this.ui.cells("tab_14");

		this.ui.addTab("tab_15", "Moodle media");
		var tab_15 = this.ui.cells("tab_15");
		this.show(VideoMoodleView, tab_15);

		this.ui.addTab("tab_16", "Subtitle audio");
		var tab_16 = this.ui.cells("tab_16");
        this.show(AudioSubtitleView, tab_16);
        
        this.ui.addTab("tab_17", "Scripts");
		var tab_17 = this.ui.cells("tab_17");
		this.show(VideoScriptsView, tab_17);

	}
}