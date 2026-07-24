"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/features/landing/language-switcher";

const whatsappNumber = "6281285328232";
const email = "globalinspeksisistem@gmail.com";

const processSteps = [
  {
    title: "Pengajuan Keluhan / Banding",
    icon: "fa-file-pen",
  },
  {
    title: "Penerimaan & Registrasi",
    icon: "fa-clipboard-check",
  },
  {
    title: "Tinjau Awal",
    icon: "fa-magnifying-glass",
  },
  {
    title: "Pembentukan Tim Penanganan",
    icon: "fa-users-gear",
  },
  {
    title: "Verifikasi & Investigasi",
    icon: "fa-magnifying-glass-chart",
  },
  {
    title: "Keputusan Penanganan",
    icon: "fa-scale-balanced",
  },
  {
    title: "Penyampaian Hasil",
    icon: "fa-envelope-open-text",
  },
];

const COMPLAINTS_APPEALS_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

  :root {
    --primary: #0A2540;
    --secondary: #0070F3;
    --accent: #00DFD8;
    --white: #FFFFFF;
    --text-dark: #1E293B;
    --text-muted: #64748B;
    --light-blue: #EBF4F8;
    --glass-dark-bg: rgba(10, 37, 64, 0.46);
    --glass-dark-border: rgba(255, 255, 255, 0.16);
    --shadow-soft: 0 18px 50px rgba(15, 23, 42, 0.08);
    --shadow-hover: 0 24px 55px rgba(0, 112, 243, 0.16);
    --radius-pill: 999px;
    --radius-lg: 34px;
    --font-main: 'Plus Jakarta Sans', sans-serif;
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

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

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .complaints-page {
    min-height: 100vh;
    font-family: var(--font-main);
    color: var(--primary);
    background:
      radial-gradient(circle at 88% 8%, rgba(0, 223, 216, 0.15), transparent 26%),
      radial-gradient(circle at 8% 88%, rgba(0, 112, 243, 0.12), transparent 30%),
      #f8fcff;
    overflow-x: hidden;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
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
    z-index: 1000;
    display: flex;
    width: 100%;
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
    color: var(--primary);
    font-size: 1.12rem;
    font-weight: 900;
    white-space: nowrap;
  }

  .nav-logo {
    height: 32px;
    width: auto;
    transform: scale(1.65);
    transform-origin: left center;
    margin-right: 30px;
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-menu > li {
    display: flex;
    align-items: center;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 38px;
    padding: 8px 14px;
    border-radius: var(--radius-pill);
    color: var(--text-muted);
    font-size: 0.93rem;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    transition: var(--transition);
    cursor: pointer;
  }

  .nav-link:hover {
    color: var(--primary);
    background: rgba(0, 112, 243, 0.07);
  }

  .nav-link.active {
    color: var(--secondary);
    background: rgba(0, 223, 216, 0.16);
  }

  .nav-dropdown {
    position: relative;
    display: flex;
    align-items: center;
  }

  .nav-dropdown details {
    position: relative;
    display: flex;
    align-items: center;
  }

  .nav-dropdown summary {
    list-style: none;
  }

  .nav-dropdown summary::-webkit-details-marker {
    display: none;
  }

  .nav-dropdown-trigger i {
    font-size: 0.72rem;
    transition: transform 0.25s ease;
  }

  .nav-dropdown details[open] .nav-dropdown-trigger i {
    transform: rotate(180deg);
  }

  .nav-dropdown-menu {
    position: absolute;
    top: calc(100% + 14px);
    right: 0;
    z-index: 1200;
    min-width: 288px;
    padding: 14px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.82);
    box-shadow: 0 24px 60px rgba(10, 37, 64, 0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .nav-dropdown-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    width: 100%;
    padding: 14px 16px;
    border-radius: 16px;
    color: var(--primary);
    font-size: 0.94rem;
    font-weight: 900;
    transition: var(--transition);
  }

  .nav-dropdown-link:hover,
  .nav-dropdown-link.active {
    color: var(--secondary);
    background: rgba(0, 112, 243, 0.08);
  }

  .mobile-menu-btn {
    display: none;
    border: 0;
    background: transparent;
    color: var(--primary);
    font-size: 1.45rem;
    cursor: pointer;
  }

  .hero {
    position: relative;
    overflow: hidden;
    padding: 160px 0 88px;
  }

  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(248, 252, 255, 0.95), rgba(248, 252, 255, 0.76)),
      url("https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1800") center/cover;
    z-index: 0;
  }

  .hero::after {
    content: "";
    position: absolute;
    right: -140px;
    top: 80px;
    width: 420px;
    height: 420px;
    border-radius: 999px;
    background: rgba(0, 223, 216, 0.22);
    filter: blur(80px);
    z-index: 1;
  }

  .hero-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.78fr);
    gap: 40px;
    align-items: center;
  }

  .page-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border-radius: var(--radius-pill);
    background: rgba(0, 223, 216, 0.14);
    padding: 10px 22px;
    color: var(--secondary);
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .hero-title {
    margin: 26px 0 0;
    max-width: 780px;
    color: var(--primary);
    font-size: clamp(2.55rem, 5vw, 4.95rem);
    font-weight: 900;
    line-height: 1.04;
    letter-spacing: -0.055em;
  }

  .hero-desc {
    margin-top: 24px;
    max-width: 700px;
    color: #53677f;
    font-size: 1.08rem;
    font-weight: 700;
    line-height: 1.85;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 32px;
  }

  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border-radius: var(--radius-pill);
    padding: 15px 24px;
    font-weight: 900;
    transition: var(--transition);
  }

  .btn-primary {
    color: #ffffff;
    background: linear-gradient(135deg, var(--secondary), var(--accent));
    box-shadow: 0 18px 40px rgba(0, 112, 243, 0.24);
  }

  .btn-secondary {
    color: var(--primary);
    background: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(226, 232, 240, 0.94);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
  }

  .btn-primary:hover,
  .btn-secondary:hover {
    transform: translateY(-2px);
  }

  .hero-brand-only {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 390px;
  padding: 24px;
}

