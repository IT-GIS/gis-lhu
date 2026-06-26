"use client";

import { useEffect } from "react";

import type { LandingStaticPage } from "./static-pages";

const LANDING_RUNTIME_CSS = `
  .landing-html {
    min-height: 100vh;
  }

  .landing-html .font-display-lg,
  .landing-html .font-headline-md,
  .landing-html .font-headline-sm,
  .landing-html .font-label-caps,
  .landing-html .font-mono-data {
    font-family: "Space Grotesk", "Plus Jakarta Sans", sans-serif;
  }

  .landing-html .font-body-lg,
  .landing-html .font-body-md {
    font-family: "Inter", "Plus Jakarta Sans", sans-serif;
  }

  .landing-html .text-display-lg {
    font-size: 48px;
    line-height: 1.1;
    font-weight: 700;
  }

  .landing-html .text-headline-md {
    font-size: 32px;
    line-height: 1.2;
    font-weight: 600;
  }

  .landing-html .text-headline-sm {
    font-size: 24px;
    line-height: 1.3;
    font-weight: 600;
  }

  .landing-html .text-body-lg {
    font-size: 18px;
    line-height: 1.6;
    font-weight: 400;
  }

  .landing-html .text-body-md {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
  }

  .landing-html .text-label-caps {
    font-size: 12px;
    line-height: 1;
    letter-spacing: 0.1em;
    font-weight: 700;
  }

  .landing-html .text-primary {
    color: #0058bc;
  }

  .landing-html .text-secondary {
    color: #50616b;
  }

  .landing-html .text-on-background,
  .landing-html .text-on-surface {
    color: #0b1c30;
  }

  .landing-html .bg-background,
  .landing-html.bg-background {
    background-color: #f8f9ff;
  }

  .landing-html .bg-primary {
    background-color: #0058bc;
  }

  .landing-html .bg-primary-container {
    background-color: #0070eb;
  }

  .landing-html .border-l-primary {
    border-left-color: #0058bc;
  }

  .landing-html .border-l-primary-container {
    border-left-color: #0070eb;
  }

  .landing-html .nav-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    flex-shrink: 0;
  }

  .landing-html .language-switch {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    height: 38px;
    padding: 0 13px;
    border-radius: 999px;
    border: 1px solid rgba(0, 112, 243, 0.18);
    color: #0A2540;
    background: rgba(255, 255, 255, 0.82);
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
    transition: all 0.25s ease;
    text-decoration: none;
    white-space: nowrap;
  }

  .landing-html .language-switch:hover {
    color: #0070F3;
    transform: translateY(-1px);
    border-color: rgba(0, 112, 243, 0.32);
    background: #ffffff;
  }

  .landing-html .language-switch i {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .landing-html .nav-actions {
      gap: 8px;
    }

    .landing-html .language-switch {
      height: 36px;
      padding: 0 11px;
      font-size: 0.78rem;
    }
  }
`;

