// ===== GLOBAL VARIABLES =====
let currentQuestion = 0;
const totalQuestions = 4;
const answers = {};
const categoryScores = {
    transportasi: 0,
    makanan: 0,
    energi: 0,
    sampah: 0
};

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    initializeOptionListeners();
});

// Initialize click listeners for all options
function initializeOptionListeners() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            handleOptionClick(this);
        });
    });
}

// Handle option selection
function handleOptionClick(optionElement) {
    const radio = optionElement.querySelector('input[type="radio"]');
    const questionCard = optionElement.closest('.question-card');
    const allOptions = questionCard.querySelectorAll('.option');
    
    // Remove selected class from all options
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    optionElement.classList.add('selected');
    radio.checked = true;
    
    // Enable next button
    const nextBtn = questionCard.querySelector('.btn-next');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

// ===== NAVIGATION FUNCTIONS =====

// Start the assessment
function startAssessment() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('assessment').style.display = 'block';
    updateProgress();
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Move to next question
function nextQuestion() {
    const cards = document.querySelectorAll('.question-card');
    const currentCard = cards[currentQuestion];
    const selectedOption = currentCard.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        return;
    }
    
    // Save answer
    const questionName = selectedOption.name;
    const category = currentCard.dataset.category;
    answers[questionName] = parseInt(selectedOption.value);
    categoryScores[category] = parseInt(selectedOption.value);
    
    // Hide current card
    cards[currentQuestion].classList.remove('active');
    currentQuestion++;
    
    // Show next card
    if (currentQuestion < totalQuestions) {
        cards[currentQuestion].classList.add('active');
        updateProgress();
    }
}

// Move to previous question
function prevQuestion() {
    const cards = document.querySelectorAll('.question-card');
    cards[currentQuestion].classList.remove('active');
    currentQuestion--;
    cards[currentQuestion].classList.add('active');
    updateProgress();
}

// ===== RESULTS CALCULATION =====

// Calculate and display results
function calculateResults() {
    const cards = document.querySelectorAll('.question-card');
    const currentCard = cards[currentQuestion];
    const selectedOption = currentCard.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        return;
    }
    
    // Save last answer
    const questionName = selectedOption.name;
    const category = currentCard.dataset.category;
    answers[questionName] = parseInt(selectedOption.value);
    categoryScores[category] = parseInt(selectedOption.value);
    
    // Calculate total score
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const maxScore = totalQuestions * 10;
    const percentage = (totalScore / maxScore) * 100;
    
    // Hide assessment, show results
    document.getElementById('assessment').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    // Display results
    displayResults(totalScore, percentage);
    createRadarChart();
    generateRecommendations();
}

// Display score and description
function displayResults(score, percentage) {
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

// ===== CHART VISUALIZATION =====

// Create radar chart using Chart.js
function createRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    new Chart(ctx, {
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
                        font: {
                            size: 12
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// ===== RECOMMENDATIONS =====

// Generate personalized recommendations
function generateRecommendations() {
    const recommendations = {
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
    
    // Sort categories by score (lowest first)
    const sortedCategories = Object.entries(categoryScores)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 2);
    
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    // Generate recommendation items
    sortedCategories.forEach(([category, score]) => {
        const rec = recommendations[category];
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.innerHTML = `
            <h3><span>${rec.icon}</span> ${rec.title}</h3>
            <ul style="margin-left: 20px; margin-top: 10px;">
                ${rec.tips.map(tip => <li style="margin-bottom: 8px;">${tip}</li>).join('')}
            </ul>
        `;
        recommendationsList.appendChild(item);
    });
}

// ===== RESTART FUNCTION =====

// Reset and restart the assessment
function restartAssessment() {
    // Reset variables
    currentQuestion = 0;
    Object.keys(answers).forEach(key => delete answers[key]);
    Object.keys(categoryScores).forEach(key => categoryScores[key] = 0);
    
    // Reset form
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.disabled = true;
    });
    
    // Hide results, show landing
    document.getElementById('results').style.display = 'none';
    document.getElementById('landing').style.display = 'block';
}