.hero-brand-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  width: 100%;
}

.hero-brand-logo {
  width: 150px;
  height: 150px;
  object-fit: contain;
  filter: drop-shadow(0 22px 36px rgba(10, 37, 64, 0.14));
}

.hero-brand-text h2 {
  margin: 0;
  color: var(--primary);
  font-size: clamp(2rem, 3.2vw, 3.25rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.045em;
}

.hero-brand-text p {
  margin: 10px 0 0;
  color: #405a70;
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  font-weight: 800;
  line-height: 1.35;
}


  .hero-card-logo strong {
    display: block;
    color: var(--primary);
    font-size: clamp(1.55rem, 2.6vw, 2.35rem);
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -0.035em;
  }

  .hero-card-logo span {
    display: block;
    margin-top: 8px;
    color: #405a70;
    font-size: clamp(1rem, 1.7vw, 1.28rem);
    font-weight: 800;
  }

  .procedure-section {
    padding: 78px 0 100px;
  }

  .procedure-heading {
    max-width: 840px;
    margin: 0 auto 34px;
    text-align: center;
  }

  .section-kicker {
    color: var(--secondary);
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .procedure-title {
    margin: 14px 0 0;
    color: var(--primary);
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -0.04em;
  }

  .procedure-panel {
    position: relative;
    overflow: visible;
    border-radius: 38px;
    border: 1px solid rgba(255, 255, 255, 0.84);
    background: rgba(255, 255, 255, 0.72);
    padding: clamp(22px, 3vw, 38px);
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .procedure-panel::before {
    display: none;
  }

.procedure-list {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: 32px;
}

  .procedure-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    max-width: min(100%, 520px);
    min-width: min(100%, 360px);
    min-height: 150px;
    padding: 26px 34px;
    border-radius: 30px;
    border: 1px solid rgba(226, 232, 240, 0.9);
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.055);
    transition: var(--transition);
  }

  .procedure-card:hover {
    transform: translateY(-3px);
    border-color: rgba(0, 112, 243, 0.24);
    box-shadow: var(--shadow-hover);
  }

.procedure-card:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  z-index: 5;

  width: 4px;
  height: 20px;
  border-radius: 999px;

  background: linear-gradient(180deg, var(--secondary), var(--accent));
  box-shadow: 0 10px 24px rgba(0, 112, 243, 0.18);
}