const LANDING_HERO_OVERRIDE_CSS = `
  .landing-html .profile-main {
    max-width: none !important;
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .landing-html .profile-main > section:first-child {
    background:
      linear-gradient(90deg, rgba(5, 24, 44, 0.84), rgba(0, 88, 188, 0.36), rgba(5, 24, 44, 0.72)),
      url("/landing/blog/mengenal-berbagai-pengujian-laboratorium-dari-pelumas-otomotif-hingga-analisa-minyak-sawit-apa-saja-manfaatnya-2.jpg") center/cover !important;
    min-height: 100vh !important;
    height: auto !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 120px 24px 72px !important;
    border-radius: 0 !important;
  }

  .landing-html .profile-main > section:first-child > .absolute.inset-0.bg-cover {
    opacity: 0 !important;
  }

  .landing-html .profile-main > section:first-child > .relative.z-10 {
    width: min(896px, 100%) !important;
  }

  .landing-html .profile-main > section:not(:first-child) {
    width: min(1280px, calc(100% - 48px));
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .landing-html.bg-background main > section:first-child {
    background:
      linear-gradient(90deg, rgba(248, 252, 255, 0.88), rgba(235, 248, 255, 0.7), rgba(10, 37, 64, 0.18)),
      url("https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1800") center/cover !important;
    min-height: 100vh !important;
    height: auto !important;
    padding: 120px 24px 72px !important;
  }

  .landing-html.bg-background main > section:first-child > .absolute.inset-0 img {
    opacity: 0 !important;
  }

  .landing-html.bg-background main > section:first-child > .relative.z-10 {
    width: min(896px, 100%) !important;
    max-width: 896px !important;
  }

  .landing-html .navbar-wrapper {
    width: 100% !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .landing-html .navbar {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 14px !important;

    width: min(1000px, calc(100% - 32px)) !important;
    max-width: 1000px !important;

    margin-left: auto !important;
    margin-right: auto !important;
    padding: 12px 24px !important;
    border-radius: 999px !important;
  }

  .landing-html .nav-brand {
    flex: 0 0 250px !important;
    min-width: 0 !important;

    display: flex !important;
    align-items: center !important;
    gap: 10px !important;

    color: var(--primary, #0A2540) !important;
    font-size: 1.02rem !important;
    font-weight: 900 !important;
    line-height: 1.2 !important;
    letter-spacing: -0.025em !important;
    white-space: normal !important;
  }

  .landing-html .nav-brand img {
    width: 44px !important;
    height: 44px !important;
    object-fit: contain !important;
    flex: 0 0 44px !important;
    margin-right: 0 !important;
    transform: scale(1.45) !important;
    transform-origin: center !important;
  }

  .landing-html .nav-menu {
    flex: 1 1 auto !important;
    min-width: 0 !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
  }

  .landing-html .nav-menu > li {
    display: flex !important;
    align-items: center !important;
  }

  .landing-html .nav-link {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 7px !important;

    min-height: 38px !important;
    padding: 8px 12px !important;
    border-radius: 999px !important;

    font-size: 0.88rem !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }

  .landing-html .nav-actions {
    flex: 0 0 auto !important;

    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 8px !important;
  }

  .landing-html .language-switch {
    height: 38px !important;
    padding: 0 13px !important;
    font-size: 0.8rem !important;
    font-weight: 900 !important;
    white-space: nowrap !important;
  }

  .landing-html .mobile-menu-btn {
    flex: 0 0 auto !important;
  }

  @media (max-width: 1180px) {
    .landing-html .navbar {
      gap: 12px !important;
      padding: 11px 18px !important;
    }

    .landing-html .nav-brand {
      flex-basis: 230px !important;
      font-size: 1rem !important;
    }

    .landing-html .nav-brand img {
      height: 30px !important;
      margin-right: 26px !important;
      transform: scale(1.55) !important;
    }

    .landing-html .nav-menu {
      gap: 5px !important;
    }

    .landing-html .nav-link {
      padding: 8px 10px !important;
      font-size: 0.84rem !important;
    }
  }

  @media (max-width: 1024px) {
    .landing-html .navbar {
      position: relative !important;
    }

    .landing-html .nav-brand {
      flex: 1 1 auto !important;
      max-width: 360px !important;
    }

    .landing-html .nav-menu {
      position: absolute !important;
      top: calc(100% + 12px) !important;
      left: 18px !important;
      right: 18px !important;
      z-index: 999 !important;
      display: none !important;
      flex-direction: column !important;
      align-items: stretch !important;
      justify-content: flex-start !important;
      gap: 8px !important;
      padding: 18px !important;
      border-radius: 24px !important;
      background: rgba(255, 255, 255, 0.96) !important;
      border: 1px solid rgba(226, 232, 240, 0.9) !important;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18) !important;
      backdrop-filter: blur(18px) !important;
      -webkit-backdrop-filter: blur(18px) !important;
    }

    .landing-html .nav-menu.active,
    .landing-html .nav-menu.open {
      display: flex !important;
    }

    .landing-html .nav-link {
      width: 100% !important;
      justify-content: flex-start !important;
      padding: 12px 14px !important;
      font-size: 0.95rem !important;
    }
  }

  @media (max-width: 768px) {
    .landing-html .profile-main > section:first-child,
    .landing-html.bg-background main > section:first-child {
      padding: 108px 18px 56px !important;
    }

    .landing-html .navbar-wrapper {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .landing-html .navbar {
      width: 100% !important;
      padding: 10px 14px !important;
      gap: 12px !important;
    }

    .landing-html .nav-brand {
      flex: 1 1 auto !important;
      max-width: none !important;
      min-width: 0 !important;
      gap: 8px !important;
      font-size: 0.9rem !important;
    }

    .landing-html .nav-brand img {
      width: 32px !important;
      height: auto !important;
      margin-right: 0 !important;
      transform: none !important;
    }

    .landing-html .nav-actions {
      gap: 8px !important;
    }

    .landing-html .language-switch {
      height: 36px !important;
      padding: 0 11px !important;
      font-size: 0.78rem !important;
    }

    .landing-html .profile-main > section:first-child > .relative.z-10 {
      width: min(100% - 32px, 896px) !important;
      margin-left: auto !important;
      margin-right: auto !important;
      padding: 34px 24px !important;
    }

    .landing-html .profile-main > section:first-child h1,
    .landing-html.bg-background main > section:first-child h1 {
      max-width: 342px;
      margin-left: auto;
      margin-right: auto;
      font-size: clamp(2rem, 8.8vw, 2.35rem) !important;
      line-height: 1.08 !important;
      overflow-wrap: normal;
    }

    .landing-html .profile-main > section:first-child p,
    .landing-html.bg-background main > section:first-child p {
      max-width: 342px;
      overflow-wrap: normal;
    }

    .landing-html .profile-main > section:not(:first-child) {
      width: min(100% - 36px, 1280px);
    }
  }
`;

