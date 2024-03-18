import { getChartOptions, getChart } from './createDonutChart.js';

// Other event listeners and functions
export function toggleTheme() {
	const body = document.body;
	const currentTheme = body.getAttribute('data-theme');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

	// Update the theme attribute with a transition
	body.style.transition = 'background-color 0.5s ease';
	body.setAttribute('data-theme', newTheme);

	// Update chart options based on the theme
	updateChartOptions(newTheme);

	// Update flex-container theme
	updateFlexContainerTheme(newTheme);

	document.addEventListener('DOMContentLoaded', function () {
		const canvas = document.getElementById('chartCanvas');
		const ctx = canvas.getContext('2d');

		animateFill(ctx, middleFillColor, targetColor, 500);
	});
}

function updateFlexContainerTheme(theme) {
	const flexContainers = document.querySelectorAll('.flex-container');
	flexContainers.forEach((container) => {
		container.style.setProperty(
			'--background-color',
			getBackgroundColor(theme)
		);
		container.style.setProperty('--text-color', getTextColor(theme));
	});
}

function getBackgroundColor(theme) {
	return theme === 'dark' ? 'black' : 'white';
}

function getTextColor(theme) {
	return theme === 'dark' ? 'white' : 'black';
}

function updateChartOptions(theme) {
	const chart = getChart();
	const chartOptions = getChartOptions(theme);
	chart.updateOptions(chartOptions);
}

function animateFill(ctx, startColor, targetColor, duration) {
	const startTime = performance.now();

	function updateColor(timestamp) {
		const progress = timestamp - startTime;
		const transition = progress / duration;

		if (transition < 1) {
			const currentColor = transitionColor(
				startColor,
				targetColor,
				transition
			);
			ctx.fillStyle = currentColor;
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.fill();
			requestAnimationFrame(updateColor);
		} else {
			ctx.fillStyle = targetColor;
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.fill();
		}
	}

	requestAnimationFrame(updateColor);
}

function transitionColor(startColor, targetColor, transition) {
	const r = Math.round(
		startColor.r + (targetColor.r - startColor.r) * transition
	);
	const g = Math.round(
		startColor.g + (targetColor.g - startColor.g) * transition
	);
	const b = Math.round(
		startColor.b + (targetColor.b - startColor.b) * transition
	);
	return `rgb(${r},${g},${b})`;
}
