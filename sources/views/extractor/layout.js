import {DHXView} from "dhx-optimus";

export class DocsExtractView extends DHXView {
    render() {
        this.ui = this.root.attachURL("https://bo.nts.nl/docs_extract_new/");
    }
}