const LANDING_PROFILE_POLICY_CSS = `
  .landing-html .policy-tab-panel .policy-with-portrait {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
    gap: 48px;
    align-items: center;
    max-width: 1000px !important;
  }

  .landing-html .policy-tab-panel .policy-copy-column {
    min-width: 0;
  }

  .landing-html .policy-tab-panel .policy-portrait {
    width: min(100%, 260px);
    justify-self: center;
    align-self: center;
    aspect-ratio: 4 / 5;
    border-radius: 28px;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(248, 251, 255, 0.96), rgba(226, 238, 249, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.86);
    box-shadow: 0 22px 48px -24px rgba(10, 37, 64, 0.48);
  }

  .landing-html .policy-tab-panel .policy-portrait img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  @media (max-width: 900px) {
    .landing-html .policy-tab-panel .policy-with-portrait {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    .landing-html .policy-tab-panel .policy-portrait {
      width: min(240px, 100%);
      order: -1;
    }
  }
`;

const serviceDetails = {
  quality: {
    title: "Pengujian Mutu Produk & Bahan",
    cover:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
    alt: "Pengujian mutu produk dan bahan di laboratorium",
    intro:
      "Pengujian mutu produk dan bahan membantu perusahaan memastikan karakteristik produk sesuai dengan standar, spesifikasi teknis, dan kebutuhan pelanggan. Layanan ini disesuaikan dengan ruang lingkup pengujian GISLAB, termasuk pelumas, produk sawit, pupuk, minyak goreng sawit, minyak makan merah, serta produk teknis lainnya.",
    whyTitle: "Mengapa pengujian mutu produk & bahan penting?",
    why: "Mutu produk tidak cukup dinilai dari tampilan visual. Data laboratorium diperlukan untuk membuktikan parameter seperti kadar air, kadar kotoran, viskositas, titik nyala, titik tuang, kadar unsur, dan parameter teknis lain yang dipersyaratkan dalam standar. Hasil pengujian membantu perusahaan mengendalikan kualitas dan mengurangi risiko ketidaksesuaian produk.",
    items: [
      "Pengujian minyak lumas dan pelumas, seperti viskositas kinematik, flash point, pour point, copper test, total base number, density, dan parameter unsur tertentu.",
      "Pengujian produk sawit dan turunannya, seperti Crude Palm Oil, Palm Kernel, RBD Palm Olein, minyak goreng sawit, dan minyak makan merah.",
      "Pengujian pupuk, seperti NPK, Urea, KCl, Fosfat Alam, ZA, TSP, SP36, Borat, dan Kieserit sesuai parameter yang tersedia dalam ruang lingkup.",
    ],
    consult:
      "Tim GISLAB dapat membantu pelanggan menentukan parameter uji yang relevan berdasarkan jenis produk, standar acuan, dan kebutuhan dokumen teknis. Dengan begitu, pengujian tidak dilakukan secara asal, tetapi mengikuti ruang lingkup dan kebutuhan aktual produk.",
    commitment:
      "GISLAB berkomitmen memberikan hasil uji yang akurat, terdokumentasi, dan selaras dengan ruang lingkup pengujian yang tersedia, sehingga pelanggan memperoleh dasar teknis yang dapat dipertanggungjawabkan.",
  },
  environment: {
    title: "Pengujian Air & Lingkungan",
    cover:
      "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=1200",
    alt: "Pengujian air dan lingkungan di laboratorium",
    intro:
      "Pengujian air dan lingkungan dilakukan untuk memantau kualitas air, air limbah, air bersih, air minum, air mineral, serta sumber air alami. Layanan ini membantu pelanggan memahami kondisi sampel berdasarkan parameter fisika dan kimia yang tercantum dalam ruang lingkup pengujian GISLAB.",
    whyTitle: "Mengapa pengujian air & lingkungan penting?",
    why: "Kualitas air dan air limbah berpengaruh terhadap kepatuhan regulasi, keamanan penggunaan, dan pengendalian dampak lingkungan. Pengujian laboratorium memberikan data objektif untuk mengetahui kondisi parameter seperti pH, suhu, TDS, TSS, COD, sulfat, klorida, nitrit, amoniak, logam terlarut, minyak dan lemak, serta parameter lain sesuai ruang lingkup.",
    items: [
      "Pengujian air sungai, air danau, air muara, air rawa, air akuifer, air situ, air mata air, air waduk, dan air sumur.",
      "Pengujian air bersih, air limbah, air minum, air mineral, dan air demineral berdasarkan parameter yang tersedia.",
      "Pengambilan contoh uji air untuk kebutuhan pengujian fisika dan kimia sesuai metode yang tercantum dalam ruang lingkup.",
    ],
    consult:
      "GISLAB dapat membantu memilih parameter pengujian sesuai jenis sampel air dan tujuan pengujian, baik untuk pemantauan kualitas, evaluasi internal, maupun kebutuhan dokumen teknis.",
    commitment:
      "Kami menjaga ketelitian proses pengujian, keterlacakan data, dan kejelasan hasil agar pelanggan dapat mengambil keputusan berdasarkan data laboratorium yang dapat dipercaya.",
  },
  permit: {
    title: "Pengujian Udara Ambient & Emisi",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200",
    alt: "Pengujian udara ambient dan emisi",
    intro:
      "Pengujian udara ambient dan emisi membantu pelanggan memantau kualitas udara serta emisi dari sumber tidak bergerak. Layanan ini mengacu pada parameter yang tersedia dalam ruang lingkup GISLAB, termasuk gas, partikulat, kebisingan, dan pengambilan contoh uji udara.",
    whyTitle: "Mengapa pengujian udara & emisi penting?",
    why: "Pemantauan kualitas udara dan emisi diperlukan untuk mengetahui potensi pencemaran, mengevaluasi kinerja pengendalian emisi, serta mendukung kepatuhan terhadap persyaratan lingkungan. Hasil uji menjadi dasar teknis untuk pelaporan, evaluasi, dan tindakan korektif.",
    items: [
      "Pengujian udara ambient, seperti SO₂, NO₂, NH₃, TSP, PM10, PM2.5, ozon, timbal, dan kebisingan.",
      "Pengujian emisi sumber tidak bergerak, seperti opasitas, NO₂, SO₂, H₂S, NO, O₂, CO₂, CO, methane, kecepatan linier, kadar air, dan partikulat.",
      "Pengambilan contoh uji udara ambient dan udara emisi sumber tidak bergerak sesuai metode dalam ruang lingkup.",
    ],
    consult:
      "Tim GISLAB dapat membantu menentukan titik, parameter, dan kebutuhan pengujian udara sesuai tujuan pemantauan dan jenis sumber emisi.",
    commitment:
      "GISLAB berkomitmen memberikan layanan pengujian udara dan emisi yang objektif, tertata, dan terdokumentasi untuk mendukung pengelolaan lingkungan pelanggan.",
  },
  sni: {
    title: "Pengujian SNI Produk",
    cover:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    alt: "Pengujian SNI produk di laboratorium",
    intro:
      "Pengujian SNI produk membantu memastikan produk memenuhi persyaratan Standar Nasional Indonesia yang relevan. Layanan ini disesuaikan dengan ruang lingkup GISLAB, seperti minyak lumas, air mineral, air demineral, pupuk, minyak goreng sawit, minyak makan merah, serta alat sprayer.",
    whyTitle: "Mengapa pengujian SNI produk penting?",
    why: "Pengujian SNI memberikan bukti objektif bahwa produk telah diperiksa berdasarkan metode dan parameter yang dipersyaratkan. Data ini penting untuk pengendalian mutu, evaluasi kesesuaian, proses sertifikasi, dan peningkatan kepercayaan pelanggan.",
    items: [
      "Pengujian produk berbasis SNI untuk minyak lumas, pupuk, minyak goreng sawit, minyak makan merah, air mineral, air demineral, dan produk lain sesuai ruang lingkup.",
      "Pengujian alat pemeliharaan tanaman seperti sprayer gendong elektrik berdasarkan parameter dimensi, spesifikasi, dan verifikasi yang tercantum dalam ruang lingkup.",
      "Penyediaan data hasil uji sebagai dasar evaluasi mutu, kesesuaian produk, dan kebutuhan dokumen teknis pelanggan.",
    ],
    consult:
      "GISLAB dapat membantu mengidentifikasi standar dan parameter yang sesuai dengan produk pelanggan, sehingga pengujian lebih tepat sasaran dan sesuai ruang lingkup yang tersedia.",
    commitment:
      "Kami menjaga objektivitas hasil uji, ketepatan metode, dan dokumentasi proses untuk mendukung kesesuaian produk terhadap standar yang berlaku.",
  },
};

