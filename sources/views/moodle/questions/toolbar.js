import {DHXView} from "dhx-optimus";

export class MoodleQuestionsToolbarView extends DHXView {

    render(){

        let struct = [
            {type:"buttonSelect",text:"New",options: [
                    {id:"10",type:"button",text:"Essay",img:""},
                    {id:"3",type:"button",text:"Multichoice",img:""},
                    {id:"5",type:"button",text:"Matching",img:""},
                    {id:"8",type:"button",text:"Numerical",img:""},
                    {id:"1",type:"button",text:"Short Answer",img:""},
                    {id:"2",type:"button",text:"True/False",img:""},
                ]},
            {id:"button_separator_1",type:"separator"},
            {id:"import",type:"button",text:"Import From Google Doc"},
            {id:"button_separator_2",type:"separator"},
            {id:"delete",type:"button",text:"Delete"}
        ];

        this.ui = this.root.attachToolbar({
            iconset: "awesome",
        });
        // this.ui.setIconSize(32);
        this.ui.attachEvent("onClick", (id) => this.app.callEvent("MainQuestionsToolbarClick", [id]));
        this.ui.loadStruct(struct);

    }
}