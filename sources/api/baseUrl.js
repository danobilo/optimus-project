export default function getBaseUrl() {
	const inDevelopment = window.location.hostname === "localhost";
	return inDevelopment ? "http://api.nts.test/" : "http://api.nts.nl/";
}