const serviceDetailsEn = {
  quality: {
    title: "Product & Material Quality Testing",
    cover:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
    alt: "Product and material quality testing in laboratory",
    intro:
      "Product and material quality testing helps companies ensure that product characteristics comply with standards, technical specifications, and customer requirements. This service follows the GISLAB testing scope, including lubricants, palm oil products, fertilizers, palm cooking oil, red palm cooking oil, and other technical products.",
    whyTitle: "Why is product and material quality testing important?",
    why: "Product quality cannot be assessed from visual appearance alone. Laboratory data is required to verify parameters such as moisture content, impurities, viscosity, flash point, pour point, elemental content, and other technical parameters required by standards. Test results help companies control quality and reduce the risk of product nonconformity.",
    items: [
      "Testing of lubricating oil and lubricants, such as kinematic viscosity, flash point, pour point, copper test, total base number, density, and selected elemental parameters.",
      "Testing of palm oil products and derivatives, such as Crude Palm Oil, Palm Kernel, RBD Palm Olein, palm cooking oil, and red palm cooking oil.",
      "Testing of fertilizers, such as NPK, Urea, KCl, Natural Phosphate, ZA, TSP, SP36, Borate, and Kieserite according to available scope parameters.",
    ],
    consult:
      "The GISLAB team can help customers determine relevant test parameters based on product type, reference standards, and technical document needs. This ensures that testing is aligned with the actual scope and requirements of the product.",
    commitment:
      "GISLAB is committed to providing accurate, documented, and scope-aligned test results, giving customers a reliable technical basis for decision-making.",
  },

  environment: {
    title: "Water & Environmental Testing",
    cover:
      "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=1200",
    alt: "Water and environmental testing in laboratory",
    intro:
      "Water and environmental testing is performed to monitor the quality of water, wastewater, clean water, drinking water, mineral water, and natural water sources. This service helps customers understand sample conditions based on physical and chemical parameters listed in the GISLAB testing scope.",
    whyTitle: "Why is water and environmental testing important?",
    why: "Water and wastewater quality affects regulatory compliance, user safety, and environmental impact control. Laboratory testing provides objective data to evaluate parameters such as pH, temperature, TDS, TSS, COD, sulfate, chloride, nitrite, ammonia, dissolved metals, oil and grease, and other parameters according to the testing scope.",
    items: [
      "Testing of river water, lake water, estuary water, swamp water, aquifer water, spring water, reservoir water, and well water.",
      "Testing of clean water, wastewater, drinking water, mineral water, and demineralized water based on available parameters.",
      "Water sampling for physical and chemical testing according to methods listed in the testing scope.",
    ],
    consult:
      "GISLAB can assist in selecting appropriate testing parameters based on sample type and testing objectives, whether for quality monitoring, internal evaluation, or technical documentation needs.",
    commitment:
      "We maintain testing accuracy, data traceability, and clear reporting so customers can make decisions based on reliable laboratory data.",
  },

  permit: {
    title: "Ambient Air & Emission Testing",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200",
    alt: "Ambient air and emission testing",
    intro:
      "Ambient air and emission testing helps customers monitor air quality and emissions from stationary sources. This service refers to parameters available within the GISLAB scope, including gases, particulates, noise, and air sampling activities.",
    whyTitle: "Why is air and emission testing important?",
    why: "Air quality and emission monitoring is required to identify potential pollution, evaluate emission control performance, and support compliance with environmental requirements. Test results serve as a technical basis for reporting, evaluation, and corrective action.",
    items: [
      "Ambient air testing, including SO₂, NO₂, NH₃, TSP, PM10, PM2.5, ozone, lead, and noise.",
      "Stationary source emission testing, including opacity, NO₂, SO₂, H₂S, NO, O₂, CO₂, CO, methane, linear velocity, moisture content, and particulates.",
      "Ambient air and stationary source emission sampling according to methods listed in the testing scope.",
    ],
    consult:
      "The GISLAB team can assist in determining sampling points, parameters, and air testing requirements based on monitoring objectives and emission source types.",
    commitment:
      "GISLAB is committed to providing objective, structured, and documented air and emission testing services to support customers’ environmental management.",
  },

  sni: {
    title: "SNI Product Testing",
    cover:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    alt: "SNI product testing in laboratory",
    intro:
      "SNI product testing helps ensure that products meet the relevant Indonesian National Standard requirements. This service follows the GISLAB testing scope, such as lubricating oil, mineral water, demineralized water, fertilizers, palm cooking oil, red palm cooking oil, and sprayer equipment.",
    whyTitle: "Why is SNI product testing important?",
    why: "SNI testing provides objective evidence that a product has been examined based on required methods and parameters. This data is important for quality control, conformity evaluation, certification processes, and increasing customer trust.",
    items: [
      "SNI-based product testing for lubricating oil, fertilizers, palm cooking oil, red palm cooking oil, mineral water, demineralized water, and other products according to the testing scope.",
      "Testing of agricultural sprayer equipment based on dimensional parameters, specifications, and verification requirements listed in the scope.",
      "Provision of test result data as a basis for quality evaluation, product conformity, and customer technical documentation needs.",
    ],
    consult:
      "GISLAB can help identify suitable standards and parameters for customer products, making testing more accurate, targeted, and aligned with the available scope.",
    commitment:
      "We maintain test result objectivity, method accuracy, and process documentation to support product conformity with applicable standards.",
  },
};

