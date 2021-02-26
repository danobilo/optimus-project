import {DHXView} from "dhx-optimus";

import {TopbarView} from "views/topbar.js";
import {ProjectsView} from "./projects/layout";
import {UsersView} from "./users/layout";
import {RolesView} from "./roles/layout";
import {logout} from "../api/auth";
import {SchedulerTeamView} from "./scheduler/team";
import {SchedulerPersonalView} from "./scheduler/personal";
import {MoodleView} from "./moodle/layout";
import {ServersView} from "./servers/layout";
import {DocsExtractView} from "./extractor/layout";
import {SettingsView} from "./settings/layout";


export class TopView extends DHXView {
    render() {
        let top = this.root.attachLayout("1C");
        top.cells("a").hideHeader();

        this.show(TopbarView, top);
        this.addSlot("main", top.cells("a"));

        this.attachEvent("ToolbarClick", (id) => {
            if (id === "projects")
                this.show(ProjectsView, "main");
            else if (id === "moodle")
                this.show(MoodleView, "main");
            else if (id === "docs")
                this.show(DocsExtractView, "main");
            else if (id === "servers")
                this.show(ServersView, "main");
            else if (id === "users")
                this.show(UsersView, "main");
            else if (id === "roles")
                this.show(RolesView, "main");
            else if (id == "logout")
                logout();
            else if (id == "schedule_team")
                this.show(SchedulerTeamView, "main");
            else if (id == "schedule_personal")
                this.show(SchedulerPersonalView, "main");
            else if (id == "settings")
                this.show(SettingsView, "main");
        });

        this.show(ProjectsView, "main");
    }
}