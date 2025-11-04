const RECOMMENDATIONS = {
	transportasi: {
		icon: '🚗',
		title: 'Transportasi',
		tips: [
			'Gunakan transportasi umum atau sepeda untuk jarak dekat',
			'Pertimbangkan carpooling dengan teman atau rekan kerja',
			'Kurangi penggunaan kendaraan pribadi minimal 2x seminggu'
		]
	},
	makanan: {
		icon: '🍽',
		title: 'Konsumsi Makanan',
		tips: [
			'Coba Meatless Monday - vegetarian sehari dalam seminggu',
			'Beli produk lokal dan organik',
			'Kurangi food waste dengan meal planning yang baik'
		]
	},
	energi: {
		icon: '💡',
		title: 'Penggunaan Energi',
		tips: [
			'Ganti ke lampu LED yang hemat energi',
			'Cabut charger dan peralatan saat tidak digunakan',
			'Gunakan AC dengan bijak dan atur suhu optimal (24-26°C)'
		]
	},
	sampah: {
		icon: '♻',
		title: 'Pengelolaan Sampah',
		tips: [
			'Mulai memilah sampah organik dan anorganik',
			'Gunakan tas belanja reusable',
			'Kurangi penggunaan plastik sekali pakai'
		]
	}
};

export function generateRecommendations(categoryScores) {
	const sortedCategories = Object.entries(categoryScores)
		.sort((a, b) => a[1] - b[1])
		.slice(0, 2);

	const recommendationsList = document.getElementById('recommendationsList');
	recommendationsList.innerHTML = '';

	sortedCategories.forEach(([category]) => {
		const rec = RECOMMENDATIONS[category];
		const item = document.createElement('div');
		item.className = 'recommendation-item';
		item.innerHTML = `
			<h3><span>${rec.icon}</span> ${rec.title}</h3>
			<ul style="margin-left: 20px; margin-top: 10px;">
			 ${rec.tips.map(tip => `<li style="margin-bottom: 8px;">${tip}</li>`).join('')}
			</ul>
		`;
		recommendationsList.appendChild(item);
	});
}


