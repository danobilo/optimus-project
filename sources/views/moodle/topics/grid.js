import {DHXView} from "dhx-optimus";
import getBaseUrl from "../../../api/baseUrl";
import axios from "axios";

const baseUrl = getBaseUrl();

export class MoodleTopicsGridView extends DHXView {

    render() {

        let sId = null;
        let content = null;

        this.ui = this.root.attachGrid();
        this.ui.setSkin('dhx_web');
        this.ui.setImagesPath('./codebase/web/imgs/');

        this.ui.setHeader(["Chapter", "Title", "Type", "Topics", "Prev Page", "Next Page", "Comments", "Date", "Employee", "Status", "Visible"]);
        this.ui.setColTypes("ro,tree,ro,ed,combo,combo,ed,ro,ro,combo,ch");
        this.ui.setColSorting('str,str,str,str,str,str,str,str,str,str,int');
        this.ui.enableCellIds(true);
        this.ui.setColumnIds('chapter,title,sort,topics,prevpageid,nextpageid,comments,date,employee,status,visible');
        this.ui.setInitWidthsP('10,*,15,*,15,15,*,*,*,*,10');

        this.ui.setColumnHidden(0, true);
        this.ui.setColumnHidden(3, true);

        for (var i = 6; i <= 10; i++) {
            this.ui.setColumnHidden(i, true);
        }

        this.ui.init();

        var grid_3StatusCombo = this.ui.getColumnCombo(7);
        grid_3StatusCombo.setSkin("dhx_web");
        grid_3StatusCombo.enableFilteringMode(true);

        var grid_3PreviousCombo = this.ui.getColumnCombo(4);
        grid_3PreviousCombo.setSkin("dhx_web");
        grid_3PreviousCombo.enableFilteringMode(true);

        var grid_3NextCombo = this.ui.getColumnCombo(5);
        grid_3NextCombo.setSkin("dhx_web");
        grid_3NextCombo.enableFilteringMode(true);


        this.ui.attachEvent("onSelectStateChanged", (id) => {

            sId = id;
            let isLesson = this.ui.getLevel(id) == 1 && this.ui.cells(id, 2).getValue() == 'lesson';

            if (isLesson) {
                this.app.callEvent("TopicsSelect", ['lesson']);
            } else {

                let server_id = this.app.getService("CoursesTree").server();
                let modname = this.ui.cells(this.ui.getParentId(id), 2).getValue();

                if (modname === 'lesson') {

                    let lesson_id = this.ui.cells(this.ui.getParentId(id), 3).getValue();


                    // grid_page_questions.clearAndLoad("Controller/php/data_questions.php?action=4&page_id=" + id.split("_")[1]);

                    axios.get(baseUrl + 'course/module/' + id.split("_")[1] + '/server/' + server_id + '/lesson/' + lesson_id)
                        .then((response) => {
                            if (response.data.item) {
                                content = response.data.item.content;
                                this.app.callEvent("showCourseContent", [content]);
                            }
                        })
                        .catch((e) => {
                            this.ui.cells('a').progressOff();
                            // eslint-disable-next-line no-console
                            console.log(e);
                        });

                } else {

                    let course_id = this.app.getService("CoursesTree").course();

                    axios.get(baseUrl + 'course/page/' + id.split("_")[1] + '/server/' + server_id + '/course/' + course_id)
                        .then((response) => {
                            if (response.data.item) {
                                content = response.item.content;
                                this.app.callEvent("showCourseContent", [content]);
                            }
                        })
                        .catch((e) => {
                            this.ui.cells('a').progressOff();
                            // eslint-disable-next-line no-console
                            console.log(e);
                        });
                }

                this.app.callEvent("TopicsSelect", ['page']);
            }
        });

        this.addService("PageContent", {
            content:() => content,
        });

        this.addService("TopicsGrid", {
            selected: () => sId,
        });


        this.attachEvent("loadTopicsGrid", (server_id, course_id) => {
            this.ui.kidsXmlFile = baseUrl + 'course/topics/' + server_id + '/' + course_id;
            this.ui.clearAndLoad(baseUrl + 'course/topics/' + server_id + '/' + course_id, function () {

                // var domainname = getDomainName();
                // grid_3PreviousCombo.clearAll();
                // grid_3NextCombo.clearAll();
                //
                // $.getJSON(domainname + '/data_content.php?action=6&course=' + course_id, function (results) {
                //     grid_3PreviousCombo.addOption(results);
                //     grid_3NextCombo.addOption(results);
                // });

            });
        });
    }

}