.procedure-card:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 50%;
  top: calc(100% + 20px);
  transform: translateX(-50%);
  z-index: 6;

  width: 0;
  height: 0;

  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-top: 14px solid var(--accent);
}

  .procedure-inline {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .procedure-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 62px;
    height: 62px;
    flex: 0 0 62px;
    border-radius: 22px;
    color: var(--secondary);
    background: linear-gradient(
      135deg,
      rgba(0, 223, 216, 0.16),
      rgba(0, 112, 243, 0.09)
    );
    font-size: 1.55rem;
  }

  .procedure-card-title {
    margin: 0;
    color: var(--primary);
    font-size: clamp(1.08rem, 2vw, 1.42rem);
    font-weight: 900;
    line-height: 1.35;
    letter-spacing: -0.02em;
    text-align: center;
    white-space: normal;
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
    margin: 0 0 24px;
    color: #ffffff;
    font-size: 1.18rem;
    font-weight: 900;
  }

  .footer-text {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    color: rgba(234, 246, 255, 0.82);
    font-weight: 650;
    line-height: 1.65;
  }

  .footer-text i {
    width: 20px;
    color: var(--accent);
    text-align: center;
  }

  .footer-link {
    display: block;
    width: fit-content;
    margin-bottom: 13px;
    color: rgba(234, 246, 255, 0.82);
    font-weight: 700;
    transition: var(--transition);
  }

  .footer-link:hover {
    color: var(--accent);
    transform: translateX(6px);
  }

  .footer-bottom {
    position: relative;
    z-index: 10;
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.68);
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
  }

  @media (max-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }

    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }

    .footer-brand {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 768px) {
    .navbar-wrapper {
      padding: 0 16px;
    }

    .navbar {
      padding: 10px 14px;
    }

    .nav-brand {
      min-width: 0;
      gap: 8px;
      font-size: 0.88rem;
    }

    .nav-logo {
      width: 34px;
      height: auto;
      margin-right: 0;
      transform: none;
    }

    .mobile-menu-btn {
      display: block;
    }

    .nav-menu {
      position: absolute;
      top: 100%;
      left: 16px;
      right: 16px;
      display: none;
      flex-direction: column;
      align-items: stretch;
      margin-top: 12px;
      padding: 18px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.96);
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.14);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
    }

    .nav-menu.open {
      display: flex;
    }

    .nav-menu > li,
    .nav-dropdown,
    .nav-dropdown details {
      width: 100%;
    }

    .nav-link {
      width: 100%;
      justify-content: center;
    }

    .nav-dropdown-menu {
      position: static;
      min-width: 100%;
      margin-top: 8px;
      box-shadow: none;
      background: rgba(248, 252, 255, 0.92);
    }

    .hero {
      padding-top: 132px;
    }

    .procedure-section {
      padding: 62px 0 82px;
    }

    .procedure-heading {
      margin-bottom: 28px;
    }

    .procedure-panel {
      overflow: visible;
      padding: 20px;
      border-radius: 28px;
    }

    .hero-card {
      min-height: 300px;
      padding: 34px 22px;
    }

    .hero-card-logo img {
      width: 112px;
      height: 112px;
      border-radius: 28px;
    }

    .procedure-list {
      gap: 48px;
    }

    .procedure-card {
      width: fit-content;
      min-width: 0;
      max-width: 100%;
      min-height: 132px;
      padding: 22px 18px;
      border-radius: 24px;
    }

    .procedure-inline {
      gap: 12px;
      width: 100%;
      justify-content: center;
    }

    .procedure-icon {
      width: 54px;
      height: 54px;
      flex-basis: 54px;
      border-radius: 18px;
      font-size: 1.35rem;
    }

    .procedure-card-title {
      font-size: 0.98rem;
      line-height: 1.35;
      text-align: center;
    }

    .procedure-card:not(:last-child)::after {
  top: 100%;
  bottom: auto;
  width: 4px;
  height: 36px;
}

