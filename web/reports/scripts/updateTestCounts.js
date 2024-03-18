import { fetchReportData } from './fetchData.js';

export function updateTestCounts() {
	fetchReportData()
		.then((data) => {
			const totalTests = data.length;
			const failedTests = data.filter(
				(test) => test.state === 'failed'
			).length;
			const passedTests = data.filter(
				(test) => test.state === 'passed'
			).length;
			const skippedTests = data.filter(
				(test) => test.state === 'pending' || test.state === 'skipped'
			).length;

			document.getElementById('total').textContent = totalTests;
			document.getElementById('failed').textContent = failedTests;
			document.getElementById('passed').textContent = passedTests;
			document.getElementById('skip').textContent = skippedTests;
		})
		.catch((error) => console.error('Error fetching JSON:', error));
}
