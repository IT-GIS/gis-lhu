"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FloatingContactWidget } from "@/features/landing/floating-contact-widget";
import { LanguageSwitcher } from "@/features/landing/language-switcher";
const SCOPE_ROUTE = "/en/ruang-lingkup-pengujian";

const SCOPE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .scope-page {
    --primary: #0A2540;
    --secondary: #0070F3;
    --accent: #00DFD8;
    --light-blue: #EBF4F8;
    --white: #FFFFFF;
    --text-dark: #1E293B;
    --text-muted: #64748B;
    --glass-bg: rgba(255, 255, 255, 0.72);
    --glass-border: rgba(255, 255, 255, 0.82);
    --glass-dark-bg: rgba(10, 37, 64, 0.4);
    --glass-dark-border: rgba(255, 255, 255, 0.15);
    --shadow-soft: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
    --shadow-hover: 0 22px 46px -20px rgba(0, 112, 243, 0.28);
    --radius-pill: 100px;
    --radius-md: 24px;
    --radius-lg: 32px;
    --font-main: 'Plus Jakarta Sans', sans-serif;
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    min-height: 100vh;
    color: var(--text-dark);
    font-family: var(--font-main);
    line-height: 1.6;
    background:
      radial-gradient(circle at 14% 22%, rgba(0, 223, 216, 0.1), transparent 26%),
      radial-gradient(circle at 88% 12%, rgba(0, 112, 243, 0.12), transparent 28%),
      linear-gradient(180deg, #FAFCFF 0%, #EFF6FF 100%);
    overflow-x: hidden;
  }

  .scope-page * {
    box-sizing: border-box;
  }

  .scope-page a {
    color: inherit;
    text-decoration: none;
  }

  .scope-page ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .scope-page .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .scope-page .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-soft);
  }

  .scope-page .glass-dark {
    background: var(--glass-dark-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-dark-border);
    color: var(--white);
  }

  .scope-page .navbar-wrapper {
    position: fixed;
    top: 24px;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    padding: 0 24px;
    transition: var(--transition);
  }

  .scope-page .navbar-wrapper.scrolled {
    top: 12px;
  }

  .scope-page .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1100px;
    padding: 12px 24px;
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  .scope-page .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 900;
    font-size: 1.12rem;
    color: var(--primary);
    letter-spacing: 0;
    white-space: nowrap;
  }

  .scope-page .nav-brand img {
    height: 28px;
    width: auto;
    transform: scale(1.8);
    transform-origin: left center;
    margin-right: 36px;
  }

  .scope-page .nav-menu {
    display: flex;
    gap: 8px;
  }

  .scope-page .nav-link {
    display: block;
    padding: 8px 14px;
    border-radius: var(--radius-pill);
    font-weight: 700;
    font-size: 0.93rem;
    color: var(--text-muted);
    transition: var(--transition);
    white-space: nowrap;
  }

  .scope-page .nav-link:hover {
    color: var(--primary);
    background: rgba(0, 112, 243, 0.05);
  }

  .scope-page .nav-link.active {
    background: rgba(0, 223, 216, 0.15);
    color: var(--secondary);
    font-weight: 600;
  }

  .scope-page .mobile-menu-btn {
    display: none;
    font-size: 1.5rem;
    color: var(--primary);
    background: none;
    border: none;
    cursor: pointer;
  }

  .scope-page .scope-main {
    padding-top: 0;
  }

  .scope-page .scope-hero-section {
    max-width: none;
    padding: 0;
  }

  .scope-page .scope-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 0;
    margin: 0;
    padding-top: 100px;
    background:
      linear-gradient(90deg, rgba(10, 37, 64, 0.9), rgba(10, 37, 64, 0.48), rgba(250, 252, 255, 0.18)),
      url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1800') center/cover;
  }

  .scope-page .scope-hero::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 40%;
    background: linear-gradient(0deg, rgba(250, 252, 255, 0.96), transparent);
    z-index: 1;
  }

  .scope-page .hero-content {
    position: relative;
    z-index: 2;
    width: min(1280px, 100%);
    margin: 0 auto;
    padding: 72px max(24px, calc((100vw - 1280px) / 2 + 56px));
    color: var(--white);
  }

  .scope-page .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    color: var(--accent);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .scope-page .hero-title {
    color: var(--white);
    font-size: clamp(2.3rem, 5vw, 4.2rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: 0;
    margin: 0 0 18px;
  }

  .scope-page .hero-text {
    max-width: 620px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 1.08rem;
    font-weight: 600;
    margin: 0;
  }

  .scope-page .scope-section {
    padding: 64px 0 96px;
  }

  .scope-page .scope-panel {
    border-radius: var(--radius-lg);
    padding: 34px;
    position: relative;
    overflow: hidden;
  }

  .scope-page .scope-panel::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -80px;
    width: 260px;
    height: 260px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(0, 223, 216, 0.16), transparent 68%);
    pointer-events: none;
  }

  .scope-page .search-layout {
    display: flex;
    align-items: center;
    gap: 18px;
    justify-content: flex-end;
    margin-bottom: 22px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .scope-page .search-layout::before {
    content: 'Daftar ruang lingkup';
    display: inline-flex;
    align-items: center;
    margin-right: auto;
    padding: 8px 14px;
    border-radius: 999px;
    color: #0057b8;
    background: rgba(0, 112, 243, 0.08);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .scope-page .search-box-wrapper {
    position: relative;
    width: 100%;
    max-width: 430px;
  }

  .scope-page #inputPencarianFinal {
    width: 100%;
    padding: 14px 18px 14px 48px;
    font-size: 15px;
    border: 1px solid rgba(10, 37, 64, 0.12);
    border-radius: 999px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 251, 255, 0.9)),
      #fff;
    color: #16324f;
    box-sizing: border-box;
    transition: all 0.3s ease;
    font-family: inherit;
    box-shadow: 0 16px 40px -28px rgba(10, 37, 64, 0.55);
  }

  .scope-page #inputPencarianFinal::placeholder {
    color: #7b8da3;
  }

  .scope-page #inputPencarianFinal:focus {
    background-color: #fff;
    border-color: rgba(0, 112, 243, 0.5);
    box-shadow:
      0 0 0 5px rgba(0, 112, 243, 0.1),
      0 18px 40px -26px rgba(0, 112, 243, 0.8);
    outline: none;
  }

  .scope-page .search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #0070F3;
    pointer-events: none;
  }

  .scope-page .search-icon::before {
    content: "\\f002";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
  }

  .scope-page #area-tabel-final {
    overflow-x: auto;
    position: relative;
    z-index: 1;
    border: 1px solid rgba(10, 37, 64, 0.08);
    border-radius: 26px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 251, 255, 0.96)),
      #fff;
    box-shadow:
      0 26px 70px -42px rgba(10, 37, 64, 0.42),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    scrollbar-color: rgba(0, 112, 243, 0.42) rgba(10, 37, 64, 0.06);
    scrollbar-width: thin;
  }

  .scope-page #area-tabel-final::-webkit-scrollbar {
    height: 12px;
  }

  .scope-page #area-tabel-final::-webkit-scrollbar-track {
    background: rgba(10, 37, 64, 0.06);
    border-radius: 999px;
  }

  .scope-page #area-tabel-final::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #0070F3, #00DFD8);
    border: 3px solid rgba(248, 251, 255, 0.96);
    border-radius: 999px;
  }

  .scope-page #area-tabel-final table {
    width: 100% !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    margin-bottom: 28px !important;
    table-layout: fixed !important;
    min-width: 920px;
    background: transparent;
  }

  .scope-page #area-tabel-final table:last-of-type {
    margin-bottom: 0 !important;
  }

  .scope-page #area-tabel-final tr {
    display: table-row !important;
  }

  .scope-page #area-tabel-final td {
    display: table-cell !important;
    border: 0 !important;
    border-right: 1px solid rgba(10, 37, 64, 0.08) !important;
    border-bottom: 1px solid rgba(10, 37, 64, 0.08) !important;
    padding: 14px 16px !important;
    vertical-align: top !important;
    font-size: 14px !important;
    line-height: 1.62 !important;
    word-wrap: break-word !important;
    color: #21354b;
    background: rgba(255, 255, 255, 0.82);
    transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }

  .scope-page #area-tabel-final td:last-child {
    border-right: 0 !important;
  }

  .scope-page #area-tabel-final tbody:nth-of-type(even) td {
    background: rgba(248, 251, 255, 0.9);
  }

  .scope-page #area-tabel-final tbody:hover td {
    background: rgba(0, 112, 243, 0.055);
  }

  .scope-page #area-tabel-final tbody:hover td[rowspan] {
    color: #004085;
    box-shadow: inset 4px 0 0 #00DFD8;
  }

  .scope-page .header-judul {
    position: sticky;
    top: 92px;
    z-index: 5;
    background:
      linear-gradient(135deg, #06264a 0%, #004085 54%, #0070F3 100%) !important;
    color: white !important;
    font-weight: 800;
    padding: 18px 20px !important;
    text-align: left;
    font-size: 16px !important;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-bottom: 0 !important;
    box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.16);
  }

  .scope-page .header-kolom {
    position: sticky;
    top: 145px;
    z-index: 4;
    background:
      linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%) !important;
    color: #0A2540 !important;
    font-weight: 800;
    text-align: center;
    padding: 13px 14px !important;
    font-size: 0.83rem !important;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    box-shadow: inset 0 -1px 0 rgba(0, 112, 243, 0.14);
  }

  .scope-page #area-tabel-final tbody td:nth-child(1) {
    color: #28415f;
    font-weight: 650;
  }

  .scope-page #area-tabel-final tbody td[rowspan] {
    color: #0A2540;
    background:
      linear-gradient(180deg, rgba(235, 244, 248, 0.9), rgba(255, 255, 255, 0.92)) !important;
    font-weight: 800;
  }

  .scope-page #area-tabel-final tbody td:nth-child(3),
  .scope-page #area-tabel-final tbody tr:not(:has(td[rowspan])) td:nth-child(2) {
    color: #34516f;
  }

  .scope-page col.c1 { width: 31%; }
  .scope-page col.c2 { width: 29%; }
  .scope-page col.c3 { width: 40%; }

  .scope-page #pesan-nihil {
    display: none;
    text-align: center;
    margin-top: 18px;
    padding: 28px;
    color: #50616b;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 251, 255, 0.92));
    border: 1px dashed rgba(0, 112, 243, 0.28);
    border-radius: 22px;
    font-weight: 700;
    font-style: normal;
  }


  .scope-page .footer {
    position: relative;
    padding: 90px 0 42px;
    background:
      radial-gradient(circle at 15% 20%, rgba(0, 223, 216, 0.16), transparent 30%),
      radial-gradient(circle at 85% 10%, rgba(255, 255, 255, 0.1), transparent 28%),
      linear-gradient(135deg, #0A2540 0%, #0D4778 52%, #105C96 100%);
    color: var(--white);
    overflow: hidden;
  }

  .scope-page .footer::before {
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

  .scope-page .footer-panel {
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

  .scope-page .footer-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.85fr) minmax(220px, 0.6fr);
    gap: clamp(32px, 5vw, 72px);
    align-items: start;
  }

  .scope-page .footer-brand {
    max-width: 520px;
  }

  .scope-page .footer-logo-wrap {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 22px;
  }

  .scope-page .footer-logo {
    width: 74px;
    height: 74px;
    object-fit: contain;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.94);
    padding: 10px;
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
  }

  .scope-page .footer-brand-title {
    margin: 0;
    color: #ffffff;
    font-size: clamp(1.35rem, 2vw, 1.8rem);
    font-weight: 900;
    letter-spacing: -0.035em;
  }

  .scope-page .footer-brand-subtitle {
    margin: 5px 0 0;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .scope-page .footer-description {
    margin: 0;
    max-width: 500px;
    color: rgba(234, 246, 255, 0.82);
    font-size: 0.98rem;
    font-weight: 600;
    line-height: 1.85;
  }

  .scope-page .footer-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
  }

  .scope-page .footer-badges span {
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

  .scope-page .footer-col-title {
    font-size: 1.18rem;
    font-weight: 900;
    color: #ffffff;
    margin: 0 0 24px;
  }

  .scope-page .footer-text {
    color: rgba(234, 246, 255, 0.82);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 650;
    line-height: 1.65;
  }

  .scope-page .footer-text i {
    width: 20px;
    color: var(--accent);
    text-align: center;
  }

  .scope-page .footer-link {
    color: rgba(234, 246, 255, 0.82);
    transition: var(--transition);
    display: block;
    width: fit-content;
    margin-bottom: 13px;
    font-weight: 700;
    text-decoration: none;
  }

  .scope-page .footer-link:hover {
    color: var(--accent);
    transform: translateX(6px);
  }

  .scope-page .footer-bottom {
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

  .scope-page .whatsapp-widget {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1100;
  }

  .scope-page .whatsapp-toggle {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    border: none;
    color: #fff;
    background: #25D366;
    box-shadow: 0 14px 28px rgba(37, 211, 102, 0.28);
    font-size: 1.8rem;
    cursor: pointer;
  }

  .scope-page .whatsapp-window {
    position: absolute;
    right: 0;
    bottom: 76px;
    width: min(340px, calc(100vw - 48px));
    border-radius: 22px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.2);
    transform: translateY(12px);
    opacity: 0;
    pointer-events: none;
    transition: var(--transition);
  }

  .scope-page .whatsapp-window.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .scope-page .wa-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
    background: #075E54;
    color: #fff;
  }

  .scope-page .wa-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
  }

  .scope-page .wa-brand img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  .scope-page .wa-close {
    border: none;
    background: transparent;
    color: #fff;
    cursor: pointer;
    font-size: 1.1rem;
  }

  .scope-page .wa-body {
    padding: 18px;
    display: grid;
    gap: 14px;
  }

  .scope-page .wa-bubble {
    padding: 12px 14px;
    border-radius: 16px;
    color: #1f2937;
    background: #e8fff0;
    font-weight: 650;
  }

  .scope-page .wa-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 999px;
    padding: 12px 16px;
    color: #fff;
    background: #25D366;
    font-weight: 800;
  }

  @media (max-width: 980px) {
    .scope-page .navbar {
      border-radius: 28px;
    }

    .scope-page .mobile-menu-btn {
      display: block;
    }

    .scope-page .nav-menu {
      position: absolute;
      top: calc(100% + 12px);
      right: 24px;
      width: min(320px, calc(100vw - 48px));
      display: none;
      flex-direction: column;
      padding: 14px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: var(--shadow-soft);
    }

    .scope-page .nav-menu.active {
      display: flex;
    }

    .scope-page .nav-link {
      white-space: normal;
    }
}

  @media (max-width: 1024px) {
    .scope-page .footer-grid {
      grid-template-columns: 1fr 1fr;
    }

    .scope-page .footer-brand {
      grid-column: 1 / -1;
    }
  }
  

  @media (max-width: 600px) {
    .scope-page .container {
      padding: 0 18px;
    }

    .scope-page .nav-brand {
      font-size: 0.88rem;
      gap: 8px;
    }

    .scope-page .nav-brand img {
      width: 32px;
      height: auto;
      margin-right: 0;
      transform: none;
    }

    .scope-page .hero-content {
      padding: 56px 24px;
      max-width: 100vw;
      overflow-wrap: normal;
    }

    .scope-page .hero-title {
      max-width: 330px;
      font-size: clamp(2rem, 9vw, 2.35rem);
      line-height: 1.08;
    }

    .scope-page .hero-text {
      max-width: 330px;
    }

    .scope-page .scope-panel {
      padding: 28px 20px;
    }

    .scope-page .footer {
      padding: 64px 0 32px;
    }

    .scope-page .footer-panel {
      padding: 30px 22px;
      border-radius: 28px;
    }

    .scope-page .footer-logo-wrap {
      align-items: flex-start;
    }

    .scope-page .footer-logo {
      width: 64px;
      height: 64px;
      border-radius: 20px;
    }

    .scope-page .footer-badges span {
      font-size: 0.72rem;
    }

    .scope-page .search-layout {
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
    }

    .scope-page .search-layout::before {
      margin-right: 0;
      justify-content: center;
    }

    .scope-page .search-box-wrapper {
      max-width: 100%;
    }

    .scope-page .footer-grid {
      grid-template-columns: 1fr;
    }
  }
