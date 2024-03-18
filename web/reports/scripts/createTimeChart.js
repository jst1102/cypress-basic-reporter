export function createTimeChart(dataOverOneSecond, dataUnderOneSecond) {
	Highcharts.chart('timeChart', {
		chart: {
			styledMode: true,
			type: 'column'
		},
		title: {
			text: ''
		},
		tooltip: {
			useHTML: true,
			headerFormat: '',
			formatter: function () {
				return `<span style="color: ${this.color};">${this.series.name}: <b>${this.y}</b></span>`;
			}
		},

		xAxis: {
			type: 'category'
		},
		yAxis: [
			{
				className: 'highcharts-color-0',
				title: {
					text: 'Run Time (seconds)'
				}
			},
			{
				className: 'highcharts-color-1',
				opposite: true,
				title: {
					text: 'Run Time (seconds)'
				}
			}
		],

		plotOptions: {
			column: {
				borderRadius: 5,
				centerInCategory: true
			}
		},
		series: [
			{
				name: 'Run Time Over 1 Second',
				data: dataOverOneSecond,
				yAxis: 0
			},
			{
				name: 'Run Time Under or Equal to 1 Second',
				data: dataUnderOneSecond,
				yAxis: 1
			}
		],

		credits: {
			enabled: false
		}
	});
}
