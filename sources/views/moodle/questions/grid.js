import {DHXView} from "dhx-optimus";

export class MoodleQuestionsGridView extends DHXView {

    render() {

        this.ui = this.root.attachGrid();
        this.ui.setSkin('dhx_web');
        this.ui.setImagesPath('./codebase/web/imgs/');

        this.ui.setHeader(["ID", "Title", "Content", "Type"]);
        this.ui.setColTypes("ro,ed,ed,combo");

        this.ui.setColSorting('int,str,str,str');
        this.ui.enableCellIds(true);
        this.ui.setColumnIds('id,title,text,type');
        this.ui.setInitWidthsP('10,*,*,20');
        this.ui.init();


        let combo_question_types = [
            ["10", "Essay"],
            ["3", "Multichoice"],
            ["5", "Matching"],
            ["8", "Numerical"],
            ["1", "Short Answer"],
            ["2", "True/False"]
        ];

        let questions_type_combo = this.ui.getColumnCombo(3);//takes the column index
        questions_type_combo.enableFilteringMode(true);
        questions_type_combo.addOption(combo_question_types);


    }
}