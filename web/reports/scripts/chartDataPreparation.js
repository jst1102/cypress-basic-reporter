export function chartDataPreparation(data) {
	const dataOverOneSecond = [];
	const dataUnderOneSecond = [];

	data.forEach(({ title, roundedTime }) => {
		categorizeDataBasedOnRunTime(
			dataOverOneSecond,
			dataUnderOneSecond,
			title,
			roundedTime
		);
	});

	return { dataOverOneSecond, dataUnderOneSecond };
}

function categorizeDataBasedOnRunTime(
	dataOverOneSecond,
	dataUnderOneSecond,
	title,
	roundedTime
) {
	if (roundedTime > 1) {
		dataOverOneSecond.push([title, roundedTime]);
	} else {
		dataUnderOneSecond.push([title, roundedTime]);
	}
}
