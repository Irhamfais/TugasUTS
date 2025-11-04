# Eco-Behavior Scorecard

Aplikasi web sederhana untuk menilai kebiasaan ramah lingkungan pengguna melalui kuisioner singkat, menampilkan skor total, grafik radar per kategori, serta rekomendasi prioritas yang dapat langsung diterapkan.

## Ringkasan
- Halaman utama (Landing) dengan navbar dan section: Tentang, Fitur, Cara Kerja.
- Form asesmen interaktif 8 pertanyaan (2 per kategori): Transportasi, Konsumsi Makanan, Energi Rumah, Pengelolaan Sampah.
- Skor akhir dalam rentang 0–100 (rata-rata semua jawaban).
- Hasil berupa skor 0–100, label capaian, grafik radar (Chart.js, skala 0–100), dan rekomendasi personal.
- Responsif dan berjalan sepenuhnya di sisi klien (client-side).

## Teknologi
- HTML, CSS, JavaScript (ES Modules)
- Chart.js 3.9.1 untuk visualisasi radar chart

## Struktur Proyek
```
TugasUTS/
├─ index.html            # Halaman utama + asesmen + hasil
├─ css/
│  └─ style.css          # Styling global, layout responsif
└─ js/
   ├─ index.js           # Entry point; wiring & expose fungsi global
   ├─ dom.js             # Inisialisasi event saat DOM siap
   ├─ questions.js       # Konfigurasi pertanyaan + render dinamis
   ├─ navigation.js      # Start, progress bar, next/prev, klik opsi
   ├─ results.js         # Hitung skor, tampilkan label/teks, trigger chart & saran
   ├─ chart.js           # Render radar chart (handle destroy instance)
   ├─ recommendations.js # Data & generator rekomendasi prioritas
   └─ state.js           # State global & helper (reset, progress)
```

## Fitur yang Ada
- Landing page informatif (hero + Tentang/Fitur/Cara Kerja)
- Navbar sederhana untuk navigasi antar section
- Form interaktif (opsi dengan state, tombol next/prev, validasi minimal)
- Skor akhir 0–100 (rata-rata), per-kategori 0–100 (rata-rata item kategori)
- Visualisasi data (Chart.js Radar 0–100)
- Rekomendasi prioritas berdasarkan dua kategori terendah
- Restart asesmen dengan reset state, UI, progress, dan chart

## Cara Menjalankan
1. Buka file `index.html` langsung di browser modern (Chrome/Edge/Firefox).
2. Tidak perlu server; semua berjalan di sisi klien.

Catatan: Jika browser membatasi `module` import dari file `file://`, jalankan server statis sederhana (opsional):
- Python 3: `python -m http.server 8000`
- Node: `npx serve .` atau `npx http-server -p 8000`

## Alur Pengguna
1. Baca deskripsi di landing (Tentang/Fitur/Cara Kerja).
2. Klik tombol "Mulai Kalkulasi Skor Eko Anda" untuk memulai asesmen.
3. Jawab 8 pertanyaan (2 per kategori); tombol "Selanjutnya" aktif setelah memilih opsi.
4. Di akhir, klik "Lihat Hasil" untuk melihat skor 0–100, grafik radar, dan rekomendasi.
5. Klik "Mulai Ulang Assessment" untuk reset dan kembali ke landing.

## Desain Modular (Folder `js/`)
- `state.js`
  - `appState`: `currentQuestion`, `totalQuestions`, `answers`, `categoryScores`.
  - `resetState()`: reset semua state.
  - `getProgressPercentage()`: helper persentase progress.
- `questions.js`
  - `QUESTION_GROUPS`: definisi pertanyaan per kategori dengan skor 0–100.
  - `countAllQuestions()`: jumlah total pertanyaan (digunakan untuk progress dan rata-rata).
  - `renderQuestions()`: membangun kartu pertanyaan dinamis ke `#questionsContainer`.
- `navigation.js`
  - `initializeOptionListeners()`: pasang listener klik opsi.
  - `handleOptionClick()`: seleksi opsi, enable tombol berikutnya.
  - `startAssessment()`: tampilkan asesmen, update progress.
  - `updateProgress()`: set lebar progress bar.
  - `nextQuestion()` / `prevQuestion()`: pindah kartu pertanyaan + simpan jawaban.
- `results.js`
  - `calculateResults()`: hitung rata-rata skor total (0–100) dan per kategori; tampilkan hasil; panggil chart & rekomendasi.
  - `displayResults()`: render skor 0–100 dan label capaian.
- `chart.js`
  - `createRadarChart(categoryScores)`: render radar chart skala 0–100; pastikan instance lama dihancurkan (`destroy()`).
- `recommendations.js`
  - `generateRecommendations(categoryScores)`: memilih 2 kategori terlemah dan render tips.
- `dom.js`
  - `initDOM()`: render pertanyaan dinamis lalu pasang listener klik opsi saat `DOMContentLoaded`.
- `index.js`
  - Entry module; menjalankan `initDOM()`.
  - Mendefinisikan `restartAssessment()` yang reset UI + progress + state.
  - Mengekspos fungsi ke `window` untuk kompatibilitas `onclick` di HTML: `startAssessment`, `nextQuestion`, `prevQuestion`, `calculateResults`, `restartAssessment`.

## Tentang Reset/Restart
- Membersihkan pilihan radio, kelas `.selected`, menonaktifkan tombol "Selanjutnya".
- Mengaktifkan hanya kartu pertanyaan pertama, mengatur progress bar ke `0%`.
- Menghancurkan chart lama sebelum membuat yang baru (mencegah duplikasi chart).

## Kustomisasi Pertanyaan
- Pertanyaan ditentukan di `js/questions.js` dalam `QUESTION_GROUPS` dengan skor 0–100.
- Tambah/ubah pertanyaan:
  1. Tambahkan item pada kategori terkait di `QUESTION_GROUPS`.
  2. Jika menambah kategori baru, tambahkan juga kunci di `state.js` (`categoryScores`), label & data di `chart.js`, dan tips di `recommendations.js`.
  3. `totalQuestions` akan otomatis menghitung ulang via `countAllQuestions()`.

## Responsif
- `style.css` berisi layout responsif (media query) untuk tipografi dan komponen.
- Komponen utama (hero, kartu pertanyaan dinamis, hasil) tetap nyaman di layar kecil.
- Jarak antara section Cara Kerja dan Form ditambah via `#assessment { margin-top: 40px; }`.

## Kontribusi Tim
- Ikuti pola modular pada folder `js/` ketika menambah fitur.
- Hindari menambah logika baru ke `index.html` selain wiring minimal (onclick) bila diperlukan.
- Gunakan fungsi dari modul yang sudah ada agar state tetap konsisten.

## Ide Pengembangan
- Menyimpan riwayat asesmen (localStorage) — saat ini sengaja tidak menyimpan data.
- Menambah kategori/pertanyaan dinamis dari konfigurasi JSON.
- Animasi scroll ke section dan menyorot menu aktif di navbar.
- Halaman About terpisah jika konten makin panjang.

## Lisensi
Internal/Academic use.


