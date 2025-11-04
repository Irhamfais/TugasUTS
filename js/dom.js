import { initializeOptionListeners } from './navigation.js';
import { renderQuestions } from './questions.js';

export function initDOM() {
	document.addEventListener('DOMContentLoaded', function() {
		renderQuestions();
		initializeOptionListeners();
	});
}


