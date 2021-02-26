export default function getAppUrl() {
    let loc = window.location.pathname;
    let dir_name = loc.substring(0, loc.lastIndexOf('/'));
    return "http://" + window.location.hostname + dir_name + "/";
}