import getAppUrl from "./appUrl";

const appUrl = getAppUrl();

export default function getBaseUrl() {
	const inDevelopment = window.location.hostname === "localhost";
	return inDevelopment ? "http://api.nts.test/api/v1/" : "http://demo.nts.nl/api/v1/";
}

export function getFileUrl() {
    const inDevelopment = window.location.hostname === "localhost";
    return inDevelopment ? "http://api.nts.test/storage/" : "http://demo.nts.nl/storage/";
}

// export default function getBaseUrl() {
//     return appUrl + "project-api/public/api/v1/";
// }
//
// export function getFileUrl() {
//     return appUrl + "project-api/storage/";
// }