`;

function ensureLandingHeadAssets() {
  if (document.getElementById("landing-font-awesome")) return;

  const link = document.createElement("link");
  link.id = "landing-font-awesome";
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(link);
}

export function ScopePageEn() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  useEffect(() => {
    ensureLandingHeadAssets();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const groups = Array.from(
      document.querySelectorAll<HTMLElement>(".scope-page .data-group"),
    );
    const normalizedQuery = query.trim().toUpperCase();
    let foundAny = false;

    groups.forEach((group) => {
      const textContent = group.textContent ?? "";
      const matches =
        normalizedQuery === "" ||
        textContent.toUpperCase().includes(normalizedQuery);
      group.style.display = matches ? "" : "none";
      foundAny = foundAny || matches;
    });

    const emptyMessage = document.getElementById("pesan-nihil");
    if (emptyMessage) {
      emptyMessage.style.display = foundAny ? "none" : "block";
    }
  }, [query]);

  return (
    <div className="scope-page">
      <style dangerouslySetInnerHTML={{ __html: SCOPE_STYLES }} />
      <header
        className={`navbar-wrapper${scrolled ? " scrolled" : ""}`}
        id="navbar"
      >
        <nav className="navbar">
          <Link href="/en" className="nav-brand">
            <Image
              src="/landing/animation/logo-lab.png"
              alt="GISLAB"
              width={90}
              height={28}
            />
            Global Inspeksi Sistem
          </Link>
          <ul className={`nav-menu${menuOpen ? " active" : ""}`} id="navMenu">
            <li>
              <Link href="/en" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/en/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/en/service" className="nav-link">
                Services
              </Link>
            </li>
            <li>
              <Link href={SCOPE_ROUTE} className="nav-link active">
                Testing Scope
              </Link>
            </li>
            <li className="nav-dropdown">
              <details>
                <summary className="nav-link nav-dropdown-trigger">
                  Information <i className="fa-solid fa-chevron-down" />
                </summary>
                <div className="nav-dropdown-menu">
                  <Link href="/en/informasi" className="nav-dropdown-link">
                    Articles <i className="fa-solid fa-newspaper" />
                  </Link>
                  <Link
                    href="/en/informasi/keluhan-dan-banding"
                    className="nav-dropdown-link"
                  >
                    Complaints and Appeals{" "}
                    <i className="fa-solid fa-comments" />
                  </Link>
                </div>
              </details>
            </li>
            <li>
              <Link href="/en/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
          <div className="nav-actions">
            <LanguageSwitcher />

            <button
              className="mobile-menu-btn"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </nav>
      </header>

      <main className="scope-main">
        <section className="scope-hero-section">
          <div className="scope-hero">
            <div className="hero-content">
              <h1 className="hero-title">Testing Scope</h1>
              <p className="hero-text">
                A list of testing methods, materials or products, and test types
                available at GIS Laboratory.
              </p>
            </div>
          </div>
        </section>

        <section className="scope-section">
          <div className="container">
            <div className="scope-panel glass">
              <div className="search-layout">
                <div className="search-box-wrapper">
                  <span className="search-icon" aria-hidden="true" />
                  <input
                    id="inputPencarianFinal"
                    type="text"
                    placeholder="Search methods, materials, or parameters..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>

              <div
                id="area-tabel-final"
                dangerouslySetInnerHTML={{ __html: SCOPE_TABLES_HTML }}
              />
              <div id="pesan-nihil">
                No data found. Please try another keyword.
              </div>
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
                    alt="GIS Laboratory"
                    className="footer-logo"
                  />
                  <div>
                    <h3 className="footer-brand-title">GIS Laboratory</h3>
                    <p className="footer-brand-subtitle">
                      PT. Global Inspeksi Sistem
                    </p>
                  </div>
                </div>

                <p className="footer-description">
                  GIS Laboratory serves as a testing partner that helps
                  customers ensure product and environmental quality, safety,
                  and conformity through accurate and reliable laboratory
                  services.
                </p>

                <div className="footer-badges">
                  <span>Laboratory Testing</span>
                  <span>Environment</span>
                  <span>Lubricants</span>
                  <span>Palm Oil & Fertilizer</span>
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

                <Link href="/en" className="footer-link">
                  Home
                </Link>
                <Link href="/en/profile" className="footer-link">
                  Profile
                </Link>
                <Link href="/en/service" className="footer-link">
                  Services
                </Link>
                <Link
                  href="/en/ruang-lingkup-pengujian"
                  className="footer-link"
                >
                  Testing Scope
                </Link>
                <Link href="/en/informasi" className="footer-link">
                  Information
                </Link>
                <Link href="/en/contact" className="footer-link">
                  Contact
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
    </div>
  );
}

const SCOPE_TABLES_HTML = `<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Accreditation Scope - Location 1</td></tr>
<tr><td class="header-kolom">Testing Method</td><td class="header-kolom">Material/Product</td><td class="header-kolom">Type of Test</td></tr>
</thead>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ; ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021, SNI 7069.1-2020</td><td rowspan="1">4-stroke gasoline engine lubricating oil for motor vehicles</td><td>Pour Point, Copper test, Sulfated Ash, Kinematic Viscosity 100 °C, Total Base Number, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ;ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021; SNI 7069.2-2021</td><td rowspan="1">4-stroke gasoline engine lubricating oil for motorcycles</td><td>Pour Point, Copper test, Sulfated Ash, Kinematic Viscosity 100 °C, Total Base Number, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D874:2023 ; ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021;SNI 7069.3-2020</td><td rowspan="1">2-stroke gasoline engine lubricating oil with air cooling</td><td>Ash sulfated, Kinematic Viscosity 100 °C, Total Base Number, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2019; ASTM D445:2021; ASTM D92:2018 ;SNI 7069.4-2020</td><td rowspan="1">2-stroke gasoline engine lubricating oil with water cooling</td><td>Copper test, Kinematic Viscosity 100 °C, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ; ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021; SNI 7069.5-2021</td><td rowspan="1">High-speed diesel engine lubricating oil</td><td>Pour Point, Copper test, Sulfated Ash, Kinematic Viscosity 100 °C, Total Base Number, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2019 ; ASTM D445:2021, ASTM D92:2018; SNI 7069.6-2021</td><td rowspan="1">Manual transmission and differential gear lubricating oil for motor vehicles</td><td>Copper test, Kinematic Viscosity 100 °C, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2019 ;ASTM D445:2021, ASTM D92:2018; ASTM D4052:2022; SNI 7069.7-2021</td><td rowspan="1">Automatic transmission lubricating oil</td><td>Copper test, Kinematic Viscosity 100 °C, Flashpoint COC, Density</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2019 ;ASTM D445:2021, ASTM D92:2018; SNI 7069.9-2016</td><td rowspan="1">Anti-wear industrial hydraulic lubricating oil</td><td>Copper test, Kinematic Viscosity 40 °C, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2020 ; ASTM D445:2021, ASTM D92:2018; SNI 7069.10-2017</td><td rowspan="1">Enclosed industrial gear lubricating oil</td><td>Copper test, Kinematic Viscosity 40 °C, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ; ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021; SNI 7069.11-2018</td><td rowspan="1">Medium-speed diesel engine lubricating oil</td><td>Pour Point, Copper test, Sulfated Ash, Kinematic Viscosity 100 °C, Total Base Number, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ;ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021; SNI 7069.12-2018</td><td rowspan="1">Low-speed diesel engine lubricating oil</td><td>Pour Point, Copper test, Sulfated Ash, Kinematic Viscosity 100 °C, Total Base Number, Flashpoint COC</td></tr>
</tbody>
</table>

