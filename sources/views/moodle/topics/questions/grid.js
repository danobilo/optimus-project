import { DHXView } from "dhx-optimus";

export class MoodleTopicQuestionsGridView extends DHXView {

    render() {
        this.ui = this.root.attachGrid();
        this.ui.setSkin('dhx_web');
        this.ui.setImagesPath('./codebase/web/imgs/');

        this.ui.setHeader(["ID", "Title", "Content", "Type"]);
        this.ui.setColTypes("ro,ed,ed,combo");
        this.ui.setColSorting('int,str,str,str');
        this.ui.enableCellIds(true);
        this.ui.setColumnIds('id,title,text,type');
        this.ui.setInitWidthsP('15,*,*,*');
        // this.ui.setColumnHidden(0, true);
        this.ui.setColumnHidden(2, true);
        this.ui.init();
    }

}