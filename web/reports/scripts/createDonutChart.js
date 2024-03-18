let chart;

export function createOverallStatusDonutChart(data) {
	const passCount = data.filter(
		(test) => test.state.toLowerCase() === 'passed'
	).length;
	const failCount = data.filter(
		(test) => test.state.toLowerCase() === 'failed'
	).length;
	const skippedOrPendingCount = data.filter(
		(test) =>
			test.state.toLowerCase() === 'skipped' ||
			test.state.toLowerCase() === 'pending'
	).length;

	// This will change text color based on percentage passed
	const totalTests = passCount + failCount + skippedOrPendingCount;
	// Calculate pass percentage
	const passPercentage = (passCount / totalTests) * 100;

	// Set text color based on pass percentage
	let percentTextColor;

	if (passPercentage === 100) {
		percentTextColor = 'hsl(100, 70%, 40%)';
		// "green";
	} else if (passPercentage === 0) {
		percentTextColor = 'hsl(0, 70%, 40%)';
		// "red";
	} else {
		// Calculate color gradient from green to red
		const hue = ((1 - passPercentage / 100) * 120).toString(10);
		percentTextColor = ['hsl(', hue, ',100%,50%)'].join('');
	}

	let options = {
		labels: ['Passed', 'Failed', 'Skipped/Pending'],
		series: [passCount, failCount, skippedOrPendingCount],

		chart: {
			type: 'donut',
			animations: {
				enabled: true,
				easing: 'easeinout',
				speed: 800,
				animateGradually: {
					enabled: true,
					delay: 150
				},
				dynamicAnimation: {
					enabled: true,
					speed: 350
				}
			}
		},
		dataLabels: {
			style: {
				fontSize: '20px'
			}
		},
		responsive: [
			{
				breakpoint: 860,
				// 480,
				dataLabels: {
					style: {
						fontSize: '10px'
					}
				},
				plotOptions: {
					pie: {
						donut: {
							labels: {
								name: {
									fontSize: '12px'
								},
								value: {
									fontSize: '18px'
								},
								total: {
									fontSize: '10px'
								}
							}
						}
					}
				},
				legend: {
					fontSize: '10px'
				},
				tooltip: {
					style: {
						fontSize: '10px'
					}
				}
			}
		],
		plotOptions: {
			pie: {
				expandOnClick: false, // Do not expand the donut hole when clicked
				donut: {
					size: '50%', // The size of the donut hole
					labels: {
						show: true, // Show the labels
						name: {
							show: true, // Show the name
							color: 'white', // The color of the name
							offsetY: 15 // The offset of the name
						},
						value: {
							show: true, // Show the value
							fontSize: '42px', // The font size of the value
							fontWeight: 'bold', // The font weight of the value
							offsetY: -30, // The offset of the value
							color: percentTextColor // The color of the number value
						},
						total: {
							offsetY: -10,
							formatter: function (w) {
								// The function to format the total value
								// Get the sum of the data values
								var total = w.globals.seriesTotals.reduce(
									(a, b) => a + b
								);
								// Return the total
								return total;
							},
							show: true, // Show the total label
							label: 'Total Tests', // The text for the total label
							fontSize: '20px', // The font size of the total label
							color: 'white' // The color of the total label
						}
					}
				}
			}
		},
		fill: {
			colors: ['hsl(100, 70%, 40%)', 'hsl(0, 70%, 40%)', 'hwb(60 0% 0%)'] // The colors for the chart
		},
		legend: {
			fontSize: '16px',
			position: 'bottom',
			horizontalAlign: 'center',
			itemMargin: {
				horizontal: 10
			},
			labels: {
				colors: 'white'
			},
			// The legend circles
			markers: {
				width: 22,
				height: 22,
				fillColors: ['hsl(100, 70%, 40%)', 'hsl(0, 70%, 40%)']
			}
		},
		stroke: {
			colors: 'white',
			width: 3
		},
		tooltip: {
			theme: 'dark',
			fillSeriesColor: false,
			style: {
				fontSize: '18px'
			},
			onDatasetHover: {
				highlightDataSeries: true
			},
			marker: {
				show: false
			}
		}
	};

	chart = new ApexCharts(document.querySelector('#wheelChart'), options);
	chart.render();
	return chart;
}

export function getChartOptions(theme) {
	const labelColor = theme === 'dark' ? 'white' : 'black';

	return {
		plotOptions: {
			pie: {
				donut: {
					// The inner labels
					labels: {
						name: {
							color: labelColor // The color of the name text
						},
						total: {
							color: labelColor // The color of the total label text
						}
					}
				}
			}
		},
		// The legend labels
		legend: {
			labels: {
				colors: labelColor //The color of the legend labels text
			}
		},
		stroke: {
			colors: labelColor
		}
	};
}

export function getChart() {
	return chart;
}
