# PRD GIS LHU

## 1. Informasi Dokumen

- Nama aplikasi: GIS LHU
- Versi dokumen: 1.0
- Tanggal: 20 April 2026
- Status: Draft awal
- Tipe dokumen: Product Requirements Document
- Referensi bisnis: Aplikasi baru dengan tujuan dan alur serupa dengan sistem LHU yang ada, tetapi menggunakan identitas produk baru dan mendukung 2 tipe form

## 2. Ringkasan Produk

GIS LHU adalah aplikasi manajemen Laporan Hasil Uji yang ditujukan untuk mengelola proses kerja laboratorium dari pembuatan draft, pengisian data pengujian, review QA, approval, publish, hingga verifikasi publik melalui QR code atau token.

Secara tujuan, alur kerja, dan konten bisnis, GIS LHU mengadopsi fondasi yang sama dengan sistem LHU yang sudah ada. Pembeda utamanya adalah aplikasi ini harus dirancang sejak awal untuk mendukung **2 tipe form** pada proses input dokumen, dan pada fase awal **isi kedua form tersebut dibiarkan kosong terlebih dahulu** sampai struktur field final ditentukan.

## 3. Latar Belakang

Laboratorium membutuhkan sistem LHU yang:

- menjaga konsistensi data dan proses review,
- memudahkan pelacakan status dokumen,
- mempercepat penerbitan dokumen resmi,
- memudahkan verifikasi publik,
- dan tetap fleksibel terhadap variasi format input.

Pada pengembangan aplikasi baru ini, kebutuhan fleksibilitas form menjadi lebih penting karena bisnis membutuhkan dua tipe form yang bisa dipilih sejak awal, namun definisi field masing-masing form belum ingin dikunci sekarang.

## 4. Tujuan Produk

### 4.1 Tujuan bisnis

- Membangun aplikasi baru bernama GIS LHU dengan tujuan operasional yang sama seperti sistem LHU sebelumnya.
- Menyediakan fondasi produk yang bisa digunakan untuk menerbitkan dan memverifikasi dokumen LHU secara resmi.
- Menyiapkan struktur aplikasi yang lebih fleksibel untuk mendukung beberapa tipe form.

### 4.2 Tujuan operasional

- Menyediakan satu sistem untuk proses dokumen LHU end-to-end.
- Menstandarkan workflow draft, review, approval, publish, dan verifikasi publik.
- Menyediakan dua pilihan tipe form saat user membuat dokumen baru.
- Membiarkan field form tetap kosong pada fase awal agar definisi detail dapat ditentukan belakangan.

### 4.3 Tujuan teknis

- Menyediakan arsitektur aplikasi web yang mendukung role-based access control.
- Menyediakan model data yang tetap mendukung alur LHU inti.
- Menambahkan abstraction untuk tipe form agar aplikasi mudah dikembangkan tanpa harus merombak workflow inti.

## 5. Non-Goals

Hal berikut tidak menjadi target utama pada fase awal GIS LHU:

- Menentukan struktur final field untuk Form Tipe 1 dan Form Tipe 2.
- Membangun customer portal terpisah.
- Menambahkan billing, invoice, atau pembayaran.
- Membuat integrasi alat laboratorium.
- Mengubah workflow inti LHU secara besar-besaran dari sistem sebelumnya.
- Menyelesaikan seluruh fitur PDF advanced pada fase pertama.

## 6. Persona Pengguna

### 6.1 Super Admin

- Mengelola user, setting global, dan aksi sensitif seperti revoke.

### 6.2 Admin Laboratorium

- Mengelola operasional dokumen, review, publish, dan setting operasional.

### 6.3 Frontdesk

- Membuat draft dokumen dan memilih tipe form saat awal input.

### 6.4 Analis

- Melengkapi data hasil pengujian, lampiran, dan revisi dokumen.

### 6.5 QA / Supervisor

- Melakukan review, approval, atau mengembalikan dokumen ke revisi.

### 6.6 Viewer / Auditor

- Melihat data atau audit log sesuai hak akses yang diberikan.

## 7. Problem Statement

GIS LHU harus mampu menjawab kebutuhan berikut:

- Dokumen LHU harus diproses melalui workflow yang tertib dan dapat dilacak.
- Sistem harus mendukung verifikasi publik untuk menjaga kredibilitas dokumen.
- Aplikasi baru harus dapat menampung dua tipe form tanpa memaksa struktur field final ditentukan sekarang.
- Tim harus bisa melanjutkan pengembangan isi form di tahap berikutnya tanpa mengubah tujuan produk.

## 8. Prinsip Produk

- Workflow inti harus tetap sederhana dan konsisten.
- Perbedaan tipe form tidak boleh mengubah proses bisnis utama draft sampai publish.
- Struktur form harus fleksibel dan dapat dikembangkan bertahap.
- Area publik harus tetap fokus pada validasi dokumen, bukan pada kompleksitas internal.

## 9. Ruang Lingkup Produk