type ServiceKey = keyof typeof serviceDetails;

function ensureLandingHeadAssets() {
  const headLinks = [
    {
      id: "landing-font-awesome",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
    {
      id: "landing-material-symbols",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ];

  headLinks.forEach(({ id, href }) => {
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });
}

function bindNavbar() {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  const updateNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    document.querySelectorAll(".reveal").forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight - 100) {
        element.classList.add("active");
      }
    });
  };

  const toggleMenu = () => navMenu?.classList.toggle("active");
  window.addEventListener("scroll", updateNavbar);
  mobileMenuBtn?.addEventListener("click", toggleMenu);
  updateNavbar();

  return () => {
    window.removeEventListener("scroll", updateNavbar);
    mobileMenuBtn?.removeEventListener("click", toggleMenu);
  };
}

function bindHomeTyping() {
  const title1El = document.getElementById("type-title-1");
  const title2El = document.getElementById("type-title-2");
  const subEl = document.getElementById("type-sub");

  if (!title1El || !title2El || !subEl) return () => undefined;

  const isEnglish =
    window.location.pathname === "/en" ||
    window.location.pathname.startsWith("/en/");

  const typeData = isEnglish
    ? [
        {
          title1: "Global Inspeksi Sistem ",
          title2: "Testing Laboratory",
          sub: "Our laboratory provides accurate and reliable testing services supported by experienced experts and modern equipment.",
        },
        {
          title1: "Trusted Product ",
          title2: "Quality Testing",
          sub: "Global Inspeksi Sistem Laboratory is a reliable partner for product quality testing and technical compliance needs.",
        },
      ]
    : [
        {
          title1: "Laboratorium Pengujian ",
          title2: "Global Inspeksi Sistem",
          sub: "Laboratorium kami menyediakan layanan pengujian yang akurat, terpercaya, dan didukung oleh tenaga ahli berpengalaman serta peralatan modern.",
        },
        {
          title1: "Pengujian Mutu ",
          title2: "Barang Terpercaya",
          sub: "Laboratorium Global Inspeksi Sistem adalah mitra yang andal dalam melakukan pengujian mutu barang.",
        },
      ];

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let typeIndex = 0;
  let isDeleting = false;
  let charIndexTitle1 = 0;
  let charIndexTitle2 = 0;
  let charIndexSub = 0;

  const typeEffect = () => {
    const currentData = typeData[typeIndex];
    let typingSpeed = 40;

    if (!isDeleting) {
      if (charIndexTitle1 < currentData.title1.length) {
        title1El.textContent += currentData.title1.charAt(charIndexTitle1);
        charIndexTitle1 += 1;
      } else if (charIndexTitle2 < currentData.title2.length) {
        title2El.textContent += currentData.title2.charAt(charIndexTitle2);
        charIndexTitle2 += 1;
      } else if (charIndexSub < currentData.sub.length) {
        subEl.textContent += currentData.sub.charAt(charIndexSub);
        charIndexSub += 1;
        typingSpeed = 20;
      } else {
        typingSpeed = 6000;
        isDeleting = true;
      }
    } else if (charIndexSub > 0) {
      subEl.textContent = currentData.sub.substring(0, charIndexSub - 1);
      charIndexSub -= 1;
      typingSpeed = 10;
    } else if (charIndexTitle2 > 0) {
      title2El.textContent = currentData.title2.substring(
        0,
        charIndexTitle2 - 1,
      );
      charIndexTitle2 -= 1;
      typingSpeed = 15;
    } else if (charIndexTitle1 > 0) {
      title1El.textContent = currentData.title1.substring(
        0,
        charIndexTitle1 - 1,
      );
      charIndexTitle1 -= 1;
      typingSpeed = 15;
    } else {
      isDeleting = false;
      typeIndex = (typeIndex + 1) % typeData.length;
      typingSpeed = 500;
    }

    timeoutId = setTimeout(typeEffect, typingSpeed);
  };

  timeoutId = setTimeout(typeEffect, 1000);

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
}

