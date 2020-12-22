import {DHXView} from "dhx-optimus";
import axios from "axios";

import getBaseUrl from "../../../../api/baseUrl";
import {DHXAlertView} from "../../../../helpers/alerts";


const baseUrl = getBaseUrl();
const appAlerts = new DHXAlertView();

export class MoodleTopicQuestionsGridView extends DHXView {

    render() {

        let sId = null;
        let questionId = null;

        let grid = (this.ui = this.root.attachGrid());
        grid.setSkin('dhx_web');
        grid.setImagesPath('./codebase/web/imgs/');

        grid.setHeader(["ID", "Title", "Content", "Type"]);
        grid.setColTypes("ro,ed,ed,ro");
        grid.setColSorting('int,str,str,str');
        grid.enableCellIds(true);
        grid.setColumnIds('id,title,text,type');
        grid.setInitWidthsP('15,*,*,*');
        // grid.setColumnHidden(0, true);
        grid.setColumnHidden(2, true);
        grid.init();

        grid.attachEvent('onEditCell', function (stage, id, index, new_value, oValue) {

            let cell = grid.cells(id, index);
            let row_id = grid.cells(id, 0).getValue();

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


        grid.attachEvent("onSelectStateChanged", (id) => {
            sId = id;
            questionId = grid.cells(id, 0).getValue();
            this.app.callEvent("loadTopicsQuestionsForm", [questionId]);
            this.app.callEvent("loadTopicsAnswersGrid", [questionId]);
        });

        this.attachEvent("loadTopicQuestionsGrid", (page_id) => {
            grid.clearAndLoad(baseUrl + 'topic/question/list/' + page_id.split("_")[1]);
        });

        this.addService("TopicQuestionsGrid", {
            selected: () => sId,
            question: () => questionId
        });

        this.attachEvent("TopicQuestionsToolbarClick", (id) => {

            let course_id = this.app.getService("CoursesTree").course();
            let page_id = this.app.getService("TopicsGrid").selected();
            let lesson_id = this.app.getService("TopicsGrid").lesson();

            switch (id) {

                default:

                    if (course_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Course Selected.",
                            title: "Error!"
                        });
                        return;
                    }


                    if (page_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Page Selected.",
                            title: "Error!"
                        });
                        return;
                    }

                    let data = {course_id: course_id, type: id, page_id: page_id.split("_")[1]};

                    axios.post(baseUrl + 'question/create', data)
                        .then((response) => {

                            if (response.data.success) {
                                appAlerts._message(response.data.text);

                                grid.updateFromXML(baseUrl + 'topic/question/list/' + page_id.split("_")[1], true, true, function () {
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

                case "export":

                    let post_data = {
                        lesson_id: lesson_id,
                        page_id: page_id.split("_")[1],
                        server_id: this.app.getService("CoursesTree").server()
                    };

                    axios.post(baseUrl + 'topic/question/export', post_data)
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

                    break;

                case "import":

                    if (course_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Course Selected.",
                            title: "Error!"
                        });
                        return;
                    }

                    if (page_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Page Selected.",
                            title: "Error!"
                        });
                        return;
                    }
                    // openImportQuestionsWindow(course_id, page_id.split("_")[1]);
                    break;

                case "link":

                    if (course_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Course Selected.",
                            title: "Error!"
                        });
                        return;
                    }

                    if (page_id == null) {
                        dhtmlx.alert({
                            type: "alert-error",
                            text: "No Page Selected.",
                            title: "Error!"
                        });
                        return;
                    }

                    this.openLinkQuestionsWindow(course_id, page_id.split("_")[1], grid);

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
                                axios.get(baseUrl + 'topic/question/delete/' + row_id)
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

    openLinkQuestionsWindow(course_id, page_id, grid) {

        this.window = new dhtmlXWindows();
        var window_4 = this.window.createWindow('window_4', 0, 0, 900, 500);
        window_4.setText('Link Questions');
        window_4.centerOnScreen();
        window_4.button('park').hide();
        window_4.button('minmax').hide();

        var layout_main_questions = window_4.attachLayout('1C');

        var cell_main_questions = layout_main_questions.cells('a');
        cell_main_questions.hideHeader();

        var toolbar_page_questions = cell_main_questions.attachToolbar();
        toolbar_page_questions.setIconsPath('./codebase/imgs/');
        toolbar_page_questions.addButton('link', 3, 'Link', '', '');

        toolbar_page_questions.attachEvent('onClick', function (id) {

            if (id === "link") {

                var checked = grid_main_questions.getCheckedRows(0);

                axios.post(baseUrl + 'topic/question/link', {ids: checked, page_id: page_id})
                    .then((response) => {

                        if (response.data.success) {
                            appAlerts._message(response.data.text);

                            grid.updateFromXML(baseUrl + 'topic/question/list/' + page_id, true, true);
                        } else {
                            appAlerts._error(response.data.text);
                        }
                        window_4.close();

                    })
                    .catch((e) => {
                        // eslint-disable-next-line no-console
                        console.log(e);
                    });
            }
        });

        var grid_main_questions = cell_main_questions.attachGrid();
        grid_main_questions.setSkin('dhx_web');
        grid_main_questions.setImagesPath('./codebase/web/imgs/');

        grid_main_questions.setHeader(["S", "ID", "Title", "Content", "Type"]);
        grid_main_questions.setColTypes("ch,ro,ed,ed,combo");

        grid_main_questions.setColSorting('int,int,str,str,str');
        grid_main_questions.enableCellIds(true);
        grid_main_questions.setColumnIds('s,id,title,text,type');
        grid_main_questions.setInitWidthsP('5,6,*,*,20');
        grid_main_questions.init();
        grid_main_questions.load(baseUrl + 'question/list/' + course_id + '/' + page_id);

    }

    // function openImportQuestionsWindow(doc_id, page_id = null) {
    //
    //     var windows = new dhtmlXWindows();
    //     var window_4 = windows.createWindow('window_4', 400, 100, 600, 300);
    //     window_4.setText('Upload Document as zip');
    //     window_4.centerOnScreen();
    //
    //     var url = "https://" + location.host + "/Google_docs_extract/controller/upload_questions.php?doc_id=" + doc_id + ((page_id != null) ? "&page_id=" + page_id : "");
    //
    //     var formData = [
    //         {
    //             type: "fieldset",
    //             label: "Enter document link",
    //             iconset: "awesome",
    //             list: [{
    //                 type: "input",
    //                 name: "url",
    //                 inputWidth: 500,
    //             },
    //                 {
    //                     type: "button",
    //                     name: "btn",
    //                     value: "Import",
    //                     img: "fa fa-download", imgdis: "fa fa-download"
    //
    //                 }]
    //         },
    //         {
    //             type: "fieldset",
    //             label: "Uploader",
    //             list: [{
    //                 type: "upload",
    //                 name: "myFiles",
    //                 inputWidth: 330,
    //                 url: url,
    //                 autoStart: true,
    //                 swfPath: "/plugin/dhtmlx/dhtmlxSuite502/codebase/ext/uploader.swf",
    //                 autoRemove: true
    //             }]
    //         }];
    //
    //     var form_2 = window_4.attachForm(formData);
    //
    //     form_2.attachEvent("onButtonClick", function (id) {
    //
    //         var doc_url = form_2.getItemValue('url');
    //         window_4.close();
    //         cell_main_questions.progressOn();
    //
    //         url = url + "&action=2&url=" + doc_url;
    //
    //         $.get(url, function (data) {
    //
    //             cell_main_questions.progressOff();
    //             dhtmlx.message({
    //                 title: 'Success',
    //                 expire: 2000,
    //                 text: "Your document has been extracted successfully extracted"
    //             });
    //
    //             if (page_id != null) {
    //                 grid_page_questions.updateFromXML('controller/php/data_questions.php?action=4&page_id=' + page_id, true, true);
    //             }
    //
    //             grid_main_questions.updateFromXML('controller/php/data_questions.php?action=8&course_id=' + course_id, true, true);
    //         }, "json");
    //     });
    //
    //     form_2.attachEvent("onUploadComplete", function (count) {
    //
    //         dhtmlx.message({
    //             title: 'Success',
    //             expire: 2000,
    //             text: "Your File has been Uploaded and extracted"
    //         });
    //
    //         if (page_id != null) {
    //             grid_page_questions.updateFromXML('controller/php/data_questions.php?action=4&page_id=' + page_id, true, true);
    //         }
    //
    //         grid_main_questions.updateFromXML('controller/php/data_questions.php?action=8&course_id=' + course_id, true, true);
    //         window_4.close();
    //     });
    //
    //     form_2.attachEvent("onUploadFail", function (realName) {
    //
    //         dhtmlx.alert({
    //             title: 'Error',
    //             expire: 2000,
    //             text: "Unsuccessful!"
    //         });
    //         window_4.hide();
    //     });
    // }

}