<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Accreditation Scope - Location 2</td></tr>
<tr><td class="header-kolom">Testing Method</td><td class="header-kolom">Material/Product</td><td class="header-kolom">Type of Test</td></tr>
</thead>
<tbody class="data-group">
<tr><td>AOCS Official Method Ca 3a-46, Revised 2021</td><td rowspan="2">Crude Palm Oil</td><td>Impurity content</td></tr>
<tr><td>AOCS Official Method Cd 1d-92, Revised 2022</td><td>Iodine value</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>MPOB-K1.1 2024</td><td rowspan="2">Palm Kernel</td><td>Impurity content</td></tr>
<tr><td>MPOB-K.6 2024</td><td>Moisture and volatile matter content</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>AOCS Official Method Ca2c-25, 2017</td><td rowspan="4">RBD Palm Olein</td><td>Moisture and volatile matter content</td></tr>
<tr><td>AOCS Official Method Ca 3a-46, Revised 2021</td><td>Impurity content</td></tr>
<tr><td>AOCS Official Method Cd 1d-92, Revised 2022</td><td>Iodine value</td></tr>
<tr><td>AOCS Official Method Ca 5a-40, 2017</td><td>Free Fatty Acid (FFA)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 2803:2012 Clause 6.4.2</td><td rowspan="6">Solid NPK fertilizer</td><td>Potassium as K2O</td></tr>
<tr><td>SNI 2803:2012</td><td>Total N, P2O5, and K2O content</td></tr>
<tr><td>SNI 2803:2012 Clause 6.6.1</td><td>Mercury (Hg)</td></tr>
<tr><td>SNI 2803:2012 Clause 6.6.2</td><td>Cadmium (Cd)</td></tr>
<tr><td>SNI 2803:2012 Clause 6.6.3</td><td>Lead (Pb)</td></tr>
<tr><td>SNI 2803:2012 Clause 6.7</td><td>Arsenic (As)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 281:2010, clause 6.4</td><td rowspan="1">Urea fertilizer</td><td>Determination of granule/prill size. Size (1.00 mm - 3.35 mm &amp; 2.00 mm - 4.75 mm</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-2805-2005 / AOAC Official Method 22nd, 2023 clause 2.6.37</td><td rowspan="2">KCl fertilizer (Muriate of Potash)</td><td>K2O content</td></tr>
<tr><td>SNI 02-2805-2005 Clause 6.2 / AOAC Official Method 22nd, 2023 clause 2.2.01</td><td>Moisture content</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-3776-2005 Clause 6.1.1/ AOAC Official Method 22nd, 2023 clause 2.3.01 and 2.3.02</td><td rowspan="2">Natural phosphate fertilizer for agriculture</td><td>Total P2O5</td></tr>
<tr><td>SNI 02-3776-2005 Clause 6.2 / AOAC Official Method 22nd, 2023 clause 2.2.01</td><td>Moisture content</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-1760-2005 Clause 6.4 / AOAC Official Method 22nd, 2023 clause 2.2.01</td><td rowspan="1">Ammonium sulfate fertilizer (ZA)</td><td>Moisture content</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-0086-2005 Clause 6.1.1/ AOAC Official Method 22nd, 2023 clause 2.3.01 and 2.3.02</td><td rowspan="3">TSP fertilizer</td><td>P2O5 Total (dry basis)</td></tr>
<tr><td>SNI 02-0086-2005 Clause 6.1.3 / AOAC Official Method 22nd, 2023 clause 2.3.06 and 2.3.09</td><td>Water-soluble P2O5 (dry basis)</td></tr>
<tr><td>SNI 02-0086-2005 Clause 6.3 / AOAC Official Method 22nd, 2023 clause 2.2.01</td><td>Moisture content</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-3769-2005, clause 6.3</td><td rowspan="1">SP36 fertilizer</td><td>Free acid content as H3PO4 (dry basis)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 9088:2022, Appendix A.4.1</td><td rowspan="2">Red palm cooking oil</td><td>Cadmium (Cd)</td></tr>
<tr><td>SNI 9088:2022, Appendix A.4.1</td><td>Lead (Pb)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 7709:2019, Appendix A.9.1</td><td rowspan="2">Palm cooking oil</td><td>Cadmium (Cd)</td></tr>
<tr><td>SNI 7709:2019, Appendix A.9.1</td><td>Lead (Pb)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-4959-1999</td><td rowspan="4">Borate fertilizer</td><td>Boron oxide (B2O3)</td></tr>
<tr><td>SNI 02-4959-1999 (for intended use only)</td><td>Sulfatee (SO4)</td></tr>
<tr><td>SNI 02-4959-1999 (for intended use only)</td><td>Cadmium (Cd)</td></tr>
<tr><td>AOAC 22nd edition, 2023 clause 2.2.01</td><td>Moisture content</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-2807-1992, Clause 5.1</td><td rowspan="3">Kieserite fertilizer</td><td>Magnesium content as MgO</td></tr>
<tr><td>SNI 02-2807-1992, Clause 5.2</td><td>Sulfur content as S</td></tr>
<tr><td>SNI 02-2807-1992, Clause 5.3</td><td>Moisture content</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="2">4-stroke gasoline engine lubricating oil for motor vehicles</td><td>Calcium (Ca), Magnesium (Mg), Zinc (Zn)</td></tr>
<tr><td>ASTM D 4951-14 (Reapproved 2019)</td><td>Phosphorus (P), Sulfur (S)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="2">4-stroke gasoline engine lubricating oil for motorcycles</td><td>Calcium (Ca), Magnesium (Mg), Zinc (Zn)</td></tr>
<tr><td>ASTM D 4951-14 (Reapproved 2019)</td><td>Phosphorus (P)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="1">2-stroke gasoline engine lubricating oil with air cooling</td><td>Calcium (Ca)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="2">High-Speed Diesel Engine Lubricating Oil</td><td>Calcium (Ca), Magnesium (Mg), Zinc (Zn)</td></tr>
<tr><td>ASTM D 4951-14 (Reapproved 2019)</td><td>Phosphorus (P), Sulfur (S)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="2">Automatic transmission lubricating oil</td><td>Calcium (Ca), Magnesium (Mg), Zinc (Zn)</td></tr>
<tr><td>ASTM D 4951-14 (Reapproved 2019)</td><td>Phosphorus (P), Sulfur (S)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="1">Industrial lubricant (medium-speed diesel engine lubricating oil)</td><td>Calcium (Ca), Magnesium (Mg), Zinc (Zn)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="1">Industrial lubricant (low-speed diesel engine lubricating oil)</td><td>Calcium (Ca), Magnesium (Mg), Zinc (Zn)</td></tr>
</tbody>
</table>

<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Accreditation Scope - Water &amp; Environment</td></tr>
<tr><td class="header-kolom">Testing Method</td><td class="header-kolom">Material/Product</td><td class="header-kolom">Type of Test</td></tr>
</thead>
<tbody class="data-group">
<tr><td>SNI 06-6860-2002</td><td rowspan="27">River water, lake water, estuary water, swamp water, aquifer water, pond water, spring water, reservoir water, well water</td><td>Odor</td></tr>
<tr><td>SNI 6989.80:2011</td><td>Color</td></tr>
<tr><td>SNI 6989.11:2019</td><td>pH</td></tr>
<tr><td>SNI 06-698.-23-2005</td><td>Temperature</td></tr>
<tr><td>SNI 6989.27:2019</td><td>Total dissolved solids (TDS)</td></tr>
<tr><td>SNI 6989.3:2019</td><td>Total suspended solids (TSS)</td></tr>
<tr><td>SNI 6989.2:2019</td><td>Chemical oxygen demand (COD)</td></tr>
<tr><td>SNI 6989.20:2019</td><td>Sulfate</td></tr>
<tr><td>SNI 6989.19:2009</td><td>Chloride</td></tr>
<tr><td>SNI 06-6989.9-2004</td><td>Nitrite</td></tr>
<tr><td>SNI 06-6989.30-2005</td><td>Ammonia</td></tr>
<tr><td>SNI 06-6989.29-2005</td><td>Fluoride</td></tr>
<tr><td>SNI 6989.71:2009</td><td>Hexavalent chromium</td></tr>
<tr><td>SNI 06-6989.51-2005</td><td>MBAS / total detergent</td></tr>
<tr><td>SNI 6989.10-2011</td><td>Oil and grease</td></tr>
<tr><td>SNI 06.6989.12-2004</td><td>Hardness</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved barium (Ba)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved boron (B)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved iron (Fe)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved cadmium (Cd)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved cobalt (Co)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved manganese (Mn)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved nickel (Ni)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved zinc (Zn)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved copper (Cu)</td></tr>
<tr><td>SNI 6989-82:2019</td><td>Dissolved chromium (Cr)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved lead (Pb)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 06-6989.23-2005</td><td rowspan="9">Clean water</td><td>Temperaturee</td></tr>
<tr><td>SNI 6989.27:2019</td><td>Total dissolved solids (TDS)</td></tr>
<tr><td>SNI 6989.80:2011</td><td>Color</td></tr>
<tr><td>SNI 06-6860-2002</td><td>Odor</td></tr>
<tr><td>SNI 6989.11:2019</td><td>pH</td></tr>
<tr><td>SNI 06-6989.9-2004</td><td>Nitrite</td></tr>
<tr><td>SNI 6989.71:2009</td><td>Chromium valence 6 (Cr6+)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved iron (Fe)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved manganese (Mn)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 6989.11:2019</td><td rowspan="21">Wastewater</td><td>pH</td></tr>
<tr><td>SNI 06-6989.23-2005</td><td>Temperaturee</td></tr>
<tr><td>SNI 6989.27:2019</td><td>Total dissolved solids (TDS)</td></tr>
<tr><td>SNI 6989.3:2019</td><td>Total suspended solids (TSS)</td></tr>
<tr><td>SNI 6989.15:2019</td><td>Chemical oxygen demand (COD)</td></tr>
<tr><td>SNI 6989.20:2019</td><td>Sulfate</td></tr>
<tr><td>SNI 06-6989.9-2004</td><td>Nitrite</td></tr>
<tr><td>SNI 06-6989.30-2005</td><td>Ammonia</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Total barium (Ba)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved iron (Fe)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Total cadmium (Cd)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Total cobalt (Co)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Dissolved manganese (Mn)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Total nickel (Ni)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Total zinc (Zn)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Total copper (Cu)</td></tr>
<tr><td>SNI 6989-82:2019</td><td>Total lead (Pb)</td></tr>
<tr><td>SNI 6989-82:2020</td><td>Total chromium (Cr)</td></tr>
<tr><td>SNI 6989.71:2009</td><td>Hexavalent chromium</td></tr>
<tr><td>SNI 6989.10-2011</td><td>Oil and grease</td></tr>
<tr><td>SNI 06-6989.5-2005</td><td>MBAS / total detergent</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 3554:2015 Clause 3.2.1 / SNI 3553:2015 / SNI 6241:2015</td><td rowspan="25">Mineral water / demineralized water</td><td>Odor and taste</td></tr>
<tr><td>SNI 3554:2015 Clause 3.2.3 / SNI 3553:2015 / SNI 6241:2015</td><td>Color</td></tr>
<tr><td>SNI 3554:2015 Clause 3.3 / SNI 3553:2015 / SNI 6241:2015</td><td>pH</td></tr>
<tr><td>SNI 3554:2015 Clause 3.5 / SNI 3553:2015 / SNI 6241:2015</td><td>Dissolved substances</td></tr>
<tr><td>SNI 3554:2015 Clause 3.11 / SNI 3553:2015 / SNI 6241:2015</td><td>Sulfate</td></tr>
<tr><td>SNI 3554:2015 Clause 3.12 / SNI 3553:2015 / SNI 6241:2015</td><td>Chloride</td></tr>
<tr><td>SNI 3554:2015 Clause 3.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Nitrate</td></tr>
<tr><td>SNI 3554:2015 Clause 3.9 / SNI 3553:2015 / SNI 6241:2015</td><td>Nitrite</td></tr>
<tr><td>SNI 3554:2015 Clause 3.10 / SNI 3553:2015 / SNI 6241:2015</td><td>Ammonium (NH4)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.13 / SNI 3553:2015 / SNI 6241:2015</td><td>Fluoride</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total barium (Ba)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total boron (B)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total arsenic (As)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total iron (Fe)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total cadmium (Cd)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total manganese (Mn)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total chromium (Cr)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total copper (Cu)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total lead (Pb)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.21.2 / SNI 3553:2015 / SNI 6241:2015</td><td>Total silver (Ag)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total selenium (Se)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total cobalt (Co)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Total zinc (Zn)</td></tr>
<tr><td>SNI 3554:2015 Clause 3.27.2 / SNI 3553:2015 / SNI 6241:2015</td><td>Detergent</td></tr>
<tr><td>SNI 3554:2015 Clause 3.6 / SNI 3553:2015 / SNI 6241:2015</td><td>Organic matter (KMnO4 value)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 6989-23-2005</td><td rowspan="3">Drinking water</td><td>Temperaturee</td></tr>
<tr><td>SNI 06.6989.12-2004</td><td>Hardness</td></tr>
<tr><td>SNI 6989.71:2009</td><td>Chromium valence 6 (Cr6+)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 8995:2021</td><td rowspan="1">River water, lake water, estuary water, swamp water, aquifer water, pond water, spring water, reservoir water, well water</td><td>Water test sample collection for physical and chemical testing</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 8990:2021</td><td rowspan="1">Wastewater</td><td>Water test sample collection for physical and chemical testing</td></tr>
</tbody>
</table>

<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Accreditation Scope - Air &amp; Emissions</td></tr>
<tr><td class="header-kolom">Testing Method</td><td class="header-kolom">Material/Product</td><td class="header-kolom">Type of Test</td></tr>
</thead>
<tbody class="data-group">
<tr><td>SNI 7119-7:2017</td><td rowspan="11">Ambient air</td><td>Sulfur dioxide (SO2)</td></tr>
<tr><td>SNI 7119-2:2017</td><td>Nitrogen dioxide (NO2)</td></tr>
<tr><td>SNI 19-7119.1-2005</td><td>Ammonia (NH3)</td></tr>
<tr><td>SNI 7119-3:2017</td><td>Dust particulate (TSP) 24 hours</td></tr>
<tr><td>SNI 7119-15:2016</td><td>Dust particulate (PM10) 24 hours</td></tr>
<tr><td>SNI 7119-14:2016</td><td>Dust particulate (PM2.5) 24 hours</td></tr>
<tr><td>SNI 7119-8:2017</td><td>Ozone (O3)</td></tr>
<tr><td>SNI 7119-4:2017 (ICP-OES)</td><td>Lead (Pb)</td></tr>
<tr><td>SNI 8427:2017</td><td>Noise level 24 hours</td></tr>
<tr><td>SNI 19-7119.6-2005</td><td>Determination of sampling locations for ambient air quality monitoring</td></tr>
<tr><td>SNI 19-7119.9-2005</td><td>Determination of sampling locations for roadside air quality monitoring</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 19.7117.11-2005</td><td rowspan="14">Stationary source emissions</td><td>Opacity</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Nitrogen dioxide (NO2)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Sulfur dioxide (SO2)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Sulfur (H2S)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Nitrogen oxide (NO)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Oxygen (O2)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Carbon dioxide (CO2)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Carbon monoxide (CO)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Methane (CH4)</td></tr>
<tr><td>SNI 7117.13-2009</td><td>Determination of locations and traverse points for particulate and linear velocity sampling</td></tr>
<tr><td>SNI 7117.14-2009</td><td>Linear velocity</td></tr>
<tr><td>SNI 7117.15-2009</td><td>Determination of dry molecular weight (flue gas)</td></tr>
<tr><td>SNI 7117.16-2009</td><td>Moisture content (% volume)</td></tr>
<tr><td>SNI 7117.17-2009</td><td>Particulate by isokinetic sampling</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 7119-7:2017, SNI 7119-2:2017, SNI 19-7119.1-2005, SNI 7119-3:2017, SNI 7119-15:2016, SNI 7119-14:2016, SNI 7119-8:2017, SNI 7119-4:2017, SNI 8427:2017</td><td rowspan="1">Ambient air</td><td>Ambient air test sample collection</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 7117.13-2009, SNI 7117.14-2009, SNI 7117.15-2009, SNI 7117.16-2009, SNI 7117.17-2009, PO-GIS-ESTB-001 (Direct Reading)</td><td rowspan="1">Stationary source emission air (stack)</td><td>Stationary source emission air sample collection (stack)</td></tr>
</tbody>
</table>

<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Accreditation Scope - Sprayer Equipment</td></tr>
<tr><td class="header-kolom">Testing Method</td><td class="header-kolom">Material/Product</td><td class="header-kolom">Type of Test</td></tr>
</thead>
<tbody class="data-group">
<tr><td></td><td rowspan="72">Plant maintenance equipment - electric knapsack sprayer</td><td>Verification test</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.2</td><td>Dimension and specification measurement:</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Tank length</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Tank width</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Height including pump and battery compartment</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.4 (Gravimetry)</td><td>Empty weight</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1.2c</td><td>Tank capacity</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Tank wall thickness</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Filling filter funnel diameter</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1.1a</td><td>Filling filter opening size</td></tr>
<tr><td>SNI 8485 : 2018, Clause 6.3.1.1b</td><td>Bottom filter opening size (tank base)</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Hose length</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Hose outside diameter</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Spray pipe length</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Spray pipe outside diameter</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Shoulder strap width</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Shoulder pad foam thickness</td></tr>
<tr><td></td><td>Tank</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1.2a</td><td>Made of stainless steel or plastic (HDPE)</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.1 (Visual)</td><td>For plastic tanks, the liquid filling limit and surface must be clearly visible during filling.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>Equipped with a filling filter funnel with a minimum diameter of 50 mm, with filter opening size from 0.1 mm to 1.0 mm</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>The tank has a bottom filter opening (tank base), with mesh size from 32 mesh to 48 mesh</td></tr>
<tr><td></td><td>Battery and pump compartment</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1.3</td><td>Made of stainless steel with minimum thickness of 1.0 mm, or plastic (HDPE) with minimum thickness of 2.5 mm</td></tr>
<tr><td></td><td>Tank lid</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1.2b</td><td>The tank lid must be easy to close by an operator wearing gloves and must have an effective seal.</td></tr>
<tr><td></td><td>Spray pipe</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.2 (Visual)</td><td>The spray pipe must be easy to detach from the connection so it can be stored when not in use.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.3 (Visual)</td><td>The spray pipe must not have sharp bends in any normal working position</td></tr>
<tr><td></td><td>Nozzle</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.4 (Visual)</td><td>At least 2 nozzle types must be provided with spray patterns: type F (flat fan), type FE (flat fan), or cone type</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.5 (Visual)</td><td>The nozzle body must have standard-type threads</td></tr>
<tr><td></td><td>Spray hose on/off valve</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.6 (Visual)</td><td>Pressure lines must be equipped with valves that can close quickly (instantly).</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.7 (Visual)</td><td>The valve must close when released and must not be locked when in the open position</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.8 (Visual)</td><td>Unintended opening of the shut-off valve must be minimized, for example due to force or the locking component.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.9 (Visual)</td><td>The shut-off valve must open and close properly, and must be marked open and closed.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.10 (Visual)</td><td>The shut-off valve handle must be comfortable and easy to grip by an operator wearing gloves.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.11 (Visual)</td><td>The shut-off valve must be operable comfortably without tiring the operator's hand.</td></tr>
<tr><td></td><td>Spray hose</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.12 (Visual)</td><td>The hose material may be rubber or synthetic material</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.13 (Visual)</td><td>The hose is connected to the connector, hose screw cap, and clamp.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.14 (Visual)</td><td>Rubber hose material may have one or more reinforced fiber layers.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.15 (Visual)</td><td>Threaded connections must be sufficiently strong, capable of being tightened by thumb, and must not leak when operated at maximum pressure.</td></tr>
<tr><td></td><td>Shoulder strap</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.16 (Visual)</td><td>The shoulder strap and shoulder pad must be strong enough to withstand the load and made of non-absorbent material (polyester braid or polypropylene multi-filament yarn)</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.17 (Visual)</td><td>At least one shoulder strap must be provided, complete with a part that can be quickly attached and released with one hand</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.18 (Visual)</td><td>It must not loosen by itself, for example due to gravity or movement</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.19 (Visual)</td><td>It must be adjustable according to the operator's body posture.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.20 (Visual)</td><td>A fastening-type mechanism must be available for quick release in an emergency.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.21 (Visual)</td><td>There must be no damage to the shoulder strap and fixation points that reduces function as a consequence of the shoulder strap durability test.</td></tr>
<tr><td></td><td>Filter</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>The filter opening size must be smaller than the narrowest diameter of the smallest nozzle size used.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.22 (Visual)</td><td>The upper filter must be made of stainless steel or plastic, and the filter at the tank base must be made of stainless steel and must be removable, replaceable, and cleanable.</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.5.23 (Visual)</td><td>The filter design must allow the tank to be filled quickly without spilling and must be equipped with air ventilation</td></tr>
<tr><td></td><td>Connectors and couplings</td></tr>
<tr><td>SNI 8485 : 2023, Clause 6.3.1 and PO-GIS-PTN-001 Clause 5.1.3 (Dimensions)</td><td>The diameter and thread size must be the same</td></tr>
<tr><td></td><td>Performance test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.2.1</td><td>Spray discharge test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.2.7</td><td>Shoulder strap and fixation point test</td></tr>
<tr><td>SNI 8485 : 2018 Clause 6.2.4.1.4</td><td>External surface deposit volume test</td></tr>
<tr><td>SNI 8485 : 2018 Clause 6.2.4.1.5</td><td>Total residual liquid volume test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.2.6</td><td>Stability test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.2.2</td><td>Sprayer tank fill scale test</td></tr>
<tr><td>SNI 8485 : 2018 Clause 6.2.4.1.8</td><td>Total volume test</td></tr>
<tr><td>SNI 8485 : 2018 Clause 6.2.4.1.9</td><td>Filling rate test</td></tr>
<tr><td>SNI 8485 : 2018 Clause 6.2.4.1.10</td><td>Emptying test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.2.9</td><td>Impact test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.2.3</td><td>Spraying test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.5</td><td>Serviceability test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.3</td><td>Continuous load test</td></tr>
<tr><td>SNI 8485 : 2023 Clause 6.3.4</td><td>Conformity test</td></tr>
</tbody>
</table>`;
