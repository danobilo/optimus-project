import {DHXView} from "dhx-optimus";
import axios from "axios";
import getBaseUrl from "../../../api/baseUrl";
import {DHXAlertView} from "../../../helpers/alerts";

const baseUrl = getBaseUrl();
const appAlerts = new DHXAlertView();
export class MoodleQuestionsGridView extends DHXView {

    render() {

        let sId = null;

        let grid = (this.ui = this.root.attachGrid());
        grid.setSkin('dhx_web');
        grid.setImagesPath('./codebase/web/imgs/');

        grid.setHeader(["ID", "Title", "Content", "Type"]);
        grid.setColTypes("ro,ed,ed,combo");

        grid.setColSorting('int,str,str,str');
        grid.enableCellIds(true);
        grid.setColumnIds('id,title,text,type');
        grid.setInitWidthsP('10,*,*,20');
        grid.init();

        let combo_question_types = [
            ["10", "Essay"],
            ["3", "Multichoice"],
            ["5", "Matching"],
            ["8", "Numerical"],
            ["1", "Short Answer"],
            ["2", "True/False"]
        ];

        let questions_type_combo = grid.getColumnCombo(3);//takes the column index
        questions_type_combo.enableFilteringMode(true);
        questions_type_combo.addOption(combo_question_types);

        grid.attachEvent("onSelectStateChanged", (id) => {
            sId = id;
            this.app.callEvent("loadMainAnswersGrid",[id]);
        });

        this.addService("MainQuestionsGrid", {
            selected: () => sId,
        });

        grid.attachEvent('onEditCell', function (stage, id, index, new_value, oValue) {

            let cell = grid.cells(id, index);
            let row_id = grid.getSelectedRowId();

            let colId = grid.getColumnId(index);
            let colType = grid.fldSort[index];

            if (stage === 2 && !cell.isCheckbox()) {

                if (row_id > 0 || typeof row_id !== 'undefined') {

                    let data = {
                        id: row_id,
                        index: index,
                        nvalue: new_value,
                        colId: colId,
                        colType: colType
                    };

                    axios.post(baseUrl + 'question/update_cell', data)
                        .then((response) => {

                            if (response.data.success) {
                                appAlerts._message(response.data.text);
                            } else {
                                appAlerts._error(response.data.text);
                            }
                        })
                        .catch((e) => {
                            // eslint-disable-next-line no-console
                            console.log(e);
                        });
                }
                return true;

            } else if (stage === 0 && cell.isCheckbox()) {
                return true;
            }
        });

        this.attachEvent("loadMainQuestionsGrid", (course_id) => {
            grid.clearAndLoad(baseUrl + 'question/list/' + course_id);
        });


        this.attachEvent("MainQuestionsToolbarClick", (id) => {
            switch (id) {

                default:

                    let course_id = this.app.getService("CoursesTree").course();

                    if (course_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Course Selected.",
                            title: "Error!"
                        });
                        return;
                    }

                    let data = {course_id: course_id, type: id};

                    axios.post(baseUrl + 'question/create', data)
                        .then((response) => {

                            if (response.data.success) {
                                appAlerts._message(response.data.text);

                                grid.updateFromXML(baseUrl + 'question/list/' + course_id, true, true, function () {
                                    grid.selectRowById(response.data.row_id);
                                });
                            } else {
                                appAlerts._error(response.data.text);
                            }
                        })
                        .catch((e) => {
                            // eslint-disable-next-line no-console
                            console.log(e);
                        });

                    break;

                case "import":

                    break;

                case "delete":
                    let row_id = grid.getSelectedRowId();

                    if (row_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Record Selected.",
                            title: "Error!"
                        });
                        return;
                    }

                    dhtmlx.confirm({
                        title: "Confirm",
                        type: "confirm-warning",
                        text: "Are you sure you to delete this Record?",
                        callback: function (ok) {
                            if (ok) {
                                axios.get(baseUrl + 'question/delete/' + row_id)
                                    .then((response) => {

                                        if (response.data.success) {
                                            appAlerts._message(response.data.text);
                                            grid.deleteRow(row_id);
                                        } else {
                                            appAlerts._error(response.data.text);
                                        }
                                    })
                                    .catch((e) => {
                                        // eslint-disable-next-line no-console
                                        console.log(e);
                                    });
                            } else {
                                return false;
                            }
                        }
                    });
                    break;
            }
        });
    }
}