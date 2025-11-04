import { initializeOptionListeners } from './navigation.js';

export function initDOM() {
	document.addEventListener('DOMContentLoaded', function() {
		initializeOptionListeners();
	});
}