.procedure-card:not(:last-child)::before {
  top: calc(100% + 36px);
  border-left-width: 10px;
  border-right-width: 10px;
  border-top-width: 12px;
}

    .footer {
      padding: 64px 0 32px;
    }

    .footer-panel {
      padding: 30px 22px;
      border-radius: 28px;
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 34px;
    }

    .footer-logo {
      width: 64px;
      height: 64px;
      border-radius: 20px;
    }

    .hero-brand-only {
  min-height: auto;
  padding: 12px 0 0;
}

.hero-brand-content {
  flex-direction: column;
  gap: 16px;
  text-align: center;
}

.hero-brand-logo {
  width: 118px;
  height: 118px;
}

.hero-brand-text h2 {
  font-size: 2rem;
}

.hero-brand-text p {
  font-size: 1rem;
}
  }
`;

export function ComplaintsAppealsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: COMPLAINTS_APPEALS_STYLES }} />

      <main className="complaints-page">
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
                    <Link href="/informasi" className="nav-dropdown-link">
                      Artikel <i className="fa-solid fa-newspaper" />
                    </Link>

                    <Link
                      href="/informasi/keluhan-dan-banding"
                      className="nav-dropdown-link active"
                    >
                      Keluhan dan Banding <i className="fa-solid fa-comments" />
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

        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <h1 className="hero-title">Keluhan dan Banding</h1>

                <p className="hero-desc">
                  Skema penanganan keluhan dan banding yang objektif,
                  transparan, tidak diskriminatif, dan terdokumentasi.
                </p>

                <div className="hero-actions">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Halo%20GISLAB%2C%20saya%20ingin%20menyampaikan%20keluhan%20atau%20banding.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Hubungi WhatsApp <i className="fa-brands fa-whatsapp" />
                  </a>

                  <a
                    href={`mailto:${email}?subject=Keluhan%20dan%20Banding%20GISLAB`}
                    className="btn-secondary"
                  >
                    Kirim Email <i className="fa-solid fa-envelope" />
                  </a>
                </div>
              </div>

              <aside className="hero-brand-only">
                <div className="hero-brand-content">
                  <Image
                    src="/landing/animation/logo-lab.png"
                    alt="GIS Laboratorium"
                    width={150}
                    height={150}
                    className="hero-brand-logo"
                  />

                  <div className="hero-brand-text">
                    <h2>GIS Laboratorium</h2>
                    <p>PT Global Inspeksi Sistem</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="procedure-section" id="skema-prosedur">
          <div className="container">
            <div className="procedure-heading">
              <h2 className="procedure-title">
                Alur penanganan dari pengajuan sampai penyampaian hasil.
              </h2>
            </div>

            <div className="procedure-panel">
              <div className="procedure-list">
                {processSteps.map((step) => (
                  <article className="procedure-card" key={step.title}>
                    <div className="procedure-inline">
                      <div className="procedure-icon">
                        <i className={`fa-solid ${step.icon}`} />
                      </div>

                      <h3 className="procedure-card-title">{step.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="footer" id="kontak">
          <div className="container">
            <div className="footer-panel glass-dark">
              <div className="footer-grid">
                <div className="footer-brand">
                  <div className="footer-logo-wrap">
                    <Image
                      src="/landing/animation/logo-lab.png"
                      alt="GIS Laboratorium"
                      className="footer-logo"
                      width={96}
                      height={96}
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
                    maupun lingkungan melalui layanan laboratorium yang akurat
                    dan terpercaya.
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
      </main>
    </>
  );
}
