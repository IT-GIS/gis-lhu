"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FloatingContactWidget } from "@/features/landing/floating-contact-widget";
import { LanguageSwitcher } from "@/features/landing/language-switcher";
export type Article = {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: string;
  image: string;
  sourceUrl: string;
  excerpt: string;
};

const articles: Article[] = [
  {
    id: 3762,
    title:
      "Pengujian Pelumas: Mengapa Penting untuk Keandalan Mesin dan Efisiensi Operasional",
    slug: "pengujian-pelumas-mengapa-penting-untuk-keandalan-mesin-dan-efisiensi-operasional",
    date: "2026-03-02T03:01:22",
    category: "Pelumas",
    image:
      "/landing/blog/pengujian-pelumas-mengapa-penting-untuk-keandalan-mesin-dan-efisiensi-operasional.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2026/03/02/pengujian-pelumas-mengapa-penting-untuk-keandalan-mesin-dan-efisiensi-operasional/",
    excerpt:
      "Pelumas (oli) adalah “darah” bagi mesin. Fungsinya bukan hanya melumasi, tetapi juga membantu mengurangi gesekan, menstabilkan temperatur, melindungi komponen dari keausan, dan membawa partikel kotoran agar tidak menumpuk di area kritis. Masalahnya,...",
  },
  {
    id: 3750,
    title: "Mengapa Pengujian Lingkungan Penting?",
    slug: "mengapa-pengujian-lingkungan-penting",
    date: "2026-01-08T03:02:44",
    category: "Lingkungan",
    image: "/landing/blog/mengapa-pengujian-lingkungan-penting.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2026/01/08/mengapa-pengujian-lingkungan-penting/",
    excerpt:
      "Pengujian lingkungan merupakan bagian penting dalam menjaga kualitas lingkungan hidup, kesehatan masyarakat, serta keberlanjutan kegiatan industri. Melalui pengujian yang akurat dan berbasis data, potensi pencemaran dapat dideteksi sejak dini sehingga...",
  },
  {
    id: 3733,
    title: "Laboratorium Pengujian Global Inspeksi Sistem",
    slug: "laboratorium-pengujian-global-inspeksi-sistem",
    date: "2025-12-17T06:51:28",
    category: "Laboratorium",
    image: "/landing/blog/laboratorium-pengujian-global-inspeksi-sistem.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/12/17/laboratorium-pengujian-global-inspeksi-sistem/",
    excerpt:
      "Laboratorium Pengujian Global Inspeksi Sistem Dalam dunia industri dan perdagangan, kualitas dan kepatuhan produk tidak dapat ditentukan hanya dari tampilan fisik. Diperlukan pengujian laboratorium yang akurat dan dapat dipertanggungjawabkan untuk...",
  },
  {
    id: 3665,
    title:
      "Pengujian Alat Pertanian: Memastikan Kinerja, Keamanan, dan Efisiensi di Lapangan",
    slug: "pengujian-alat-pertanian-memastikan-kinerja-keamanan-dan-efisiensi-di-lapangan",
    date: "2025-11-24T05:12:06",
    category: "Pertanian",
    image:
      "/landing/blog/pengujian-alat-pertanian-memastikan-kinerja-keamanan-dan-efisiensi-di-lapangan.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/11/24/pengujian-alat-pertanian-memastikan-kinerja-keamanan-dan-efisiensi-di-lapangan/",
    excerpt:
      "Pengujian Alat Pertanian: Layanan Uji Performa, Keamanan, dan Fungsi Sesuai Standar Industri Penggunaan alat pertanian modern—seperti sprayer, drone pertanian, alat olah tanah, dan alat panen—semakin meningkat dalam industri agrikultur. Namun tidak semua...",
  },
  {
    id: 3329,
    title: "Faktor Lingkungan Sehat & Layanan Pengujian Laboratorium Terpadu",
    slug: "faktor-lingkungan-sehat-layanan-pengujian-laboratorium-terpadu",
    date: "2025-10-22T03:57:24",
    category: "Lingkungan",
    image:
      "/landing/blog/faktor-lingkungan-sehat-layanan-pengujian-laboratorium-terpadu.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/10/22/faktor-lingkungan-sehat-layanan-pengujian-laboratorium-terpadu/",
    excerpt:
      "PT Global Inspeksi Sistem (GIS) membantu perusahaan memastikan lingkungan kerja dan operasional yang sehat, patuh regulasi, dan berkelanjutan. Layanan kami mencakup perencanaan, pengambilan sampel (sampling), analisis laboratorium, QA/QC, interpretasi...",
  },
  {
    id: 3324,
    title: "Layanan Pengujian Lingkungan: Air, Udara, Emisi, Tanah, Kebisingan",
    slug: "layanan-pengujian-lingkungan-air-udara-emisi-tanah-kebisingan",
    date: "2025-10-08T05:13:40",
    category: "Lingkungan",
    image:
      "/landing/blog/layanan-pengujian-lingkungan-air-udara-emisi-tanah-kebisingan.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/10/08/layanan-pengujian-lingkungan-air-udara-emisi-tanah-kebisingan/",
    excerpt:
      "Kami membantu perusahaan, fasilitas publik, dan pengelola gedung memastikan kualitas lingkungan kerja dan operasional sesuai standar nasional (SNI/peraturan yang berlaku) dan praktik terbaik. Layanan kami mencakup pengambilan sampel sesuai SOP, analisis...",
  },
  {
    id: 3276,
    title:
      "Apakah Minyak Goreng Anda Aman? Minyak Berkualitas Dimulai Dari Pengujian Yang Benar",
    slug: "apakah-minyak-goreng-anda-aman-minyak-berkualitas-dimulai-dari-pengujian-yang-tepat",
    date: "2025-08-28T03:59:54",
    category: "Pangan & Sawit",
    image:
      "/landing/blog/apakah-minyak-goreng-anda-aman-minyak-berkualitas-dimulai-dari-pengujian-yang-tepat.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/08/28/apakah-minyak-goreng-anda-aman-minyak-berkualitas-dimulai-dari-pengujian-yang-tepat/",
    excerpt:
      "Minyak goreng yang tampak bening belum tentu aman. Untuk memastikan produk layak edar, konsisten mutunya, dan dipercaya pelanggan, dibutuhkan pengujian laboratorium yang terstandar dan terdokumentasi rapi. Mengapa GIS Labolatorium ? Metode tervalidasi,...",
  },
  {
    id: 3254,
    title:
      "Pengujian Pelumas Berkualitas oleh GISLAB: Kunci Performa Mesin yang Optimal",
    slug: "pengujian-pelumas-berkualitas-oleh-gislab-kunci-performa-mesin-yang-optimal",
    date: "2025-08-06T03:40:41",
    category: "Pelumas",
    image:
      "/landing/blog/pengujian-pelumas-berkualitas-oleh-gislab-kunci-performa-mesin-yang-optimal.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/08/06/pengujian-pelumas-berkualitas-oleh-gislab-kunci-performa-mesin-yang-optimal/",
    excerpt:
      "Dalam dunia industri dan otomotif, pelumas memegang peran penting untuk menjaga keandalan dan efisiensi mesin. GISLAB hadir sebagai mitra terpercaya Anda dalam layanan pengujian pelumas berkualitas, memberikan jaminan performa terbaik untuk kendaraan...",
  },
  {
    id: 3246,
    title: "Kualitas CPO (Crude Palm Oil) nggak cuma dinilai dari warnanya aja",
    slug: "kualitas-cpo-crude-palm-oil-nggak-cuma-dinilai-dari-warnanya-aja",
    date: "2025-07-01T02:51:30",
    category: "Pangan & Sawit",
    image:
      "/landing/blog/kualitas-cpo-crude-palm-oil-nggak-cuma-dinilai-dari-warnanya-aja.jpg",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/07/01/kualitas-cpo-crude-palm-oil-nggak-cuma-dinilai-dari-warnanya-aja/",
    excerpt:
      "Ada banyak parameter penting yang diuji, seperti: FFA (Free Fatty Acid) – Menunjukkan tingkat keasaman minyak, Moisture & Impurities – Pengaruh besar ke daya simpan dan kualitas olahan, serta DOBI sebagai indikator kemudahan pemurnian minyak...",
  },
  {
    id: 3234,
    title: "Layanan Pengujian Pupuk - PT Global Inspeksi Sistem",
    slug: "layanan-pengujian-pupuk-pt-global-inspeksi-sistem",
    date: "2025-07-01T02:50:38",
    category: "Pertanian",
    image:
      "/landing/blog/layanan-pengujian-pupuk-pt-global-inspeksi-sistem.jpg",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/07/01/layanan-pengujian-pupuk-pt-global-inspeksi-sistem/",
    excerpt:
      "Tanaman sehat dimulai dari pupuk yang berkualitas. GIS menyediakan layanan pengujian pupuk dengan akurasi tinggi untuk memastikan produk memenuhi standar mutu nasional dan internasional, mulai dari kandungan makronutrien sampai logam berat...",
  },
  {
    id: 3235,
    title: "Pengujian Lingkungan: Wawasan Akurat untuk Menjaga Ekosistem",
    slug: "pengujian-lingkungan-wawasan-akurat-untuk-menjaga-ekosistem",
    date: "2025-07-01T02:49:45",
    category: "Lingkungan",
    image:
      "/landing/blog/pengujian-lingkungan-wawasan-akurat-untuk-menjaga-ekosistem.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/07/01/pengujian-lingkungan-wawasan-akurat-untuk-menjaga-ekosistem/",
    excerpt:
      "Kesehatan lingkungan adalah faktor utama dalam menciptakan kehidupan yang lebih baik dan berkelanjutan. Pengujian lingkungan membantu memastikan air, udara, dan tanah tetap bersih, aman, dan sesuai standar yang berlaku...",
  },
  {
    id: 3236,
    title: "Analisa Minyak Goreng Sawit: Jaminan Kualitas Terbaik!",
    slug: "analisa-minyak-goreng-sawit-jaminan-kualitas-terbaik",
    date: "2025-07-01T02:46:57",
    category: "Pangan & Sawit",
    image:
      "/landing/blog/analisa-minyak-goreng-sawit-jaminan-kualitas-terbaik.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/07/01/analisa-minyak-goreng-sawit-jaminan-kualitas-terbaik/",
    excerpt:
      "Minyak goreng sawit adalah salah satu bahan utama dalam dapur. Analisis minyak goreng sawit penting untuk memastikan kualitas, kemurnian, keamanan konsumsi, dan daya simpan tetap optimal sebelum produk sampai ke konsumen...",
  },
  {
    id: 3237,
    title:
      "Uji Pelumas Otomotif: Pastikan Mesin Anda Terlindungi dengan Pelumas Berkualitas",
    slug: "uji-pelumas-otomotifpastikan-mesin-anda-terlindungi-dengan-pelumas-berkualitas",
    date: "2025-07-01T02:44:54",
    category: "Pelumas",
    image:
      "/landing/blog/uji-pelumas-otomotifpastikan-mesin-anda-terlindungi-dengan-pelumas-berkualitas.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/07/01/uji-pelumas-otomotifpastikan-mesin-anda-terlindungi-dengan-pelumas-berkualitas/",
    excerpt:
      "Pelumas bukan sekadar cairan, tetapi tameng utama bagi mesin kendaraan. GIS menyediakan layanan pengujian pelumas otomotif untuk memastikan performa terbaik dan perlindungan maksimal melalui uji viskositas, keausan, titik nyala, dan komposisi...",
  },
  {
    id: 3232,
    title: "Layanan Pengujian Berkualitas Global Inspeksi Sistem",
    slug: "layanan-pengujian-berkualitas-global-inspeksi-sistem",
    date: "2025-07-01T02:39:12",
    category: "Laboratorium",
    image:
      "/landing/blog/layanan-pengujian-berkualitas-global-inspeksi-sistem.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/07/01/layanan-pengujian-berkualitas-global-inspeksi-sistem/",
    excerpt:
      "GIS menyediakan berbagai layanan pengujian untuk mendukung standar mutu barang, mulai dari pelumas otomotif dan industri, pupuk, alat pertanian, CPO, lingkungan, air minum, palm kernel, hingga minyak goreng sawit...",
  },
  {
    id: 3221,
    title: "Validasi Performa & Keandalan Alat di Lapangan",
    slug: "validasi-performa-keandalan-alat-di-lapangan",
    date: "2025-07-01T02:26:04",
    category: "Pertanian",
    image: "/landing/blog/validasi-performa-keandalan-alat-di-lapangan.png",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2025/07/01/validasi-performa-keandalan-alat-di-lapangan/",
    excerpt:
      "Alat pertanian perlu diuji secara teknis karena performa lapangan tidak hanya soal fungsi dasar. Pengujian mengukur daya tahan material, efisiensi mekanis, presisi operasional, stabilitas, dan keselamatan kerja di berbagai kondisi medan...",
  },
  {
    id: 3180,
    title:
      "Mengenal Berbagai Pengujian Laboratorium: Dari Pelumas Otomotif hingga Analisa Minyak Sawit, Apa Saja Manfaatnya?",
    slug: "mengenal-berbagai-pengujian-laboratorium-dari-pelumas-otomotif-hingga-analisa-minyak-sawit-apa-saja-manfaatnya-2",
    date: "2024-10-29T03:35:30",
    category: "Pelumas",
    image:
      "/landing/blog/mengenal-berbagai-pengujian-laboratorium-dari-pelumas-otomotif-hingga-analisa-minyak-sawit-apa-saja-manfaatnya-2.jpg",
    sourceUrl:
      "https://gislaboratorium.com/index.php/2024/10/29/mengenal-berbagai-pengujian-laboratorium-dari-pelumas-otomotif-hingga-analisa-minyak-sawit-apa-saja-manfaatnya-2/",
    excerpt:
      "Di era industri yang semakin maju, kualitas dan keamanan produk merupakan prioritas utama. GIS hadir sebagai laboratorium pengujian untuk membantu berbagai sektor memastikan produk memenuhi standar yang diakui...",
  },
];