function bindServiceDetails() {
  const detailSection = document.getElementById("detail-layanan");
  const detailCover = document.getElementById(
    "detailCover",
  ) as HTMLImageElement | null;
  if (!detailSection || !detailCover) return () => undefined;

  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const renderServiceDetail = (key: ServiceKey) => {
    const isEnglish =
      window.location.pathname === "/en" ||
      window.location.pathname.startsWith("/en/");
    const activeServiceDetails = isEnglish ? serviceDetailsEn : serviceDetails;
    const detail = activeServiceDetails[key] ?? activeServiceDetails.quality;
    detailCover.src = detail.cover;
    detailCover.alt = detail.alt;

    const setText = (id: string, value: string) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };

    setText("detailTitle", detail.title);
    setText("detailIntro", detail.intro);
    setText("detailWhyTitle", detail.whyTitle);
    setText("detailWhy", detail.why);
    setText("detailConsult", detail.consult);
    setText("detailCommitment", detail.commitment);

    const detailList = document.getElementById("detailList");
    if (detailList) {
      detailList.innerHTML = detail.items
        .map(
          (item) =>
            `<li><i class="fa-solid fa-check"></i><span>${escapeHtml(item)}</span></li>`,
        )
        .join("");
    }

    document
      .querySelectorAll<HTMLElement>("[data-service-detail]")
      .forEach((element) => {
        element.classList.toggle(
          "active-service",
          element.dataset.serviceDetail === key,
        );
      });

    detailSection.classList.add("active");
    window.history.replaceState(null, "", "#detail-layanan");
    detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement | null;
    const trigger = target?.closest<HTMLElement>("[data-service-detail]");
    if (!trigger) return;

    event.preventDefault();
    event.stopPropagation();
    renderServiceDetail(
      (trigger.dataset.serviceDetail ?? "quality") as ServiceKey,
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const target = event.target as HTMLElement | null;
    const trigger = target?.closest<HTMLElement>(
      '[role="button"][data-service-detail]',
    );
    if (!trigger) return;

    event.preventDefault();
    renderServiceDetail(
      (trigger.dataset.serviceDetail ?? "quality") as ServiceKey,
    );
  };

  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeyDown);

  if (window.location.hash === "#detail-layanan") {
    renderServiceDetail("quality");
  }

  return () => {
    document.removeEventListener("click", handleClick);
    document.removeEventListener("keydown", handleKeyDown);
  };
}

