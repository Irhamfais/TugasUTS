import { appState } from './state.js';
import { createRadarChart } from './chart.js';
import { generateRecommendations } from './recommendations.js';
import { QUESTION_GROUPS, countAllQuestions } from './questions.js';

export function calculateResults() {
	const cards = document.querySelectorAll('.question-card');
	const currentCard = cards[appState.currentQuestion];
	const selectedOption = currentCard.querySelector('input[type="radio"]:checked');

	if (!selectedOption) {
		return;
	}

	const questionName = selectedOption.name; // item.id
	const category = currentCard.dataset.category;
	appState.answers[questionName] = parseInt(selectedOption.value);

	// Hitung skor total sebagai rata-rata agar skala 0-100
	const allAnswers = Object.values(appState.answers);
	const totalScore = allAnswers.reduce((a, b) => a + b, 0);
	const percentage = totalScore / countAllQuestions();

	// Hitung skor per kategori sebagai rata-rata item per kategori
	const categoryAverages = { transportasi: 0, makanan: 0, energi: 0, sampah: 0 };
	QUESTION_GROUPS.forEach(group => {
		const ids = group.items.map(i => i.id);
		const values = ids
			.map(id => appState.answers[id])
			.filter(v => typeof v === 'number');
		if (values.length > 0) {
			categoryAverages[group.category] = values.reduce((a, b) => a + b, 0) / values.length;
		}
	});
	appState.categoryScores = categoryAverages;

	document.getElementById('assessment').style.display = 'none';
	document.getElementById('results').style.display = 'block';

	displayResults(percentage);
	createRadarChart(appState.categoryScores);
	generateRecommendations(appState.categoryScores);
}

export function displayResults(percentage) {
	document.getElementById('totalScore').textContent = Math.round(percentage);

	let label, description;

	if (percentage >= 80) {
		label = 'Eco Warrior! 🌟';
		description = 'Luar biasa! Anda sudah sangat peduli lingkungan dan menjadi contoh yang baik.';
	} else if (percentage >= 60) {
		label = 'Eco Conscious 🌿';
		description = 'Bagus! Anda sudah cukup peduli lingkungan, tapi masih ada ruang untuk berkembang.';
	} else if (percentage >= 40) {
		label = 'Eco Beginner 🌱';
		description = 'Tidak buruk! Anda sudah mulai peduli, mari tingkatkan lagi usaha Anda.';
	} else {
		label = 'Eco Starter 🌾';
		description = 'Mari mulai perjalanan ramah lingkungan Anda! Ada banyak hal yang bisa diperbaiki.';
	}

	document.getElementById('scoreLabel').textContent = label;
	document.getElementById('scoreDescription').textContent = description;
}


