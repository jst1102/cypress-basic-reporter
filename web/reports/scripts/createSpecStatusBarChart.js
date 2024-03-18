export function createSpecStatusBarChart(data) {
	const testGroups = {};
	const testGroupsContainer = document.getElementById('testGroups');

	data.forEach((test) => {
		const { testGroup, state, title, roundedTime } = test;

		if (!testGroups[testGroup]) {
			initializeTestGroup(testGroups, testGroup);
		}

		updateTestGroupStats(testGroups, testGroup, state, title, roundedTime);
	});

	createBarChartForEachTestGroup(testGroups, testGroupsContainer);
}

function initializeTestGroup(testGroups, testGroup) {
	testGroups[testGroup] = {
		passCount: 0,
		failCount: 0,
		skipCount: 0,
		tests: []
	};
}

function updateTestGroupStats(
	testGroups,
	testGroup,
	state,
	title,
	roundedTime
) {
	if (state.toLowerCase() === 'passed') {
		testGroups[testGroup].passCount++;
	} else if (state.toLowerCase() === 'failed') {
		testGroups[testGroup].failCount++;
	} else if (
		state.toLowerCase() === 'skipped' ||
		state.toLowerCase() === 'pending'
	) {
		testGroups[testGroup].skipCount++;
		testGroups[testGroup].tests.push({ title, roundedTime });
	}
}

function createBarChartForEachTestGroup(testGroups, testGroupsContainer) {
	Object.keys(testGroups).forEach((group) => {
		createBarChartForTestGroup(
			testGroups[group],
			group,
			testGroupsContainer
		);
	});
}

function createBarChartForTestGroup(groupData, group, container) {
	const groupElement = document.createElement('div');
	groupElement.classList.add('testGroup');

	const textElement = document.createElement('span');
	textElement.textContent = group;
	textElement.classList.add('testGroupText');
	groupElement.appendChild(textElement);

	const progressBar = createProgressBarForTestGroup(groupData);
	groupElement.appendChild(progressBar);

	container.appendChild(groupElement);
}

function createProgressBarForTestGroup(groupData) {
	const progressBar = document.createElement('div');
	progressBar.classList.add('progressBar');

	const totalTests =
		groupData.passCount + groupData.failCount + groupData.skipCount;
	progressBar.setAttribute(
		'data-tooltip',
		`Total Tests: ${totalTests}\nPassed: ${groupData.passCount}\nFailed: ${groupData.failCount}\nSkipped: ${groupData.skipCount}`
	);

	const progress = createProgressForTestGroup(groupData, totalTests);
	progressBar.appendChild(progress);

	if (groupData.failCount > 0) {
		const failProgress = createFailProgressForTestGroup(
			groupData,
			totalTests
		);
		progressBar.appendChild(failProgress);
	}

	if (groupData.skipCount > 0) {
		const skipProgress = createSkipProgressForTestGroup(
			groupData,
			totalTests
		);
		progressBar.appendChild(skipProgress);
	}

	const tooltip = createTooltipForProgressBar(progressBar);
	progressBar.appendChild(tooltip);

	return progressBar;
}

function createProgressForTestGroup(groupData, totalTests) {
	const progress = document.createElement('div');
	progress.classList.add('progress');
	progress.style.width = `${(groupData.passCount / totalTests) * 100}%`;
	progress.style.borderRadius =
		groupData.failCount === 0 ? '3px' : '3px 0 0 3px';

	return progress;
}

function createFailProgressForTestGroup(groupData, totalTests) {
	const failProgress = document.createElement('div');
	failProgress.classList.add('progress', 'fail');
	failProgress.style.width = `${(groupData.failCount / totalTests) * 100}%`;
	failProgress.style.borderRadius =
		groupData.passCount === 0 ? '3px' : '0 3px 3px 0';

	return failProgress;
}

function createSkipProgressForTestGroup(groupData, totalTests) {
	const skipProgress = document.createElement('div');
	skipProgress.classList.add('progress', 'skip');
	skipProgress.style.width = `${(groupData.skipCount / totalTests) * 100}%`;

	if (groupData.passCount === 0 && groupData.failCount === 0) {
		skipProgress.style.borderRadius = '3px';
	} else if (groupData.passCount > 0 && groupData.failCount === 0) {
		skipProgress.style.borderRadius = '0 3px 3px 0';
	} else if (groupData.passCount === 0 && groupData.failCount > 0) {
		skipProgress.style.borderRadius = '3px 0 0 3px';
	} else {
		skipProgress.style.borderRadius = '0'; // No border radius when both passed and failed exist
	}

	return skipProgress;
}

function createTooltipForProgressBar(progressBar) {
	const tooltip = document.createElement('div');
	tooltip.classList.add('tooltipText');

	const tooltipText = progressBar.getAttribute('data-tooltip');
	const lines = tooltipText.split('\n');

	const tooltipContent = document.createElement('div');

	lines.forEach((line) => {
		const [label, value] = line.split(': ');
		const lineElement = document.createElement('div');
		lineElement.style.display = 'flex';
		lineElement.style.justifyContent = 'space-between';

		const labelSpan = document.createElement('span');
		labelSpan.textContent = label + ': ';

		const valueSpan = document.createElement('span');
		valueSpan.textContent = value;
		valueSpan.style.fontWeight = 'bold';

		lineElement.appendChild(labelSpan);
		lineElement.appendChild(valueSpan);
		tooltipContent.appendChild(lineElement);
	});

	tooltip.appendChild(tooltipContent);

	return tooltip;
}