function bindProfileTabs() {
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-policy-tab]"),
  );
  const panels = Array.from(
    document.querySelectorAll<HTMLElement>(".policy-tab-panel"),
  );
  if (buttons.length === 0) return () => undefined;

  const handlers = buttons.map((button) => {
    const handler = () => {
      const targetId = button.dataset.policyTab;
      buttons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });
      panels.forEach((panel) =>
        panel.classList.toggle("active", panel.id === targetId),
      );
    };
    button.addEventListener("click", handler);
    return { button, handler };
  });

  return () => {
    handlers.forEach(({ button, handler }) =>
      button.removeEventListener("click", handler),
    );
  };
}

function injectProfilePolicyPortraits() {
  const panelIds = ["planning-tab", "research-tab"];
  const portraitSrc = "/landing/profile/vera-marini.png";

  panelIds.forEach((id) => {
    const panel = document.getElementById(id);
    const content = panel?.firstElementChild;
    if (
      !panel ||
      !content ||
      content.classList.contains("policy-with-portrait")
    )
      return;

    content.classList.add("policy-with-portrait");
    content.classList.remove("max-w-4xl");

    const copyColumn = document.createElement("div");
    copyColumn.className = "policy-copy-column";
    Array.from(content.childNodes).forEach((child) =>
      copyColumn.appendChild(child),
    );

    const portrait = document.createElement("figure");
    portrait.className = "policy-portrait";
    portrait.innerHTML = `<img src="${portraitSrc}" alt="Vera Marini, Director PT Global Inspeksi Sistem" loading="lazy">`;

    content.append(copyColumn, portrait);
  });

  return () => undefined;
}

