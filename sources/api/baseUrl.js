export default function getBaseUrl() {
	const inDevelopment = window.location.hostname === "localhost";
	return inDevelopment ? "http://api.nts.test/api/v1/" : "http://api.nts.nl/";
}

export function getFileUrl() {
	const inDevelopment = window.location.hostname === "localhost";
	return inDevelopment ? "http://api.nts.test/storage/" : "http://api.nts.nl/";
}