const categories = [
  "Semua",
  "Lingkungan",
  "Pelumas",
  "Pangan & Sawit",
  "Pertanian",
  "Laboratorium",
];

const INFORMATION_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --primary: #0A2540;
    --secondary: #0070F3;
    --accent: #00DFD8;
    --white: #FFFFFF;
    --text-dark: #1E293B;
    --text-muted: #64748B;
    --light-blue: #EBF4F8;
    --glass-bg: rgba(255, 255, 255, 0.72);
    --glass-border: rgba(255, 255, 255, 0.82);
    --glass-dark-bg: rgba(10, 37, 64, 0.55);
    --glass-dark-border: rgba(255, 255, 255, 0.16);
    --shadow-soft: 0 18px 50px rgba(15, 23, 42, 0.08);
    --shadow-hover: 0 24px 60px rgba(0, 112, 243, 0.16);
    --radius-pill: 100px;
    --radius-md: 24px;
    --radius-lg: 34px;
    --font-main: 'Plus Jakarta Sans', sans-serif;
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: var(--font-main);
    color: var(--text-dark);
    background:
      radial-gradient(circle at 18% 12%, rgba(0, 223, 216, 0.16), transparent 30%),
      radial-gradient(circle at 82% 22%, rgba(0, 112, 243, 0.14), transparent 28%),
      linear-gradient(180deg, #f8fcff 0%, #eef7fb 50%, #ffffff 100%);
    line-height: 1.6;
    overflow-x: hidden;
  }

  a { color: inherit; text-decoration: none; }
  ul { list-style: none; margin: 0; padding: 0; }
  .container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-soft);
  }
  .glass-dark {
    background: var(--glass-dark-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-dark-border);
    color: var(--white);
  }

  .navbar-wrapper {
    position: fixed;
    top: 24px;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    padding: 0 24px;
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1100px;
    padding: 12px 24px;
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border: 1px solid rgba(255, 255, 255, 0.72);
    box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08);
  }
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 1.12rem;
    color: var(--primary);
  }
  .nav-logo {
    height: 32px;
    width: auto;
    transform: scale(1.65);
    transform-origin: left center;
    margin-right: 30px;
  }
  .nav-menu { display: flex; gap: 8px; align-items: center; }
  .nav-link {
    display: inline-flex;
    padding: 8px 14px;
    border-radius: var(--radius-pill);
    font-weight: 600;
    font-size: 0.93rem;
    color: var(--text-muted);
    transition: var(--transition);
  }
  .nav-link:hover { color: var(--primary); background: rgba(0, 112, 243, 0.07); }
  .nav-link.active { background: rgba(0, 223, 216, 0.16); color: var(--secondary); }
  .mobile-menu-btn {
    display: none;
    border: 0;
    background: transparent;
    color: var(--primary);
    font-size: 1.45rem;
    cursor: pointer;
  }

  .info-main { padding-top: 0; }
  .hero {
    position: relative;
    padding: 0 0 34px;
  }
  .hero > .container {
    max-width: none;
    padding: 0;
  }
  .hero-card {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    border-radius: 0;
    padding: max(120px, 13vh) max(24px, calc((100vw - 1240px) / 2 + 62px)) 84px;
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) 360px;
    gap: 40px;
    align-items: center;
    background:
      linear-gradient(135deg, rgba(8, 29, 55, 0.94), rgba(11, 74, 122, 0.82) 48%, rgba(0, 132, 160, 0.68)),
      url('/landing/blog/mengenal-berbagai-pengujian-laboratorium-dari-pelumas-otomotif-hingga-analisa-minyak-sawit-apa-saja-manfaatnya-2.jpg') center/cover;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      0 34px 90px rgba(7, 25, 51, 0.26),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }
  .hero-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(8, 29, 55, 0.56), rgba(8, 29, 55, 0.2) 52%, rgba(8, 29, 55, 0.42)),
      linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px);
    background-size: auto, 42px 42px, 42px 42px;
    background-position: center;
    opacity: 0.86;
    z-index: -1;
  }
  .hero-card::after {
    content: "";
    position: absolute;
    right: -84px;
    top: -112px;
    width: 430px;
    height: 430px;
    border-radius: 999px;
    background:
      radial-gradient(circle, rgba(138, 244, 255, 0.46), rgba(0, 112, 243, 0.2) 42%, transparent 72%);
    filter: blur(2px);
    z-index: -1;
  }
  .hero-content {
    position: relative;
    z-index: 2;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: var(--radius-pill);
    background: rgba(255,255,255,0.14);
    color: #e9fdff;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.75rem;
    margin-bottom: 22px;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .hero-title {
    margin: 0;
    max-width: 790px;
    color: var(--white);
    font-size: clamp(2.45rem, 5.4vw, 5.15rem);
    line-height: 0.98;
    letter-spacing: -0.075em;
    font-weight: 800;
    text-wrap: balance;
    text-shadow: 0 18px 46px rgba(0,0,0,0.22);
  }
  .hero-title span {
    background: linear-gradient(135deg, #ffffff 8%, #9ff7ff 46%, #39d4ff 92%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-copy {
    max-width: 640px;
    margin: 24px 0 0;
    color: rgba(255,255,255,0.8);
    font-size: 1.1rem;
    line-height: 1.8;
  }
  .hero-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }
  .hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: var(--radius-pill);
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.16);
    color: rgba(255,255,255,0.86);
    font-size: 0.85rem;
    font-weight: 800;
    backdrop-filter: blur(14px);
  }
  .hero-pill i {
    color: #7df8ff;
  }
  .hero-visual {
    position: relative;
    z-index: 2;
    min-height: 320px;
    border-radius: 34px;
    overflow: hidden;
    background:
      linear-gradient(160deg, rgba(255,255,255,0.2), rgba(255,255,255,0.06)),
      radial-gradient(circle at 24% 20%, rgba(125, 248, 255, 0.34), transparent 28%);
    border: 1px solid rgba(255,255,255,0.22);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.22),
      0 24px 70px rgba(0,0,0,0.16);
    backdrop-filter: blur(18px);
    display: grid;
    place-items: center;
  }
  .hero-visual::before {
    content: "";
    position: absolute;
    inset: 24px;
    border-radius: 28px;
    border: 1px solid rgba(255,255,255,0.2);
    background:
      linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px),
      linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px);
    background-size: 34px 34px;
    opacity: 0.65;
  }
  .hero-visual::after {
    content: "";
    position: absolute;
    right: -56px;
    bottom: -70px;
    width: 210px;
    height: 210px;
    border-radius: 999px;
    background: linear-gradient(135deg, rgba(125,248,255,0.72), rgba(0,112,243,0.22));
    filter: blur(1px);
  }
  .hero-logo-card {
    position: relative;
    z-index: 2;
    width: min(74%, 245px);
    aspect-ratio: 1 / 1;
    border-radius: 42px;
    display: grid;
    place-items: center;
    background:
      linear-gradient(135deg, rgba(255,255,255,0.92), rgba(223, 252, 255, 0.78));
    border: 1px solid rgba(255,255,255,0.72);
    box-shadow:
      0 28px 54px rgba(0,0,0,0.18),
      inset 0 1px 0 rgba(255,255,255,0.86);
  }
  .hero-logo-card::before,
  .hero-logo-card::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
  }
  .hero-logo-card::before {
    inset: -30px;
    border: 1px dashed rgba(255,255,255,0.36);
  }
  .hero-logo-card::after {
    inset: -58px;
    border: 1px solid rgba(125,248,255,0.18);
  }
  .hero-logo-image {
    width: 72%;
    height: auto;
    transform: scale(1.18);
    filter: drop-shadow(0 18px 24px rgba(8, 29, 55, 0.16));
  }
  .hero-logo-badge {
    position: absolute;
    left: 50%;
    bottom: 30px;
    z-index: 3;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    padding: 10px 15px;
    border-radius: var(--radius-pill);
    background: rgba(8, 29, 55, 0.46);
    border: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.9);
    font-size: 0.82rem;
    font-weight: 800;
    box-shadow: 0 16px 32px rgba(0,0,0,0.14);
    backdrop-filter: blur(14px);
  }
  .hero-logo-badge i {
    color: #7df8ff;
  }

  .toolbar {
    display: grid;
    grid-template-columns: minmax(260px, 1fr) auto;
    gap: 18px;
    align-items: center;
    width: min(1240px, calc(100% - 48px));
    margin: 30px auto 26px;
  }
  .search-box {
    position: relative;
  }
  .search-box i {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--secondary);
  }
  .search-box input {
    width: 100%;
    border: 1px solid rgba(0, 112, 243, 0.16);
    border-radius: var(--radius-pill);
    padding: 17px 22px 17px 52px;
    background: rgba(255,255,255,0.86);
    color: var(--text-dark);
    font: inherit;
    font-weight: 600;
    outline: none;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
    transition: var(--transition);
  }
  .search-box input:focus {
    border-color: rgba(0, 112, 243, 0.55);
    box-shadow: 0 14px 34px rgba(0, 112, 243, 0.12);
  }
  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-end;
  }
  .category-tab {
    border: 1px solid rgba(0, 112, 243, 0.14);
    border-radius: var(--radius-pill);
    background: rgba(255,255,255,0.74);
    color: var(--text-muted);
    padding: 11px 16px;
    font: inherit;
    font-size: 0.88rem;
    font-weight: 800;
    cursor: pointer;
    transition: var(--transition);
  }
  .category-tab:hover,
  .category-tab.active {
    background: linear-gradient(135deg, var(--secondary), var(--accent));
    color: var(--white);
    border-color: transparent;
    transform: translateY(-2px);
  }

  .articles-section {
    padding: 18px 0 104px;
  }
  .section-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
    color: var(--text-muted);
    font-weight: 700;
  }
  .article-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
  .article-card {
    position: relative;
    overflow: hidden;
    border-radius: 30px;
    background: rgba(255,255,255,0.82);
    border: 1px solid rgba(255,255,255,0.82);
    box-shadow: var(--shadow-soft);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  .article-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
  }
  .article-image {
    position: relative;
    min-height: 236px;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(10,37,64,0.08), rgba(0,223,216,0.16));
  }
  .article-image img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .article-card:hover .article-image img {
    transform: scale(1.06);
  }
  .article-category {
    position: absolute;
    left: 18px;
    top: 18px;
    z-index: 2;
    padding: 8px 13px;
    border-radius: var(--radius-pill);
    background: rgba(10, 37, 64, 0.78);
    color: var(--white);
    font-size: 0.76rem;
    font-weight: 800;
    backdrop-filter: blur(10px);
  }
  .article-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .article-date {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--secondary);
    font-weight: 800;
    font-size: 0.85rem;
    margin-bottom: 12px;
  }
  .article-title {
    margin: 0 0 14px;
    color: var(--primary);
    font-size: 1.2rem;
    line-height: 1.32;
    letter-spacing: -0.02em;
  }
  .article-excerpt {
    margin: 0 0 22px;
    color: var(--text-muted);
    font-size: 0.95rem;
  }
  .article-link {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--secondary);
    font-weight: 800;
  }
  .article-link i {
    transition: transform 0.25s ease;
  }
  .article-link:hover i {
    transform: translateX(4px);
  }
  .empty-state {
    grid-column: 1 / -1;
    padding: 48px;
    text-align: center;
    border-radius: 30px;
    color: var(--text-muted);
  }

  .footer {
    position: relative;
    padding: 90px 0 42px;
    background:
      radial-gradient(circle at 15% 20%, rgba(0, 223, 216, 0.16), transparent 30%),
      radial-gradient(circle at 85% 10%, rgba(255, 255, 255, 0.1), transparent 28%),
      linear-gradient(135deg, #0A2540 0%, #0D4778 52%, #105C96 100%);
    color: var(--white);
    overflow: hidden;
  }
  .footer::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 54px 54px;
    opacity: 0.45;
    pointer-events: none;
  }
  .footer-panel {
    position: relative;
    z-index: 10;
    padding: clamp(34px, 4vw, 58px);
    border-radius: var(--radius-lg);
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }
  .footer-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.85fr) minmax(220px, 0.6fr);
    gap: clamp(32px, 5vw, 72px);
    align-items: start;
  }
  .footer-brand {
    max-width: 520px;
  }
  .footer-logo-wrap {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 22px;
  }
  .footer-logo {
    width: 74px;
    height: 74px;
    object-fit: contain;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.94);
    padding: 10px;
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
  }
  .footer-brand-title {
    margin: 0;
    color: #ffffff;
    font-size: clamp(1.35rem, 2vw, 1.8rem);
    font-weight: 900;
    letter-spacing: -0.035em;
  }
  .footer-brand-subtitle {
    margin: 5px 0 0;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  .footer-description {
    margin: 0;
    max-width: 500px;
    color: rgba(234, 246, 255, 0.82);
    font-size: 0.98rem;
    font-weight: 600;
    line-height: 1.85;
  }
  .footer-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
  }
  .footer-badges span {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    border: 1px solid rgba(0, 223, 216, 0.3);
    background: rgba(0, 223, 216, 0.1);
    color: #BFFCFB;
    padding: 8px 13px;
    font-size: 0.78rem;
    font-weight: 800;
  }
  .footer-col-title {
    font-size: 1.18rem;
    font-weight: 900;
    color: #ffffff;
    margin: 0 0 24px;
  }
  .footer-text {
    color: rgba(234, 246, 255, 0.82);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 650;
    line-height: 1.65;
  }
  .footer-text i {
    width: 20px;
    color: var(--accent);
    text-align: center;
  }
  .footer-link {
    color: rgba(234, 246, 255, 0.82);
    transition: var(--transition);
    display: block;
    width: fit-content;
    margin-bottom: 13px;
    font-weight: 700;
    text-decoration: none;
  }
  .footer-link:hover {
    color: var(--accent);
    transform: translateX(6px);
  }
  .footer-bottom {
    position: relative;
    z-index: 10;
    text-align: center;
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .whatsapp-widget {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1100;
  }

  .whatsapp-toggle {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    border: none;
    color: #ffffff;
    background: #25D366;
    box-shadow: 0 14px 28px rgba(37, 211, 102, 0.28);
    font-size: 1.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
  }

  .whatsapp-toggle:hover {
    transform: scale(1.06);
    background: #128C7E;
  }

  .whatsapp-window {
    position: absolute;
    right: 0;
    bottom: 76px;
    width: min(340px, calc(100vw - 48px));
    border-radius: 22px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.2);
    transform: translateY(12px);
    opacity: 0;
    pointer-events: none;
    transition: var(--transition);
  }

  .whatsapp-window.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .wa-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
    background: #075E54;
    color: #ffffff;
  }

  .wa-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    min-width: 0;
  }

  .wa-brand img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    flex: 0 0 28px;
  }

  .wa-brand span {
    white-space: nowrap;
  }

  .wa-close {
    border: none;
    background: transparent;
    color: #ffffff;
    cursor: pointer;
    font-size: 1.1rem;
    line-height: 1;
  }

  .wa-body {
    padding: 18px;
    display: grid;
    gap: 14px;
    background: #ECE5DD;
  }

  .wa-bubble {
    padding: 12px 14px;
    border-radius: 16px;
    color: #1f2937;
    background: #ffffff;
    font-weight: 650;
    line-height: 1.55;
    border-left: 4px solid #25D366;
  }

  .wa-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 999px;
    padding: 12px 16px;
    color: #ffffff;
    background: #25D366;
    font-weight: 800;
    text-decoration: none;
    white-space: nowrap;
  }

  .wa-link i {
    font-size: 1.2rem;
  }

  @media (max-width: 1060px) {
    .nav-menu {
      position: absolute;
      top: calc(100% + 14px);
      left: 24px;
      right: 24px;
      display: none;
      flex-direction: column;
      padding: 18px;
      border-radius: 24px;
      background: rgba(255,255,255,0.95);
      box-shadow: var(--shadow-soft);
    }
    .nav-menu.open { display: flex; }
    .nav-link { width: 100%; justify-content: center; }
    .mobile-menu-btn { display: block; }
    .hero-card { grid-template-columns: 1fr; }
    .hero-visual { min-height: 260px; }
    .toolbar { grid-template-columns: 1fr; }
    .category-tabs { justify-content: flex-start; }
    .article-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .footer-brand { grid-column: 1 / -1; }
  }

  @media (max-width: 680px) {
    .container { padding: 0 18px; }
    .navbar-wrapper { padding: 0 16px; }
    .navbar { padding: 10px 14px; }
    .nav-brand { font-size: 0.88rem; gap: 8px; min-width: 0; }
    .nav-logo { width: 34px; height: auto; margin-right: 0; transform: none; }
    .info-main { padding-top: 0; }
    .hero { padding-top: 0; }
    .hero-card { padding: 118px 18px 54px; border-radius: 0; min-height: 100vh; }
    .hero-title { max-width: 342px; font-size: clamp(2rem, 8.8vw, 2.35rem); line-height: 1.08; letter-spacing: -0.02em; }
    .hero-copy { max-width: 342px; font-size: 1rem; overflow-wrap: normal; }
    .hero-visual { min-height: 230px; max-width: calc(100vw - 36px); }
    .hero-logo-card { width: min(68%, 178px); border-radius: 32px; }
    .hero-logo-badge { bottom: 24px; font-size: 0.76rem; padding: 9px 12px; }
    .article-grid { grid-template-columns: 1fr; }
    .section-meta { align-items: flex-start; flex-direction: column; }
    .footer { padding: 64px 0 32px; }
    .footer-panel { padding: 30px 22px; border-radius: 28px; }
    .footer-grid { grid-template-columns: 1fr; gap: 34px; }
    .footer-logo-wrap { align-items: flex-start; }
    .footer-logo { width: 64px; height: 64px; border-radius: 20px; }
    .footer-badges span { font-size: 0.72rem; }
    .whatsapp-widget { right: 18px; bottom: 18px; }
    .whatsapp-window { width: min(340px, calc(100vw - 36px)); bottom: 72px; }
  }`;

function ensureLandingHeadAssets() {
  if (!document.querySelector("link[data-gislab-fontawesome]")) {
    const link = document.createElement("link");
    link.dataset.gislabFontawesome = "true";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(link);
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function InformationPage({
  initialArticles = articles,
}: {
  initialArticles?: Article[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  useEffect(() => {
    ensureLandingHeadAssets();
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredArticles = initialArticles.filter((article) => {
    const matchesCategory =
      activeCategory === "Semua" || article.category === activeCategory;
    const matchesQuery =
      !normalizedQuery ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.excerpt.toLowerCase().includes(normalizedQuery) ||
      article.category.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INFORMATION_STYLES }} />

      <header className="navbar-wrapper" id="navbar">
        <nav className="navbar">
          <Link href="/" className="nav-brand">
            <Image
              className="nav-logo"
              src="/landing/animation/logo-lab.png"
              alt="GISLAB"
              width={128}
              height={64}
              priority
            />
            Global Inspeksi Sistem
          </Link>
          <ul className={`nav-menu${menuOpen ? " open" : ""}`} id="navMenu">
            <li>
              <Link href="/" className="nav-link">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/service" className="nav-link">
                Layanan
              </Link>
            </li>
            <li>
              <Link href="/ruang-lingkup-pengujian" className="nav-link">
                Ruang Lingkup Pengujian
              </Link>
            </li>
            <li className="nav-dropdown">
              <details>
                <summary className="nav-link nav-dropdown-trigger active">
                  Informasi <i className="fa-solid fa-chevron-down" />
                </summary>
                <div className="nav-dropdown-menu">
                  <Link href="/informasi" className="nav-dropdown-link active">
                    Artikel <i className="fa-solid fa-newspaper" />
                  </Link>
                  <Link
                    href="/informasi/keluhan-dan-banding"
                    className="nav-dropdown-link"
                  >
                    Keluhan dan Banding <i className="fa-solid fa-comments" />
                  </Link>
                  <Link href="/verify" className="nav-dropdown-link">
                    Verifikasi LHU <i className="fa-solid fa-check-circle" />
                  </Link>
                </div>
              </details>
            </li>
            <li>
              <Link href="/contact" className="nav-link">
                Kontak
              </Link>
            </li>
          </ul>
          <div className="nav-actions">
            <LanguageSwitcher />

            <button
              className="mobile-menu-btn"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Buka menu"
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </nav>
      </header>

      <main className="info-main">
        <section className="hero">
          <div className="container">
            <div className="hero-card">
              <div className="hero-content">
                <span className="eyebrow">
                  <i className="fa-solid fa-newspaper" /> Informasi GISLAB
                </span>
                <h1 className="hero-title">
                  Artikel, insight, dan <span>berita pengujian</span>.
                </h1>
                <p className="hero-copy">
                  Kumpulan artikel dari blog GIS Laboratorium tentang pengujian
                  pelumas, lingkungan, pangan, sawit, alat pertanian, dan
                  layanan laboratorium.
                </p>
                <div className="hero-pills" aria-label="Topik utama informasi">
                  <span className="hero-pill">
                    <i className="fa-solid fa-flask-vial" /> Pengujian Mutu
                  </span>
                  <span className="hero-pill">
                    <i className="fa-solid fa-leaf" /> Lingkungan
                  </span>
                  <span className="hero-pill">
                    <i className="fa-solid fa-oil-can" /> Pelumas & Sawit
                  </span>
                </div>
              </div>
              <div className="hero-visual" aria-hidden="true">
                <div className="hero-logo-card">
                  <Image
                    className="hero-logo-image"
                    src="/landing/animation/logo-lab.png"
                    alt=""
                    width={260}
                    height={160}
                  />
                </div>
              </div>
            </div>

            <div className="toolbar">
              <label className="search-box" htmlFor="articleSearch">
                <i className="fa-solid fa-magnifying-glass" />
                <input
                  id="articleSearch"
                  type="search"
                  placeholder="Cari artikel, topik, atau kategori..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <div
                className="category-tabs"
                aria-label="Filter kategori artikel"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-tab${activeCategory === category ? " active" : ""}`}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="articles-section">
          <div className="container">
            <div className="section-meta">
              <span>{filteredArticles.length} artikel ditampilkan</span>
              <span>Diurutkan dari terbaru</span>
            </div>

            <div className="article-grid">
              {filteredArticles.map((article) => (
                <article className="article-card" key={article.id}>
                  <div className="article-image">
                    <span className="article-category">{article.category}</span>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 1060px) 50vw, 33vw"
                    />
                  </div>
                  <div className="article-body">
                    <span className="article-date">
                      <i className="fa-regular fa-calendar" />{" "}
                      {formatDate(article.date)}
                    </span>
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <Link
                      className="article-link"
                      href={`/informasi/${article.slug}`}
                    >
                      Baca Artikel <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                </article>
              ))}

              {filteredArticles.length === 0 ? (
                <div className="empty-state glass">
                  <h2>Artikel tidak ditemukan</h2>
                  <p>Coba kata kunci atau kategori lain.</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="kontak">
        <div className="container">
          <div className="footer-panel glass-dark">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-logo-wrap">
                  <img
                    src="/landing/animation/logo-lab.png"
                    alt="GIS Laboratorium"
                    className="footer-logo"
                  />
                  <div>
                    <h3 className="footer-brand-title">GIS Laboratorium</h3>
                    <p className="footer-brand-subtitle">
                      PT. Global Inspeksi Sistem
                    </p>
                  </div>
                </div>

                <p className="footer-description">
                  GIS Laboratorium hadir sebagai mitra pengujian yang membantu
                  pelanggan memastikan mutu, keamanan, dan kesesuaian produk
                  maupun lingkungan melalui layanan laboratorium yang akurat dan
                  terpercaya.
                </p>

                <div className="footer-badges">
                  <span>Pengujian Laboratorium</span>
                  <span>Lingkungan</span>
                  <span>Pelumas</span>
                  <span>Sawit & Pupuk</span>
                </div>
              </div>

              <div>
                <h4 className="footer-col-title">Contact</h4>

                <div className="footer-text">
                  <i className="fa-solid fa-envelope" />
                  <span>info@gislaboratorium.com</span>
                </div>

                <div
                  className="footer-text"
                  style={{ alignItems: "flex-start" }}
                >
                  <i
                    className="fa-solid fa-phone"
                    style={{ marginTop: "4px" }}
                  />
                  <div>
                    +62 856-4504-6160
                    <br />
                    +62 812-8532-8232
                    <br />
                    +62 817-888-879
                  </div>
                </div>

                <div className="footer-text">
                  <i className="fa-solid fa-globe" />
                  <span>www.gislaboratorium.com</span>
                </div>
              </div>

              <div>
                <h4 className="footer-col-title">Link</h4>

                <Link href="/" className="footer-link">
                  Beranda
                </Link>
                <Link href="/profile" className="footer-link">
                  Profile
                </Link>
                <Link href="/service" className="footer-link">
                  Layanan
                </Link>
                <Link href="/ruang-lingkup-pengujian" className="footer-link">
                  Ruang Lingkup Pengujian
                </Link>
                <Link href="/informasi" className="footer-link">
                  Informasi
                </Link>
                <Link href="/contact" className="footer-link">
                  Kontak
                </Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            &copy; 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.
          </div>
        </div>
      </footer>

      <FloatingContactWidget />
    </>
  );
}
