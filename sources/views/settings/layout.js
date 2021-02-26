import {DHXView} from "dhx-optimus";
import {SettingsFormView} from "./form";

export class SettingsView extends DHXView {
    render() {

        this.ui = this.root.attachLayout("1C");

        this.ui.cells("a").setText("Settings");

        this.show(SettingsFormView, this.ui.cells("a"));

    }
}