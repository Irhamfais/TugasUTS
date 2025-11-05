import { appState, getProgressPercentage } from "./state.js";

export function initializeOptionListeners() {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      handleOptionClick(this);
    });
  });
}

export function handleOptionClick(optionElement) {
  const radio = optionElement.querySelector('input[type="radio"]');
  const questionCard = optionElement.closest(".question-card");
  const allOptions = questionCard.querySelectorAll(".option");

  allOptions.forEach((opt) => opt.classList.remove("selected"));
  optionElement.classList.add("selected");
  radio.checked = true;

  const nextBtn = questionCard.querySelector(".btn-next");
  if (nextBtn) {
    nextBtn.disabled = false;
  }
}

export function startAssessment() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("assessment").style.display = "block";
  updateProgress();
}

export function updateProgress() {
  const progress = getProgressPercentage();
  document.getElementById("progressBar").style.width = progress + "%";
}

export function nextQuestion() {
  const cards = document.querySelectorAll(".question-card");
  const currentCard = cards[appState.currentQuestion];
  const selectedOption = currentCard.querySelector(
    'input[type="radio"]:checked'
  );

  if (!selectedOption) {
    return;
  }

  const questionName = selectedOption.name; // item.id
  const category = currentCard.dataset.category;
  appState.answers[questionName] = parseInt(selectedOption.value);
  // Per-question store only; categoryScores dihitung saat hasil

  cards[appState.currentQuestion].classList.remove("active");
  appState.currentQuestion++;

  if (appState.currentQuestion < appState.totalQuestions) {
    cards[appState.currentQuestion].classList.add("active");
    updateProgress();
  }
}

export function prevQuestion() {
  const cards = document.querySelectorAll(".question-card");
  cards[appState.currentQuestion].classList.remove("active");
  appState.currentQuestion--;
  cards[appState.currentQuestion].classList.add("active");
  updateProgress();
}
