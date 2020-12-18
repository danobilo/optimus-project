import {DHXView} from "dhx-optimus";

export class MoodleAnswersGridView extends DHXView {

    render() {

        this.ui = this.root.attachGrid();
        this.ui.setSkin('dhx_web');
        this.ui.setImagesPath('./codebase/web/imgs/');
        this.ui.setHeader(["#", "Answer", "Response", "Score", "JumpTo"]);
        this.ui.setColTypes("cntr,ed,ed,ed,ed");

        this.ui.setColSorting('int,str,str,str,str');
        this.ui.enableCellIds(true);
        this.ui.setColumnIds('cntr,text,response,score,jumpto');
        this.ui.setInitWidthsP('10,*,*,10,20');

        this.ui.init();
    }
}