function bindWhatsapp() {
  const toggleWhatsapp = document.getElementById("toggleWhatsapp");
  const closeWhatsapp = document.getElementById("closeWhatsapp");
  const whatsappWindow = document.getElementById("whatsappWindow");

  const toggleContact = () => {
    whatsappWindow?.classList.toggle("active");
    toggleWhatsapp?.classList.toggle("active");
  };

  const closeContact = () => {
    whatsappWindow?.classList.remove("active");
    toggleWhatsapp?.classList.remove("active");
  };

  toggleWhatsapp?.addEventListener("click", toggleContact);
  closeWhatsapp?.addEventListener("click", closeContact);

  return () => {
    toggleWhatsapp?.removeEventListener("click", toggleContact);
    closeWhatsapp?.removeEventListener("click", closeContact);
  };
}

function bindContactForm() {
  const form = document.getElementById("contactForm") as HTMLFormElement | null;
  if (!form) return () => undefined;

  const handler = (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = encodeURIComponent(String(formData.get("name") ?? "").trim());
    const email = encodeURIComponent(
      String(formData.get("email") ?? "").trim(),
    );
    const subject = encodeURIComponent(
      String(formData.get("subject") ?? "").trim() ||
        "Kebutuhan pengujian GIS Laboratorium",
    );
    const message = encodeURIComponent(
      String(formData.get("message") ?? "").trim(),
    );
    const body = `Nama:%20${name}%0AEmail:%20${email}%0A%0APesan:%0A${message}`;

    document.getElementById("formMessage")?.classList.add("active");
    window.location.href = `mailto:globalinspeksisistem@gmail.com?subject=${subject}&body=${body}`;
  };

  form.addEventListener("submit", handler);
  return () => form.removeEventListener("submit", handler);
}

function bindLanguageSwitcher() {
  const languageSwitch = document.getElementById(
    "languageSwitch",
  ) as HTMLAnchorElement | null;
  if (!languageSwitch) return () => undefined;

  const pathname = window.location.pathname;
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const targetPath = isEnglish
    ? pathname.replace(/^\/en/, "") || "/"
    : pathname === "/"
      ? "/en"
      : `/en${pathname}`;

  const label = isEnglish ? "ID" : "EN";
  const title = isEnglish ? "Ganti ke Bahasa Indonesia" : "Switch to English";

  languageSwitch.href = `${targetPath}${window.location.search}${window.location.hash}`;
  languageSwitch.title = title;
  languageSwitch.setAttribute("aria-label", title);

  const text = languageSwitch.querySelector("span");
  if (text) text.textContent = label;

  return () => undefined;
}

export function LandingHtmlPage({ page }: { page: LandingStaticPage }) {
  useEffect(() => {
    ensureLandingHeadAssets();

    const cleanups = [
      bindNavbar(),
      bindHomeTyping(),
      bindServiceDetails(),
      bindProfileTabs(),
      injectProfilePolicyPortraits(),
      bindWhatsapp(),
      bindContactForm(),
      bindLanguageSwitcher(),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [page.key]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LANDING_RUNTIME_CSS }} />
      <style dangerouslySetInnerHTML={{ __html: page.styles }} />
      <style dangerouslySetInnerHTML={{ __html: LANDING_HERO_OVERRIDE_CSS }} />
      <style dangerouslySetInnerHTML={{ __html: LANDING_PROFILE_POLICY_CSS }} />
      <div
        className={["landing-html", page.bodyClass].filter(Boolean).join(" ")}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </>
  );
}
