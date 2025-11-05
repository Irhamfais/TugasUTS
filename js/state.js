// Centralized application state and helpers
import { countAllQuestions } from "./questions.js";

export const appState = {
  currentQuestion: 0,
  totalQuestions: countAllQuestions(),
  answers: {},
  categoryScores: {
    transportasi: 0,
    makanan: 0,
    energi: 0,
    sampah: 0,
  },
};

export function resetState() {
  appState.currentQuestion = 0;
  Object.keys(appState.answers).forEach((key) => delete appState.answers[key]);
  Object.keys(appState.categoryScores).forEach(
    (key) => (appState.categoryScores[key] = 0)
  );
}

export function getProgressPercentage() {
  return ((appState.currentQuestion + 1) / appState.totalQuestions) * 100;
}
