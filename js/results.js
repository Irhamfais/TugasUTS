import { appState } from './state.js';
import { createRadarChart } from './chart.js';
import { generateRecommendations } from './recommendations.js';

export function calculateResults() {
	const cards = document.querySelectorAll('.question-card');
	const currentCard = cards[appState.currentQuestion];
	const selectedOption = currentCard.querySelector('input[type="radio"]:checked');

	if (!selectedOption) {
		return;
	}

	const questionName = selectedOption.name;
	const category = currentCard.dataset.category;
	appState.answers[questionName] = parseInt(selectedOption.value);
	appState.categoryScores[category] = parseInt(selectedOption.value);

	const totalScore = Object.values(appState.answers).reduce((a, b) => a + b, 0);
	const maxScore = appState.totalQuestions * 10;
	const percentage = (totalScore / maxScore) * 100;

	document.getElementById('assessment').style.display = 'none';
	document.getElementById('results').style.display = 'block';

	displayResults(totalScore, percentage);
	createRadarChart(appState.categoryScores);
	generateRecommendations(appState.categoryScores);
}

export function displayResults(score, percentage) {
	document.getElementById('totalScore').textContent = score;

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


