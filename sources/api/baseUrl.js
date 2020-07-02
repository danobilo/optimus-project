export default function getBaseUrl() {
	const inDevelopment = window.location.hostname === "localhost";
	return inDevelopment ? "http://api.nts.test/api/v1/" : "http://demo.nts.nl/api/v1/";
}

export function getFileUrl() {
	const inDevelopment = window.location.hostname === "localhost";
	return inDevelopment ? "http://api.nts.test/storage/" : "http://demo.nts.nl/storage/";
}