### 9.1 Ruang lingkup inti

- Login internal.
- Role dan permission.
- Dashboard operasional.
- Pembuatan dokumen LHU.
- Pemilihan tipe form saat membuat dokumen.
- Halaman detail dokumen.
- Review QA.
- Publish dokumen.
- Verifikasi publik via token atau QR.
- Settings global.
- User management.
- Audit logs.

### 9.2 Ruang lingkup khusus GIS LHU

- Sistem harus memiliki 2 tipe form.
- Kedua tipe form tersedia sebagai opsi saat create document.
- Isi field pada kedua tipe form belum ditentukan dan dibiarkan kosong pada fase awal.
- Sistem harus bisa menyimpan identitas tipe form yang dipilih untuk setiap dokumen.

### 9.3 Ruang lingkup tahap berikutnya

- Pengisian field final untuk masing-masing tipe form.
- Validasi per tipe form.
- Preview PDF yang menyesuaikan tipe form.
- Template PDF khusus per tipe form bila dibutuhkan.

## 10. Workflow Produk

### 10.1 Status dokumen

Dokumen mengikuti workflow status berikut:

- `draft`
- `input_hasil`
- `review`
- `revisi`
- `approved`
- `published`
- `revoked`

### 10.2 Alur utama

1. User membuat dokumen baru.
2. User memilih salah satu dari dua tipe form.
3. Sistem membuat draft dengan tipe form terpilih.
4. Data dokumen diisi secara bertahap.
5. Dokumen dikirim ke review QA.
6. QA melakukan approve atau return revision.
7. Dokumen yang approved dipublish.
8. Sistem menghasilkan token dan QR verifikasi publik.
9. Pihak eksternal memverifikasi dokumen melalui halaman publik.

## 11. Kebutuhan Fungsional

### 11.1 FR-01 Login dan sesi

- User internal harus login untuk mengakses sistem.
- Sistem harus menjaga sesi login yang valid.
- Route internal harus terlindungi.

### 11.2 FR-02 Role-based access control

- Sistem harus membatasi menu dan aksi berdasarkan role.
- Aksi sensitif seperti publish, revoke, manage users, dan manage settings harus dibatasi.
- Validasi permission harus tetap dilakukan di server side.

### 11.3 FR-03 Dashboard

- Sistem harus menyediakan dashboard ringkasan operasional.
- Dashboard minimal menampilkan jumlah dokumen per status.
- Dashboard sebaiknya menampilkan aktivitas terbaru dan dokumen terbaru.

### 11.4 FR-04 Pembuatan dokumen baru

- User yang berwenang harus dapat membuat dokumen baru.
- Saat membuat dokumen, user wajib memilih tipe form.
- Sistem harus menyediakan 2 opsi tipe form.
- Setelah tipe dipilih, sistem membuat draft dengan relasi ke tipe form tersebut.

### 11.5 FR-05 Dukungan dua tipe form

- Sistem harus mendukung `Form Tipe 1` dan `Form Tipe 2` sebagai placeholder awal.
- Nama final kedua tipe form dapat disesuaikan di tahap berikutnya.
- Kedua form pada fase awal dibiarkan kosong, artinya belum memiliki field wajib bawaan.
- Sistem harus tetap bisa menampilkan halaman form walaupun belum ada field yang terdefinisi.
- Sistem harus dirancang agar field tiap tipe form dapat ditambahkan kemudian tanpa mengubah workflow inti.

### 11.6 FR-06 Penyimpanan tipe form

- Setiap dokumen harus menyimpan informasi tipe form yang dipilih.
- Informasi tipe form harus tampil di detail dokumen, daftar dokumen, dan proses review bila relevan.
- Tipe form tidak boleh hilang ketika dokumen berubah status.

### 11.7 FR-07 Pengisian dokumen bertahap

- Sistem harus mendukung pengisian data dokumen secara bertahap.
- Pada fase awal, form dapat berada dalam kondisi kosong tanpa field input final.
- Sistem harus siap menerima penambahan section, field, atau komponen input di tahap berikutnya.

### 11.8 FR-08 Review QA

- QA harus dapat melihat daftar dokumen yang perlu direview.
- QA harus dapat membuka detail dokumen.
- QA harus dapat memberi komentar review.
- QA harus dapat approve atau mengembalikan revisi.

### 11.9 FR-09 Publish dokumen

- Dokumen approved harus dapat dipublish.
- Publish harus menghasilkan token verifikasi aktif.
- Dokumen published harus tersedia di daftar publikasi internal.

### 11.10 FR-10 Verifikasi publik

- Dokumen published harus dapat diverifikasi publik melalui URL/token.
- Jika token valid, halaman harus menampilkan informasi dokumen resmi.
- Jika token tidak valid atau dokumen revoked, halaman harus menampilkan status yang jelas.

### 11.11 FR-11 Settings

- Admin harus dapat mengelola setting global seperti identitas perusahaan, base URL verifikasi, format nomor dokumen, dan aset branding.

