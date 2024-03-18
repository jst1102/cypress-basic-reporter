export function fetchReportData() {
	return fetch('./allReports.json')
		.then((response) => response.json())
		.catch((error) => console.error('Error fetching JSON:', error));
}
