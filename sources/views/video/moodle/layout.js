import { DHXView } from "dhx-optimus";
import { MoodleUploaderView } from "./uploader";
import { LocalLibGridView } from "./lib_grid";
import { LocalLibTopbarView } from "./lib_toolbar";
import { TransTopbarView } from "./trans_toolbar";

export class VideoMoodleView extends DHXView {
	render() {
		this.ui = this.root.attachLayout("3T");
		this.ui.cells("a").setText("File Picker");
		this.ui.cells("b").setText("Local Library");
		this.ui.cells("c").setText("Text Translation");
		
        this.show(MoodleUploaderView, this.ui.cells("a"));
        
        this.show(LocalLibTopbarView, this.ui.cells("b"));
        this.show(LocalLibGridView, this.ui.cells("b"));

        this.show(TransTopbarView, this.ui.cells("c"));

	}
}