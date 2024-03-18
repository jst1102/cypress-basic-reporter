import { fetchReportData } from './fetchData.js';

export function updateDate() {
	fetchReportData()
		.then((reportData) => {
			const dates = new Set(reportData.map((report) => report.testDate));
			const dateElement = document.getElementById('date');

			if (dates.size === 1) {
				dateElement.textContent = Array.from(dates)[0];
			} else {
				const datesArray = Array.from(dates);
				const firstDate = new Date(
					Math.min(...datesArray.map((date) => new Date(date)))
				);
				const lastDate = new Date(
					Math.max(...datesArray.map((date) => new Date(date)))
				);
				const formattedFirstDate = firstDate.toLocaleDateString();
				const formattedLastDate = lastDate.toLocaleDateString();
				dateElement.textContent = `${formattedFirstDate} - ${formattedLastDate}`;
			}
		})
		.catch((error) => console.error('Error fetching JSON:', error));
}
