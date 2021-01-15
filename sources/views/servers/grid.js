import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../api/baseUrl";
import axios from "axios";
import {DHXAlertView} from "../../helpers/alerts";

const baseUrl = getBaseUrl();
const appAlerts = new DHXAlertView();

export class ServersGridView extends DHXView {
    render() {

        let sId = null;

        let grid = (this.ui = this.root.attachGrid());
        grid.setSkin('dhx_web');
        grid.setImagesPath('./codebase/web/imgs/');
        grid.setHeader(["#", "Name", "Domain", "Token", "Path","Has moodle"]);
        grid.setColTypes("cntr,ed,ed,ed,ed,ch");
        grid.setColSorting('int,str,str,str,str,int');
        grid.setInitWidthsP('5,20,25,0,*,10');
        grid.setColumnIds('id,name,domain,token,path,is_moodle');
        grid.setColumnHidden(3, true);
        grid.init();
        grid.load(baseUrl + "server/list");

        grid.attachEvent("onSelectStateChanged", (id) => {

            sId = id;
            this.app.callEvent("LoadServerForm", [id]);
        });

        this.addService("ServerGrid", {
            selected: () => sId,
        });

        this.attachEvent("loadServersGrid", () => {
            grid.clearAndLoad(baseUrl + 'server/list');
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

                    axios.post(baseUrl + 'server/update_cell', data)
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


        this.attachEvent("ServersToolbarClick", (id) => {

            switch (id) {

                case "new":

                    let data = {name: 'New Server'};

                    axios.post(baseUrl + 'server/create', data)
                        .then((response) => {

                            if (response.data.success) {
                                appAlerts._message(response.data.text);
                                grid.updateFromXML(baseUrl + 'server/list', true, true, function () {
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
                                axios.get(baseUrl + 'server/delete/' + row_id)
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