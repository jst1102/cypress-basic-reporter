import { fetchReportData } from './fetchData.js';
import { chartDataPreparation } from './chartDataPreparation.js';
import { createSpecStatusBarChart } from './createSpecStatusBarChart.js';
import { createOverallStatusDonutChart } from './createDonutChart.js';
import { createTimeChart } from './createTimeChart.js';
import { toggleTheme } from './toggleTheme.js';
import { createStarfield } from './createStarfield.js';
import { updateTestCounts } from './updateTestCounts.js';
import { updateDate } from './updateDate.js';

document.getElementById('moon').addEventListener('click', toggleTheme);
document.addEventListener('DOMContentLoaded', createStarfield());

document.addEventListener('DOMContentLoaded', () => {
	updateTestCounts();
	updateDate();

	fetchReportData()
		.then((reportData) => {
			const { dataOverOneSecond, dataUnderOneSecond } =
				chartDataPreparation(reportData);
			createSpecStatusBarChart(reportData);
			createOverallStatusDonutChart(reportData);
			createTimeChart(dataOverOneSecond, dataUnderOneSecond);
		})
		.catch((error) => console.error('Error:', error));
});
