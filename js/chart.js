let radarChartInstance = null;

export function createRadarChart(categoryScores) {
	const ctx = document.getElementById('radarChart').getContext('2d');

	if (radarChartInstance) {
		radarChartInstance.destroy();
	}

	// eslint-disable-next-line no-undef
	radarChartInstance = new Chart(ctx, {
		type: 'radar',
		data: {
			labels: ['Transportasi', 'Makanan', 'Energi', 'Sampah'],
			datasets: [{
				label: 'Skor Eko Anda',
				data: [
					categoryScores.transportasi,
					categoryScores.makanan,
					categoryScores.energi,
					categoryScores.sampah
				],
				backgroundColor: 'rgba(124, 179, 66, 0.2)',
				borderColor: 'rgba(124, 179, 66, 1)',
				borderWidth: 3,
				pointBackgroundColor: 'rgba(124, 179, 66, 1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(124, 179, 66, 1)',
				pointRadius: 5,
				pointHoverRadius: 7
			}]
		},
		options: {
			scales: {
				r: {
					beginAtZero: true,
					max: 10,
					ticks: {
						stepSize: 2,
						font: { size: 12 }
					},
					pointLabels: {
						font: { size: 14, weight: 'bold' }
					}
				}
			},
			plugins: { legend: { display: false } },
			responsive: true,
			maintainAspectRatio: true
		}
	});
}


