import {DHXView} from "dhx-optimus";

export class MoodleTopicsAnswersGridToolbarView extends DHXView {

    render(){

        let struct = [
            {id:"new",type:"button",text:"New"},
            {id:"button_separator_1",type:"separator"},
            {id:"delete",type:"button",text:"Delete"}
        ];

        this.ui = this.root.attachToolbar({
            iconset: "awesome",
        });
        // this.ui.setIconSize(32);
        // this.ui.attachEvent("onClick", (id) => this.app.callEvent("MoodleToolbarClick", [id]));
        this.ui.loadStruct(struct);

    }
}