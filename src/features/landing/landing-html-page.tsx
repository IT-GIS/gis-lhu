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
      padding: 10px 14px !important;
    }

    .landing-html .nav-brand {
      min-width: 0 !important;
      gap: 8px !important;
      font-size: 0.88rem !important;
    }

    .landing-html .nav-brand img {
      width: 32px !important;
      height: auto !important;
      margin-right: 0 !important;
      transform: none !important;
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

  const typeData = [
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
    const detail = serviceDetails[key] ?? serviceDetails.quality;
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
  const toggleWa = document.getElementById("toggle-wa");
  const closeWa = document.getElementById("close-wa");
  const waWindow = document.getElementById("whatsapp-window");
  const toggleWhatsapp = document.getElementById("toggleWhatsapp");
  const closeWhatsapp = document.getElementById("closeWhatsapp");
  const whatsappWindow = document.getElementById("whatsappWindow");

  const toggleLegacy = () => waWindow?.classList.toggle("hidden");
  const closeLegacy = () => waWindow?.classList.add("hidden");
  const toggleContact = () => whatsappWindow?.classList.toggle("active");
  const closeContact = () => whatsappWindow?.classList.remove("active");

  toggleWa?.addEventListener("click", toggleLegacy);
  closeWa?.addEventListener("click", closeLegacy);
  toggleWhatsapp?.addEventListener("click", toggleContact);
  closeWhatsapp?.addEventListener("click", closeContact);

  return () => {
    toggleWa?.removeEventListener("click", toggleLegacy);
    closeWa?.removeEventListener("click", closeLegacy);
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