### 11.12 FR-12 User management

- Super admin harus dapat mengelola user dan role.

### 11.13 FR-13 Audit logs

- Sistem harus menyimpan jejak aktivitas penting seperti login, create draft, review, approve, publish, revoke, dan perubahan setting.

## 12. Kebutuhan Non-Fungsional

### 12.1 Fleksibilitas

- Sistem harus memungkinkan definisi form dikembangkan di kemudian hari.
- Penambahan field baru pada salah satu tipe form harus seminimal mungkin memengaruhi modul lain.

### 12.2 Keamanan

- Route internal harus dilindungi sesi login.
- Aksi sensitif harus dibatasi per role.
- Halaman publik hanya menampilkan data yang memang ditujukan untuk verifikasi.

### 12.3 Maintainability

- Struktur aplikasi harus memisahkan workflow inti dengan definisi form.
- Komponen form sebaiknya dibangun modular agar mudah diperluas.

### 12.4 Kinerja

- Dashboard dan daftar dokumen harus responsif.
- Halaman verifikasi publik harus tetap cepat saat dibuka di perangkat mobile.

### 12.5 Auditability

- Sistem harus mampu menunjukkan siapa melakukan aksi apa dan kapan.

## 13. Struktur Konsep Form

### 13.1 Form Tipe 1

- Status awal: kosong
- Field default: belum ditentukan
- Validasi default: belum ditentukan
- Tujuan bisnis: akan ditentukan pada fase desain detail

### 13.2 Form Tipe 2

- Status awal: kosong
- Field default: belum ditentukan
- Validasi default: belum ditentukan
- Tujuan bisnis: akan ditentukan pada fase desain detail

### 13.3 Requirement fleksibilitas form

- Sistem harus dapat menampilkan state kosong dengan baik.
- Sistem harus mendukung penambahan field per tipe form di kemudian hari.
- Sistem harus memungkinkan kedua tipe form memiliki struktur field yang berbeda.
- Sistem harus tetap menjaga proses review, publish, dan verifikasi tetap sama walaupun tipe form berbeda.

## 14. Asumsi Data dan Arsitektur

- GIS LHU akan menggunakan fondasi arsitektur yang serupa dengan aplikasi LHU yang sudah ada.
- Role pengguna, workflow status, dan modul inti tetap dipertahankan.
- Perbedaan utama pada fase awal difokuskan pada identitas aplikasi dan kemampuan memilih dua tipe form.
- Form engine atau struktur konfigurasi form akan menjadi titik pengembangan utama setelah MVP inti siap.

## 15. Prioritas Produk

### 15.1 P0

- Login dan sesi
- RBAC
- Create document dengan pilihan 2 tipe form
- Penyimpanan tipe form pada dokumen
- Detail dokumen
- Review QA
- Publish
- Verifikasi publik

### 15.2 P1

- Audit logs lengkap
- Settings global
- User management
- Penyiapan struktur konfigurasi form yang dapat dikembangkan

### 15.3 P2

- PDF/print yang menyesuaikan tipe form
- Editor template per tipe form
- Validasi dinamis per form

## 16. KPI / Metrik Keberhasilan

- Dokumen baru dapat dibuat dengan memilih salah satu dari dua tipe form.
- Workflow dari draft sampai publish berjalan tanpa bergantung pada isi field form final.
- Dokumen published dapat diverifikasi publik dengan sukses.
- Perubahan tipe atau konfigurasi form di tahap lanjutan dapat dilakukan tanpa rework besar pada workflow inti.

## 17. Risiko

- Jika struktur form tidak dirancang fleksibel sejak awal, penambahan field nanti akan mahal secara teknis.
- Jika dua tipe form terlalu cepat dipaksa menjadi final, tim akan kehilangan fleksibilitas bisnis.
- Jika data wajib dokumen belum dipisahkan dari data field form, desain sistem bisa cepat menjadi kaku.

## 18. Rekomendasi Implementasi

- Pisahkan data inti dokumen LHU dari definisi isi form.
- Simpan tipe form sebagai metadata utama dokumen.
- Gunakan pendekatan placeholder untuk dua tipe form pada fase awal.
- Bangun workflow inti terlebih dahulu, lalu isi dan validasi form dikembangkan pada fase berikutnya.
- Pastikan seluruh modul review, publish, dan verifikasi tidak tergantung pada detail field form yang belum final.

## 19. Kesimpulan

GIS LHU adalah aplikasi baru dengan tujuan yang sama seperti sistem LHU sebelumnya: mengelola dokumen LHU dari awal hingga verifikasi publik. Perbedaan utamanya terletak pada kebutuhan untuk mendukung dua tipe form yang saat ini masih kosong. Karena itu, PRD ini menempatkan fleksibilitas form sebagai requirement penting, sambil tetap menjaga agar workflow inti LHU dapat langsung dibangun dan dipakai sebagai fondasi produk.
