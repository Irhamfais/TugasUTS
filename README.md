# Eco-Behavior Scorecard

Aplikasi web sederhana untuk menilai kebiasaan ramah lingkungan pengguna melalui kuisioner singkat, menampilkan skor total, grafik radar per kategori, serta rekomendasi prioritas yang dapat langsung diterapkan.

## Ringkasan
- Halaman utama (Landing) menjelaskan apa itu aplikasi, fitur, dan cara kerja.
- Form asesmen interaktif 4 pertanyaan: Transportasi, Makanan, Energi, Sampah.
- Hasil berupa skor total, label capaian, grafik radar (Chart.js), dan rekomendasi personal.
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
   ├─ navigation.js      # Start, progress bar, next/prev, klik opsi
   ├─ results.js         # Hitung skor, tampilkan label/teks, trigger chart & saran
   ├─ chart.js           # Render radar chart (handle destroy instance)
   ├─ recommendations.js # Data & generator rekomendasi prioritas
   └─ state.js           # State global & helper (reset, progress)
```

## Fitur yang Ada
- Landing page informatif (hero + section Tentang/Fitur/Cara Kerja)
- Navigasi jelas via navbar (anchor ke section landing)
- Form interaktif (opsi dengan state, tombol next/prev, validasi minimal)
- Responsif (layout dan media query di `style.css`)
- Visualisasi data (Chart.js Radar)
- Rekomendasi prioritas berdasarkan kategori dengan skor terendah
- Restart asesmen dengan reset state & UI yang bersih

## Cara Menjalankan
1. Buka file `index.html` langsung di browser modern (Chrome/Edge/Firefox).
2. Tidak perlu server; semua berjalan di sisi klien.

Catatan: Jika browser membatasi `module` import dari file `file://`, jalankan server statis sederhana (opsional):
- Python 3: `python -m http.server 8000`
- Node: `npx serve .` atau `npx http-server -p 8000`

## Alur Pengguna
1. Baca deskripsi di landing (Tentang/Fitur/Cara Kerja).
2. Klik tombol "Mulai Kalkulasi Skor Eko Anda" untuk memulai asesmen.
3. Jawab setiap pertanyaan; tombol "Selanjutnya" aktif setelah memilih opsi.
4. Di akhir, klik "Lihat Hasil" untuk melihat skor, grafik, dan rekomendasi.
5. Klik "Mulai Ulang Assessment" untuk reset dan kembali ke landing.

## Desain Modular (Folder `js/`)
- `state.js`
  - `appState`: `currentQuestion`, `totalQuestions`, `answers`, `categoryScores`.
  - `resetState()`: reset semua state.
  - `getProgressPercentage()`: helper persentase progress.
- `navigation.js`
  - `initializeOptionListeners()`: pasang listener klik opsi.
  - `handleOptionClick()`: seleksi opsi, enable tombol berikutnya.
  - `startAssessment()`: tampilkan asesmen, update progress.
  - `updateProgress()`: set lebar progress bar.
  - `nextQuestion()` / `prevQuestion()`: pindah kartu pertanyaan + simpan jawaban.
- `results.js`
  - `calculateResults()`: kalkulasi skor total, tampilkan hasil, panggil chart & rekomendasi.
  - `displayResults()`: render skor dan label capaian.
- `chart.js`
  - `createRadarChart(categoryScores)`: render radar chart; memastikan instance lama dihancurkan (`destroy()`) agar tidak menumpuk.
- `recommendations.js`
  - `generateRecommendations(categoryScores)`: memilih 2 kategori terlemah dan render tips.
- `dom.js`
  - `initDOM()`: panggil `initializeOptionListeners()` pada `DOMContentLoaded`.
- `index.js`
  - Entry module; menjalankan `initDOM()`.
  - Mendefinisikan `restartAssessment()` yang reset UI + progress + state.
  - Mengekspos fungsi ke `window` untuk kompatibilitas `onclick` di HTML: `startAssessment`, `nextQuestion`, `prevQuestion`, `calculateResults`, `restartAssessment`.

## Tentang Reset/Restart
- Membersihkan pilihan radio, kelas `.selected`, menonaktifkan tombol "Selanjutnya".
- Mengaktifkan hanya kartu pertanyaan pertama, mengatur progress bar ke `0%`.
- Menghancurkan chart lama sebelum membuat yang baru (mencegah duplikasi chart).

## Kustomisasi Pertanyaan
- Pertanyaan didefinisikan di `index.html` sebagai kartu `.question-card` dengan `data-category`.
- Nilai opsi radio (2/4/7/10) memengaruhi perhitungan skor.
- Tambah/ubah pertanyaan:
  1. Duplikasi blok `.question-card` dan sesuaikan `name` radio (`q5`, `q6`, ...), label, dan nilai.
  2. Tambahkan kategori baru hanya jika juga menambah representasi di `state.js` (`categoryScores`), `chart.js` (labels & data), dan `recommendations.js` (tips).
  3. Update `totalQuestions` di `state.js` jika jumlah pertanyaan berubah.

## Responsif
- `style.css` berisi layout responsif (media query) untuk tipografi dan komponen.
- Komponen utama (hero, kartu pertanyaan, hasil) tetap nyaman di layar kecil.

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


