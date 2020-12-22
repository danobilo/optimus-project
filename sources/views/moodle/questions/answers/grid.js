import {DHXView} from "dhx-optimus";
import axios from "axios";
import getBaseUrl from "../../../../api/baseUrl";
import {DHXAlertView} from "../../../../helpers/alerts";


const baseUrl = getBaseUrl();
const appAlerts = new DHXAlertView();
export class MoodleAnswersGridView extends DHXView {

    render() {

        let grid = (this.ui = this.root.attachGrid());
        grid.setSkin('dhx_web');
        grid.setImagesPath('./codebase/web/imgs/');
        grid.setHeader(["#", "Answer", "Response", "Score", "JumpTo"]);
        grid.setColTypes("cntr,ed,ed,ed,ed");

        grid.setColSorting('int,str,str,str,str');
        grid.enableCellIds(true);
        grid.setColumnIds('cntr,text,response,score,jumpto');
        grid.setInitWidthsP('10,*,*,10,20');

        grid.init();

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

                    axios.post(baseUrl + 'choice/update_cell', data)
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

        this.attachEvent("loadMainAnswersGrid", (question_id) => {
            grid.clearAndLoad(baseUrl + 'choice/list/' + question_id);
        });


        this.attachEvent("MainAnswersToolbarClick", (id) => {
            switch (id) {

                case "new":

                    let question_id = this.app.getService("MainQuestionsGrid").selected();

                    if (question_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Course Selected.",
                            title: "Error!"
                        });
                        return;
                    }

                    let data = {question_id: question_id};

                    axios.post(baseUrl + 'choice/create', data)
                        .then((response) => {

                            if (response.data.success) {
                                appAlerts._message(response.data.text);
                                grid.updateFromXML(baseUrl + 'choice/list/' + question_id, true, true, function () {
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
                                axios.get(baseUrl + 'choice/delete/' + row_id)
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