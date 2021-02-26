import {DHXView} from "dhx-optimus";
import {getUser} from "../api/userApi";

export class TopbarView extends DHXView {
    render() {
        this.ui = this.root.attachToolbar({
            iconset: "awesome",
            skin: "dhx_web"
        });
        this.ui.setSkin('dhx_web');
        // this.ui.setIconSize(32);
        this.ui.attachEvent("onClick", (id) => this.callEvent("ToolbarClick", [id]));
        this._load();
    }

    _load() {
        let struct = [
            // {
            //     type: "buttonSelect",
            //     text: "Manage",
            //     renderSelect: true,
            //     mode: "select",
            //     selected: "projects",
            //     width: 80,
            //     options: [
            //         {id: "projects", type: "button", text: "Projects", img: ""},
            //         {id: "button_separator_40", type: "separator"},
            //         {id: "moodle", type: "button", text: "Moodle", img: ""},
            //         {id: "button_separator_41", type: "separator"},
            //         {id: "users", type: "button", text: "Users", img: ""},
            //         {id: "button_separator_42", type: "separator"},
            //         {id: "roles", type: "button", text: "Roles", img: ""},
            //     ]
            // },
            {id: "projects", type: "button", text: "Projects", img: ""},
            {id: "button_separator_40", type: "separator"},
            {id: "moodle", type: "button", text: "Moodle", img: ""},
            {id: "button_separator_41", type: "separator"},
            {id: "docs", type: "button", text: "Docs Extract", img: ""},
            {id: "button_separator_49", type: "separator"},
            {id: "servers", type: "button", text: "Servers", img: ""},
            {id: "button_separator_48", type: "separator"},
            {id: "users", type: "button", text: "Users", img: ""},
            {id: "button_separator_42", type: "separator"},
            {id: "roles", type: "button", text: "Roles", img: ""},
            {id: "button_separator_43", type: "separator"},
            {
                type: "buttonSelect", text: "Schedule", options: [
                    {id: "schedule_team", type: "button", text: "Team", img: ""},
                    {id: "button_separator_44", type: "separator"},
                    {id: "schedule_personal", type: "button", text: "Personal", img: ""},
                ]
            },
            // {id: "button_separator_45", type: "separator"},
            {type: "spacer"},
            {id: "button_text_2", type: "text", text: ""},
            {id: "button_separator_46", type: "separator"},
            {id: "settings", type: "button", text: "Settings"},
            {id: "button_separator_47", type: "separator"},
            {id: "logout", type: "button", text: "Logout"},
        ];
        this.ui.loadStruct(struct, () => {
            getUser(this.ui);
        });
    }
}