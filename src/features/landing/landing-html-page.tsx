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
    title: "Pengujian Kualitas Tanah & Sedimen",
    cover:
      "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=1200",
    alt: "Pengujian kualitas tanah dan sedimen di laboratorium",
    intro:
      "Kualitas tanah dan sedimen yang baik sangat penting untuk menjaga kesehatan ekosistem, aktivitas industri, pertanian, dan sumber daya air. GISLAB menyediakan layanan pengujian komprehensif untuk membantu mendeteksi kontaminan berbahaya serta memastikan hasil analisis dapat digunakan sebagai dasar pengambilan keputusan.",
    whyTitle: "Mengapa pengujian kualitas tanah & sedimen penting?",
    why:
      "Tanah atau sedimen yang terkontaminasi dapat memengaruhi produktivitas lahan, kualitas air tanah, keamanan produk, dan kesehatan ekosistem secara keseluruhan. Pengujian menjadi langkah penting untuk memantau kondisi lingkungan, mengelola risiko kontaminasi, dan memastikan kepatuhan terhadap standar yang berlaku.",
    items: [
      "Pengujian tanah untuk mendeteksi logam berat, pestisida, dan senyawa organik berbahaya.",
      "Pengujian sedimen dari sungai, danau, area pesisir, atau area industri untuk mengetahui kadar kontaminan.",
      "Analisis kesuburan tanah untuk mendukung pengelolaan lahan yang lebih efektif dan berkelanjutan.",
    ],
    consult:
      "Selain pengujian, GISLAB membantu perusahaan dan instansi memahami hasil analisis melalui konsultasi teknis. Tim kami dapat membantu menentukan parameter uji, menyusun rencana pemantauan, dan memberikan rekomendasi awal untuk pengelolaan kualitas lingkungan atau produk.",
    commitment:
      "GISLAB berkomitmen memberikan hasil yang akurat, layanan yang responsif, dan proses yang terdokumentasi. Kami hadir sebagai mitra pengujian profesional untuk mendukung mutu produk, kepatuhan regulasi, perlindungan lingkungan, dan kepercayaan pelanggan.",
  },
  environment: {
    title: "Pengujian Lingkungan",
    cover:
      "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=1200",
    alt: "Pengujian sampel lingkungan di laboratorium modern",
    intro:
      "Pengujian lingkungan membantu perusahaan memahami kondisi air, limbah, tanah, sedimen, dan parameter lingkungan lain yang berpengaruh terhadap kepatuhan serta keberlanjutan operasional.",
    whyTitle: "Mengapa pengujian lingkungan penting?",
    why:
      "Data lingkungan yang akurat membantu mencegah pencemaran, memantau dampak kegiatan industri, dan memastikan aktivitas bisnis berjalan sesuai standar yang berlaku. Hasil pengujian juga menjadi dasar tindakan korektif dan pelaporan.",
    items: [
      "Pengujian air dan air limbah untuk memantau parameter fisika, kimia, dan mikrobiologi.",
      "Pengujian tanah dan sedimen untuk mendeteksi kontaminan yang berpotensi mengganggu ekosistem.",
      "Pemantauan kualitas lingkungan berkala untuk mendukung dokumen kepatuhan dan evaluasi internal.",
    ],
    consult:
      "Tim GISLAB dapat membantu memilih parameter pengujian yang relevan, membaca tren hasil, dan menyusun rekomendasi teknis untuk pengelolaan kualitas lingkungan yang lebih terukur.",
    commitment:
      "Kami mengutamakan ketelitian, keterlacakan data, dan komunikasi hasil yang jelas agar setiap pelanggan dapat mengambil keputusan berbasis analisis yang dapat dipertanggungjawabkan.",
  },
  permit: {
    title: "Pengujian Produk dan Izin Edar",
    cover:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
    alt: "Pengujian produk untuk kebutuhan izin edar",
    intro:
      "Pengujian produk dan izin edar membantu memastikan produk memenuhi parameter mutu, keamanan, dan persyaratan teknis sebelum masuk ke pasar atau digunakan secara luas.",
    whyTitle: "Mengapa pengujian izin edar penting?",
    why:
      "Produk yang tidak memenuhi standar dapat menimbulkan risiko terhadap konsumen, proses distribusi, dan reputasi perusahaan. Pengujian menjadi bukti teknis untuk mendukung kelayakan produk dan proses administrasi izin edar.",
    items: [
      "Verifikasi parameter mutu produk sesuai kebutuhan regulasi atau spesifikasi pelanggan.",
      "Pengujian keamanan untuk mendukung dokumen teknis dan kelengkapan izin edar.",
      "Penyusunan hasil analisis yang jelas agar mudah digunakan dalam proses evaluasi dan pengambilan keputusan.",
    ],
    consult:
      "GISLAB membantu pelanggan menentukan paket pengujian yang relevan dengan jenis produk, kebutuhan pasar, dan dokumen pendukung yang dibutuhkan.",
    commitment:
      "Kami menjaga objektivitas hasil pengujian dan memberikan layanan yang transparan untuk mendukung proses izin edar yang lebih tertata.",
  },
  sni: {
    title: "Pengujian SNI Produk",
    cover:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    alt: "Pengujian SNI produk di laboratorium",
    intro:
      "Pengujian SNI produk membantu memastikan produk memenuhi Standar Nasional Indonesia, baik untuk kebutuhan sertifikasi, evaluasi mutu, maupun pemenuhan persyaratan pelanggan.",
    whyTitle: "Mengapa pengujian SNI produk penting?",
    why:
      "Kesesuaian terhadap SNI meningkatkan kepercayaan pasar, membantu proses sertifikasi, dan memastikan produk memiliki mutu serta keamanan yang sesuai standar. Pengujian juga menjadi bukti objektif dalam pengendalian kualitas.",
    items: [
      "Pengujian karakteristik produk berdasarkan parameter SNI yang relevan.",
      "Dukungan data laboratorium untuk proses sertifikasi dan evaluasi mutu.",
      "Analisis hasil uji untuk membantu produsen memahami kesesuaian produk terhadap standar.",
    ],
    consult:
      "Tim GISLAB dapat membantu mengidentifikasi standar yang sesuai dengan kategori produk dan menyarankan parameter uji yang dibutuhkan.",
    commitment:
      "Kami berkomitmen menghadirkan layanan pengujian yang akurat, profesional, dan terdokumentasi untuk mendukung daya saing produk pelanggan.",
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
      title2El.textContent = currentData.title2.substring(0, charIndexTitle2 - 1);
      charIndexTitle2 -= 1;
      typingSpeed = 15;
    } else if (charIndexTitle1 > 0) {
      title1El.textContent = currentData.title1.substring(0, charIndexTitle1 - 1);
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
  const detailCover = document.getElementById("detailCover") as HTMLImageElement | null;
  if (!detailSection || !detailCover) return () => undefined;

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
        .map((item) => `<li><i class="fa-solid fa-check"></i><span>${item}</span></li>`)
        .join("");
    }

    detailSection.classList.add("active");
    window.history.replaceState(null, "", "#detail-layanan");
    detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buttons = Array.from(document.querySelectorAll<HTMLElement>("[data-service-detail]"));
  const handlers = buttons.map((button) => {
    const handler = () => renderServiceDetail((button.dataset.serviceDetail ?? "quality") as ServiceKey);
    button.addEventListener("click", handler);
    return { button, handler };
  });

  return () => {
    handlers.forEach(({ button, handler }) => button.removeEventListener("click", handler));
  };
}

