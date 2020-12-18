import { DHXView } from "dhx-optimus";

export class SchedulerTeamView extends DHXView {
    render(){

        let sections = [              //defines the units of the view
            {key:1, label:"Section A"},
            {key:2, label:"Section B"},
            {key:3, label:"Section C"}  
        ];

        scheduler.locale.labels.unit_tab = "Unit";
        scheduler.locale.labels.section_custom = "Section";
        scheduler.config.details_on_create = true;
        scheduler.config.details_on_dblclick = true;

        scheduler.config.lightbox.sections = [
            {name: "description", height: 130, map_to: "text", type: "textarea", focus: true},
            {name: "custom", height: 23, type: "select", options: sections, map_to: "section_id"},
            {name: "time", height: 72, type: "time", map_to: "auto"}
        ];

        scheduler.createUnitsView({
            name: "unit",
            property: "user_id",
            list: sections
        });
        scheduler.config.multi_day = true;
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        this.ui = this.root.attachScheduler(new Date(), "unit");
    }
}