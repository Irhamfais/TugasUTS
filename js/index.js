// Entry point: wire modules and expose minimal globals for existing HTML usage
import { initDOM } from './dom.js';
import { startAssessment, nextQuestion, prevQuestion } from './navigation.js';
import { calculateResults } from './results.js';
import { resetState } from './state.js';

initDOM();

function restartAssessment() {
	resetState();

	// Reset question cards: only first active
	const cards = document.querySelectorAll('.question-card');
	cards.forEach((card, idx) => {
		if (idx === 0) {
			card.classList.add('active');
		} else {
			card.classList.remove('active');
		}
	});
	document.querySelectorAll('input[type="radio"]').forEach(radio => {
		radio.checked = false;
	});
	document.querySelectorAll('.option').forEach(opt => {
		opt.classList.remove('selected');
	});
	document.querySelectorAll('.btn-next').forEach(btn => {
		btn.disabled = true;
	});

	// Reset progress bar visual
	const progressBar = document.getElementById('progressBar');
	if (progressBar) {
		progressBar.style.width = '0%';
	}
	document.getElementById('results').style.display = 'none';
	document.getElementById('landing').style.display = 'block';
}

// Backward compatibility with inline HTML handlers
// Expose to window so existing onclick attributes continue to work
window.startAssessment = startAssessment;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.calculateResults = calculateResults;
window.restartAssessment = restartAssessment;


