// Question configuration with 0-100 scoring

export const QUESTION_GROUPS = [
  {
    category: "transportasi",
    title: "Transportasi",
    icon: "🚗",
    items: [
      {
        id: "transport",
        question: "Transportasi utama yang Anda gunakan sehari-hari?",
        options: [
          { text: "Sepeda/Jalan Kaki", score: 100 },
          { text: "Transportasi Umum", score: 80 },
          { text: "Motor", score: 50 },
          { text: "Mobil Pribadi", score: 30 },
        ],
      },
      {
        id: "distance",
        question: "Jarak tempuh harian rata-rata?",
        options: [
          { text: "Kurang dari 5 km", score: 100 },
          { text: "5-15 km", score: 70 },
          { text: "15-30 km", score: 40 },
          { text: "Lebih dari 30 km", score: 20 },
        ],
      },
    ],
  },
  {
    category: "makanan",
    title: "Konsumsi Makanan",
    icon: "🍽",
    items: [
      {
        id: "diet",
        question: "Pola makan Anda?",
        options: [
          { text: "Vegetarian/Vegan", score: 100 },
          { text: "Flexitarian (jarang daging)", score: 80 },
          { text: "Campuran seimbang", score: 60 },
          { text: "Sering daging merah", score: 30 },
        ],
      },
      {
        id: "local",
        question: "Seberapa sering beli produk lokal?",
        options: [
          { text: "Selalu", score: 100 },
          { text: "Sering", score: 75 },
          { text: "Kadang-kadang", score: 50 },
          { text: "Jarang", score: 25 },
        ],
      },
    ],
  },
  {
    category: "energi",
    title: "Energi Rumah",
    icon: "💡",
    items: [
      {
        id: "electricity",
        question: "Kebiasaan penggunaan listrik?",
        options: [
          { text: "Sangat hemat, matikan semua", score: 100 },
          { text: "Hemat, matikan yang tidak perlu", score: 80 },
          { text: "Biasa saja", score: 50 },
          { text: "Boros, sering lupa matikan", score: 20 },
        ],
      },
      {
        id: "ac",
        question: "Penggunaan AC/pemanas?",
        options: [
          { text: "Tidak punya/jarang pakai", score: 100 },
          { text: "Hanya saat sangat panas/dingin", score: 70 },
          { text: "Sering, beberapa jam sehari", score: 40 },
          { text: "Hampir sepanjang hari", score: 15 },
        ],
      },
    ],
  },
  {
    category: "sampah",
    title: "Pengelolaan Sampah",
    icon: "♻",
    items: [
      {
        id: "waste",
        question: "Kebiasaan memilah sampah?",
        options: [
          { text: "Selalu pilah organik/anorganik/recycle", score: 100 },
          { text: "Sering memilah", score: 75 },
          { text: "Kadang-kadang", score: 40 },
          { text: "Tidak pernah", score: 10 },
        ],
      },
      {
        id: "plastic",
        question: "Penggunaan plastik sekali pakai?",
        options: [
          { text: "Hindari total, bawa tas/botol sendiri", score: 100 },
          { text: "Jarang pakai", score: 70 },
          { text: "Kadang masih pakai", score: 40 },
          { text: "Sering pakai", score: 15 },
        ],
      },
    ],
  },
];

export function countAllQuestions() {
  return QUESTION_GROUPS.reduce((sum, group) => sum + group.items.length, 0);
}

export function renderQuestions() {
  const container = document.getElementById("questionsContainer");
  if (!container) return;
  container.innerHTML = "";

  let index = 0;
  QUESTION_GROUPS.forEach((group) => {
    group.items.forEach((item, itemIdx) => {
      const card = document.createElement("div");
      card.className = "question-card" + (index === 0 ? " active" : "");
      card.dataset.category = group.category;

      const optionsHtml = item.options
        .map(
          (opt, optIdx) => `
					<label class="option">
						<input type="radio" name="${item.id}" value="${opt.score}">
						<span class="option-icon">${group.icon}</span>
						<span class="option-text">${opt.text}</span>
					</label>
				`
        )
        .join("");

      const navButtons = `
				<div class="btn-navigation">
					${
            index > 0
              ? '<button class="btn btn-back" onclick="prevQuestion()">Kembali</button>'
              : ""
          }
					${
            index < countAllQuestions() - 1
              ? '<button class="btn btn-next" onclick="nextQuestion()" disabled>Selanjutnya</button>'
              : '<button class="btn btn-next" onclick="calculateResults()" disabled>Lihat Hasil</button>'
          }
				</div>
			`;

      card.innerHTML = `
				<div class="category-icon">${group.icon}</div>
				<h2>${group.title}</h2>
				<h3>${item.question}</h3>
				<div class="options">${optionsHtml}</div>
				${navButtons}
			`;

      container.appendChild(card);
      index++;
    });
  });
}
