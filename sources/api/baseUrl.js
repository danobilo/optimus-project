export default function getBaseUrl() {
	const inDevelopment = window.location.hostname === "localhost";
	return inDevelopment ? "http://api.nts.test/api/v1/" : "http://api.nts.nl/";
}