function bindProfileTabs() {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-policy-tab]"));
  const panels = Array.from(document.querySelectorAll<HTMLElement>(".policy-tab-panel"));
  if (buttons.length === 0) return () => undefined;

  const handlers = buttons.map((button) => {
    const handler = () => {
      const targetId = button.dataset.policyTab;
      buttons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });
      panels.forEach((panel) => panel.classList.toggle("active", panel.id === targetId));
    };
    button.addEventListener("click", handler);
    return { button, handler };
  });

  return () => {
    handlers.forEach(({ button, handler }) => button.removeEventListener("click", handler));
  };
}

function injectProfilePolicyPortraits() {
  const panelIds = ["planning-tab", "research-tab"];
  const portraitSrc = "/landing/profile/vera-marini.png";

  panelIds.forEach((id) => {
    const panel = document.getElementById(id);
    const content = panel?.firstElementChild;
    if (!panel || !content || content.classList.contains("policy-with-portrait")) return;

    content.classList.add("policy-with-portrait");
    content.classList.remove("max-w-4xl");

    const copyColumn = document.createElement("div");
    copyColumn.className = "policy-copy-column";
    Array.from(content.childNodes).forEach((child) => copyColumn.appendChild(child));

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
    const email = encodeURIComponent(String(formData.get("email") ?? "").trim());
    const subject = encodeURIComponent(
      String(formData.get("subject") ?? "").trim() || "Kebutuhan pengujian GIS Laboratorium",
    );
    const message = encodeURIComponent(String(formData.get("message") ?? "").trim());
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
