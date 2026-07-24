"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FloatingContactWidget } from "@/features/landing/floating-contact-widget";
import { LanguageSwitcher } from "@/features/landing/language-switcher";
const SCOPE_ROUTE = "/ruang-lingkup-pengujian";

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
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(link);
}

export function ScopeLandingPage() {
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
    const groups = Array.from(document.querySelectorAll<HTMLElement>(".scope-page .data-group"));
    const normalizedQuery = query.trim().toUpperCase();
    let foundAny = false;

    groups.forEach((group) => {
      const textContent = group.textContent ?? "";
      const matches = normalizedQuery === "" || textContent.toUpperCase().includes(normalizedQuery);
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
          <Link href="/" className="nav-brand">
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
              <Link href={SCOPE_ROUTE} className="nav-link active">
                Ruang Lingkup Pengujian
              </Link>
            </li>
            <li className="nav-dropdown">
              <details>
                <summary className="nav-link nav-dropdown-trigger">
                  Informasi <i className="fa-solid fa-chevron-down" />
                </summary>
                <div className="nav-dropdown-menu">
                  <Link href="/informasi" className="nav-dropdown-link">
                    Artikel <i className="fa-solid fa-newspaper" />
                  </Link>
                  <Link
                    href="/informasi/keluhan-dan-banding"
                    className="nav-dropdown-link"
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

      <main className="scope-main">
        <section className="scope-hero-section">
          <div className="scope-hero">
            <div className="hero-content">
              <h1 className="hero-title">Ruang Lingkup Pengujian</h1>
              <p className="hero-text">
                Daftar metode, bahan atau produk, dan jenis pengujian yang
                tersedia di GIS Laboratorium.
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
                    placeholder="Cari metode, bahan, atau parameter..."
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
                Data tidak ditemukan. Silakan coba kata kunci lain.
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
    </div>
  );
}

const SCOPE_TABLES_HTML = `<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Lingkup Akreditasi Lokasi 1</td></tr>
<tr><td class="header-kolom">Metode Pengujian</td><td class="header-kolom">Bahan/Produk</td><td class="header-kolom">Jenis Pengujian</td></tr>
</thead>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ; ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021, SNI 7069.1-2020</td><td rowspan="1">Minyak Lumas motor bensin 4 (empat) langkah kendaraan bermotor</td><td>Pour Point, Copper test, Ash Sulfated, Kinematic Viscosity 100&#39;, Total Base Number,Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ;ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021; SNI 7069.2-2021</td><td rowspan="1">minyak Lumas motor bensin 4 (empat) langkah sepeda motor</td><td>Pour Point, Copper test, Ash Sulfated, Kinematic Viscosity 100&#39;, Total Base Number,Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D874:2023 ; ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021;SNI 7069.3-2020</td><td rowspan="1">minyak lumas motor bensin 2 (dua) langkah dengan pendngin udara</td><td>Ash sulfated, Kinematic Viscosity 100&#39;, Total Base Number,Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2019; ASTM D445:2021; ASTM D92:2018 ;SNI 7069.4-2020</td><td rowspan="1">Minyak lumas motor bensin 2 (dua) langkah dengan pendngin air</td><td>copper test, Kinematic Viscosity 100&#39;, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ; ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021; SNI 7069.5-2021</td><td rowspan="1">Minyak lumas motor diesel putaran tinggi</td><td>Pour Point, Copper test, Ash Sulfated, Kinematic Viscosity 100&#39;, Total Base Number,Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2019 ; ASTM D445:2021, ASTM D92:2018; SNI 7069.6-2021</td><td rowspan="1">Minyak lumas roda gigi trasnmisi manual dan gardan untuk kendaraan bermotor</td><td>copper test, Kinematic Viscosity 100&#39;, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2019 ;ASTM D445:2021, ASTM D92:2018; ASTM D4052:2022; SNI 7069.7-2021</td><td rowspan="1">Mnyak Lumas Transmisi Otomatis</td><td>copper test, Kinematic Viscosity 100&#39;, Flashpoint COC, Density</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2019 ;ASTM D445:2021, ASTM D92:2018; SNI 7069.9-2016</td><td rowspan="1">Minyak Lumas Hidrolik Industri Jenis Anti Aus</td><td>copper test,Kinematic Viscosity 40&#39;, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>D130 : 2020 ; ASTM D445:2021, ASTM D92:2018; SNI 7069.10-2017</td><td rowspan="1">Minyak lumas roda gigi industri tertutup</td><td>copper test,Kinematic Viscosity 400&#39;, Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ; ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021; SNI 7069.11-2018</td><td rowspan="1">Minyak Lumas motor diesel putaran sedang</td><td>Pour Point, Copper test, Ash Sulfated, Kinematic Viscosity 100&#39;, Total Base Number,Flashpoint COC</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D97-17b:2022, D130 : 2019, D874:2023 ;ASTM D445:2021, ASTM D92:2018, ASTM D2896:2021; SNI 7069.12-2018</td><td rowspan="1">Mnyak Lumas motor diesel putaran rendah</td><td>Pour Point, Copper test, Ash Sulfated, Kinematic Viscosity 100&#39;, Total Base Number,Flashpoint COC</td></tr>
</tbody>
</table>

<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Lingkup Akreditasi Lokasi 2</td></tr>
<tr><td class="header-kolom">Metode Pengujian</td><td class="header-kolom">Bahan/Produk</td><td class="header-kolom">Jenis Pengujian</td></tr>
</thead>
<tbody class="data-group">
<tr><td>AOCS Official Method Ca 3a-46, Revised 2021</td><td rowspan="2">Crude Palm Oil</td><td>Kadar Kotoran</td></tr>
<tr><td>AOCS Official Method Cd 1d-92, Revised 2022</td><td>Bilangan Iodine</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>MPOB-K1.1 2024</td><td rowspan="2">Palm Kernel</td><td>Kadar Kotoran</td></tr>
<tr><td>MPOB-K.6 2024</td><td>Kadar air dan Bahan mudah menguap</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>AOCS Official Method Ca2c-25, 2017</td><td rowspan="4">RBD Pam Olein</td><td>Kadar air dan Bahan mudah menguap</td></tr>
<tr><td>AOCS Official Method Ca 3a-46, Revised 2021</td><td>Kadar Kotoran</td></tr>
<tr><td>AOCS Official Method Cd 1d-92, Revised 2022</td><td>Bilangan Iodine</td></tr>
<tr><td>AOCS Official Method Ca 5a-40, 2017</td><td>Asam Lemak Bebas (FFA)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 2803:2012 Butir 6.4.2</td><td rowspan="6">Pupuk NPK Padat</td><td>Kalium Sebagai K2O</td></tr>
<tr><td>SNI 2803:2012</td><td>Jumlah Kadar N, P2O%, K2O</td></tr>
<tr><td>SNI 2803:2012 Butir 6.6.1</td><td>Merkuri (Hg)</td></tr>
<tr><td>SNI 2803:2012 Butir 6.6.2</td><td>Kadmium (Cd)</td></tr>
<tr><td>SNI 2803:2012 Butir 6.6.3</td><td>Timbal (Pb)</td></tr>
<tr><td>SNI 2803:2012Butir 6.7</td><td>Arsen (as)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 281:2010, butir 6.4</td><td rowspan="1">Pupuk Urea</td><td>Penentuan ukuran butiran/gelintiran. Ukuran (1,00 mm - 3,35 mm &amp; 2,00 mm - 4,75 mm</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-2805-2005 / AOAC Official Method 22th, 2023 butir 2.6.37</td><td rowspan="2">Pupuk KCl (Mauriate of Potash)</td><td>Kadar K2O</td></tr>
<tr><td>SNI 02-2805-2005 Butir 6.2 / AOAC Official Method 22th, 2023 butir 2.2.01</td><td>Kadar Air</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-3776-2005 Butir 6.1.1/ AOAC Official Method 22th, 2023 butir 2.3.01 dan 2.3.02</td><td rowspan="2">Pupuk Fosfat Alam Untuk Pertanian</td><td>Total P2O5</td></tr>
<tr><td>SNI 02-3776-2005 Butir 6.2 / AOAC Official Method 22th, 2023 butir 2.2.01</td><td>Kadar Air</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-1760-2005 Butir 6.4 / AOAC Official Method 22th, 2023 butir 2.2.01</td><td rowspan="1">Pupuk Ammonium Sulfat (ZA)</td><td>Kadar Air</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-0086-2005 Butir 6.1.1/ AOAC Official Method 22th, 2023 butir 2.3.01 dan 2.3.02</td><td rowspan="3">Pupuk TSP</td><td>P2O5 Total (dry basis)</td></tr>
<tr><td>SNI 02-0086-2005 Butir 6.1.3 / AOAC Official Method 22th, 2023 butir 2.3.06 dan 2.3.09</td><td>P2O5 Larut dalam Air (dry basis)</td></tr>
<tr><td>SNI 02-0086-2005 Butir 6.3 / AOAC Official Method 22th, 2023 butir 2.2.01</td><td>Kadar Air</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-3769-2005, butir 6.3</td><td rowspan="1">Pupuk SP36</td><td>Kadar Asam Bebas sebagai H3PO4 (dry basis)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 9088:2022, Lampiran A.4.1</td><td rowspan="2">Minyak Makan Merah</td><td>Kadmium (Cd)</td></tr>
<tr><td>SNI 9088:2022, Lampiran A.4.1</td><td>Timbal (Pb)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 7709:2019, Lampiran A.9.1</td><td rowspan="2">Minyak Goreng Sawit</td><td>Kadmium (Cd)</td></tr>
<tr><td>SNI 7709:2019, Lampiran A.9.1</td><td>Timbal (Pb)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-4959-1999</td><td rowspan="4">Pupuk Borat</td><td>Boron Oksida (B2O3)</td></tr>
<tr><td>SNI 02-4959-1999 (for intended use only)</td><td>Sulfat (SO4)</td></tr>
<tr><td>SNI 02-4959-1999 (for intended use only)</td><td>Kadmium (Cd)</td></tr>
<tr><td>AOAC edisi 22 tahun 2023 butir 2.2.01</td><td>Kadar Air</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 02-2807-1992, Butir 5.1</td><td rowspan="3">Pupuk Kieserit</td><td>Kadar Magnesium sebagai MgO</td></tr>
<tr><td>SNI 02-2807-1992, Butir 5.2</td><td>Kadar belerang sebagai S</td></tr>
<tr><td>SNI 02-2807-1992, Butir 5.3</td><td>Kadar air</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="2">Minyak lumas motor bensin 4 (empat) langkah Kendaraan bermotor</td><td>Kalsium (Ca), Magnesium (Mg), Seng (Zn)</td></tr>
<tr><td>ASTM D 4951-14 (Reapproved 2019)</td><td>Phosporous (P), Sulfur (S)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="2">Minyak lumas motor bensin 4 (empat) langkah sepeda motor</td><td>Kalsium (Ca), Magnesium (Mg), Seng (Zn)</td></tr>
<tr><td>ASTM D 4951-14 (Reapproved 2019)</td><td>Phosporous (P)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="1">Minyak Lumas Motor Bensin 2 langkah dengan Pendingin Udara</td><td>Kalsium (Ca)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="2">Minyak Lumas Motor Diesel Putaran Tinggi</td><td>Kalsium (Ca), Magnesium (Mg), Seng (Zn)</td></tr>
<tr><td>ASTM D 4951-14 (Reapproved 2019)</td><td>Phosporous (P), Sulfur (S)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="2">Minyak lumas transmisi otomatis</td><td>Kalsium (Ca), Magnesium (Mg), Seng (Zn)</td></tr>
<tr><td>ASTM D 4951-14 (Reapproved 2019)</td><td>Phosporous (P), Sulfur (S)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="1">Pelumas Industri (minyak lumas motor diesel putaran sedang)</td><td>Kalsium (Ca), Magnesium (Mg), Seng (Zn)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>ASTM D 5185-18</td><td rowspan="1">Pelumas Industri (minyak lumas motor diesel putaran rendah)</td><td>Kalsium (Ca), Magnesium (Mg), Seng (Zn)</td></tr>
</tbody>
</table>

<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Lingkup Akreditasi Air &amp; Lingkungan</td></tr>
<tr><td class="header-kolom">Metode Pengujian</td><td class="header-kolom">Bahan/Produk</td><td class="header-kolom">Jenis Pengujian</td></tr>
</thead>
<tbody class="data-group">
<tr><td>SNI 06-6860-2002</td><td rowspan="27">Air Sungai, Air Danau, Air Muara, Air Rawa, Air Akuifer, Air Situ, Air Mata Air, Air Waduk, Air Sumur</td><td>Bau</td></tr>
<tr><td>SNI 6989.80:2011</td><td>Warna</td></tr>
<tr><td>SNI 6989.11:2019</td><td>pH</td></tr>
<tr><td>SNI 06-698.-23-2005</td><td>Temperatur</td></tr>
<tr><td>SNI 6989.27:2019</td><td>Padatan terlarut total (TDS)</td></tr>
<tr><td>SNI 6989.3:2019</td><td>Padatan tersuspensi total (TSS)</td></tr>
<tr><td>SNI 6989.2:2019</td><td>Kebutuhan oksigen kimiawi (COD)</td></tr>
<tr><td>SNI 6989.20:2019</td><td>Sulfat</td></tr>
<tr><td>SNI 6989.19:2009</td><td>Klorida</td></tr>
<tr><td>SNI 06-6989.9-2004</td><td>Nitrit</td></tr>
<tr><td>SNI 06-6989.30-2005</td><td>Amoniak</td></tr>
<tr><td>SNI 06-6989.29-2005</td><td>Fluorida</td></tr>
<tr><td>SNI 6989.71:2009</td><td>Kromium heksavalen</td></tr>
<tr><td>SNI 06-6989.51-2005</td><td>MBAS/ Detergen Total</td></tr>
<tr><td>SNI 6989.10-2011</td><td>Minyak dan Lemak</td></tr>
<tr><td>SNI 06.6989.12-2004</td><td>Kesadahan</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Barium (Ba) Terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Boron (B) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Besi (Fe) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Kadmium (Cd) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Kobalt (Co) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Mangan (Mn) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Nikel (Ni) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Seng (Zn) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Tembaga (Cu) terlarut</td></tr>
<tr><td>SNI 6989-82:2019</td><td>Kromium (Cr) Terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Timbal (Pb) terlarut</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 06-6989.23-2005</td><td rowspan="9">Air Bersih</td><td>Temperatur/ Suhu</td></tr>
<tr><td>SNI 6989.27:2019</td><td>Padatan terlarut total (TDS)</td></tr>
<tr><td>SNI 6989.80:2011</td><td>Warna</td></tr>
<tr><td>SNI 06-6860-2002</td><td>Bau</td></tr>
<tr><td>SNI 6989.11:2019</td><td>pH</td></tr>
<tr><td>SNI 06-6989.9-2004</td><td>Nitrit</td></tr>
<tr><td>SNI 6989.71:2009</td><td>Kromium valensi 6 (Cr6+)</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Besi (Fe) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Mangan (Mn) terlarut</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 6989.11:2019</td><td rowspan="21">Air Limbah</td><td>pH</td></tr>
<tr><td>SNI 06-6989.23-2005</td><td>Temperatur/ Suhu</td></tr>
<tr><td>SNI 6989.27:2019</td><td>Padatan terlarut total (TDS)</td></tr>
<tr><td>SNI 6989.3:2019</td><td>Padatan tersuspensi total (TSS)</td></tr>
<tr><td>SNI 6989.15:2019</td><td>Kebutuhan oksigen kimiawi (COD)</td></tr>
<tr><td>SNI 6989.20:2019</td><td>Sulfat</td></tr>
<tr><td>SNI 06-6989.9-2004</td><td>Nitrit</td></tr>
<tr><td>SNI 06-6989.30-2005</td><td>Amoniak</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Barium (Ba) Total</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Besi (Fe) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Kadmium (Cd) Total</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Kobalt (Co) total</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Mangan (Mn) terlarut</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Nikel (Ni) total</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Seng (Zn) total</td></tr>
<tr><td>SNI 6989-82:2018</td><td>Tembaga (Cu) total</td></tr>
<tr><td>SNI 6989-82:2019</td><td>Timbal (Pb) total</td></tr>
<tr><td>SNI 6989-82:2020</td><td>Kromium (Cr) total</td></tr>
<tr><td>SNI 6989.71:2009</td><td>Kromium heksavalen</td></tr>
<tr><td>SNI 6989.10-2011</td><td>Minyak dan Lemak</td></tr>
<tr><td>SNI 06-6989.5-2005</td><td>MBAS/ Detergen Total</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 3554:2015 Butir 3.2.1 / SNI 3553:2015 / SNI 6241:2015</td><td rowspan="25">Air Mineral/ Air Demineral</td><td>Bau dan Rasa</td></tr>
<tr><td>SNI 3554:2015 Butir 3.2.3 / SNI 3553:2015 / SNI 6241:2015</td><td>Warna</td></tr>
<tr><td>SNI 3554:2015 Butir 3.3 / SNI 3553:2015 / SNI 6241:2015</td><td>pH</td></tr>
<tr><td>SNI 3554:2015 Butir 3.5 / SNI 3553:2015 / SNI 6241:2015</td><td>Zat yang terlarut</td></tr>
<tr><td>SNI 3554:2015 Butir 3.11 / SNI 3553:2015 / SNI 6241:2015</td><td>Sulfat</td></tr>
<tr><td>SNI 3554:2015 Butir 3.12 / SNI 3553:2015 / SNI 6241:2015</td><td>Klorida</td></tr>
<tr><td>SNI 3554:2015 Butir 3.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Nitrat</td></tr>
<tr><td>SNI 3554:2015 Butir 3.9 / SNI 3553:2015 / SNI 6241:2015</td><td>Nitrit</td></tr>
<tr><td>SNI 3554:2015 Butir 3.10 / SNI 3553:2015 / SNI 6241:2015</td><td>Amonium (NH4)</td></tr>
<tr><td>SNI 3554:2015 Butir 3.13 / SNI 3553:2015 / SNI 6241:2015</td><td>Fluorida</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Barium (Ba) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Boron (B) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Arsen (As) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Besi (Fe) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Kadmium (Cd) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Mangan (Mn) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Kromium (Cr) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Tembaga (Cu) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Timbal (Pb) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.21.2 / SNI 3553:2015 / SNI 6241:2015</td><td>Perak (Ag) Total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Selenium (Se) total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Kobalt (Co) total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.26.8 / SNI 3553:2015 / SNI 6241:2015</td><td>Seng (Zn) total</td></tr>
<tr><td>SNI 3554:2015 Butir 3.27.2 / SNI 3553:2015 / SNI 6241:2015</td><td>Detergen</td></tr>
<tr><td>SNI 3554:2015 Butir 3.6 / SNI 3553:2015 / SNI 6241:2015</td><td>Zat Organik (angka KMnO4)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 6989-23-2005</td><td rowspan="3">Air Minum</td><td>Temperatur/ Suhu</td></tr>
<tr><td>SNI 06.6989.12-2004</td><td>Kesadahan</td></tr>
<tr><td>SNI 6989.71:2009</td><td>Kromium valensi 6 (Cr6+)</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 8995:2021</td><td rowspan="1">Air Sungai, Air Danau, Air Muara, Air Rawa, Air Akuifer, Air Situ, Air Mata Air, Air Waduk, Air Sumur</td><td>Pengambilan Contoh Uji Air Untuk Pengujian Fisika dan Kimia</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 8990:2021</td><td rowspan="1">Air Limbah</td><td>Pengambilan Contoh Uji Air Untuk Pengujian Fisika dan Kimia</td></tr>
</tbody>
</table>

<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Lingkup Akreditasi Udara &amp; Emisi</td></tr>
<tr><td class="header-kolom">Metode Pengujian</td><td class="header-kolom">Bahan/Produk</td><td class="header-kolom">Jenis Pengujian</td></tr>
</thead>
<tbody class="data-group">
<tr><td>SNI 7119-7:2017</td><td rowspan="11">Udara Ambient</td><td>Sulfur Dioksida (SO2)</td></tr>
<tr><td>SNI 7119-2:2017</td><td>Nitrogen Dioksida (NO2)</td></tr>
<tr><td>SNI 19-7119.1-2005</td><td>Amoniak (NH3)</td></tr>
<tr><td>SNI 7119-3:2017</td><td>Partikulat Debu (TSP) 24 Jam</td></tr>
<tr><td>SNI 7119-15:2016</td><td>Partikulat Debu (PM 10) 24 Jam</td></tr>
<tr><td>SNI 7119-14:2016</td><td>Partikulat Debu (PM 2,5) 24 Jam</td></tr>
<tr><td>SNI 7119-8:2017</td><td>Ozon (O3)</td></tr>
<tr><td>SNI 7119-4:2017 (ICP-OES)</td><td>Timbal (Pb)</td></tr>
<tr><td>SNI 8427:2017</td><td>Kebisingan 24 Jam</td></tr>
<tr><td>SNI 19-7119.6-2005</td><td>Penentuan lokasi pengambilan contoh uji pemantauan kualitas udara ambien</td></tr>
<tr><td>SNI 19-7119.9-2005</td><td>Penentuan lokasi pengambilan contoh uji pemantauan kualitas udara roadside</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 19.7117.11-2005</td><td rowspan="14">Emisi Sumber Tidak Bergerak</td><td>Opasitas</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Nitrogen Dioksida (NO2)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Sulfur Dioksida (SO2)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Sulfur (H2S)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Nitrogen Oksida (NO)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Oksigen (O2)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Karbon Dioksida (CO2)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Karbon Monoksida (CO)</td></tr>
<tr><td>PO-GIS-ESTB-001 (Direct Reading)</td><td>Methane (CH4)</td></tr>
<tr><td>SNI 7117.13-2009</td><td>Penentuan lokasi dan titk-titik lintas untuk pengambilan contoh uji partikulat dan kecepatan linier</td></tr>
<tr><td>SNI 7117.14-2009</td><td>Kecepatan Linier</td></tr>
<tr><td>SNI 7117.15-2009</td><td>Penentuan berat molekul kering (Gas Buang)</td></tr>
<tr><td>SNI 7117.16-2009</td><td>Kadar Air (% Volume)</td></tr>
<tr><td>SNI 7117.17-2009</td><td>Partikulat Secara Isokinetik</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 7119-7:2017, SNI 7119-2:2017, SNI 19-7119.1-2005, SNI 7119-3:2017, SNI 7119-15:2016, SNI 7119-14:2016, SNI 7119-8:2017, SNI 7119-4:2017, SNI 8427:2017</td><td rowspan="1">Udara Ambient</td><td>Pengambilan Contoh Uji Udara Ambient</td></tr>
</tbody>
<tbody class="data-group">
<tr><td>SNI 7117.13-2009, SNI 7117.14-2009, SNI 7117.15-2009, SNI 7117.16-2009, SNI 7117.17-2009, PO-GIS-ESTB-001 (Direct Reading)</td><td rowspan="1">Udara Emisi Sumber Tidak Bergerak (Cerobong)</td><td>Pengambilan Contoh Udara Emisi Sumber Tidak Bergerak (Cerobong)</td></tr>
</tbody>
</table>

<table><colgroup> <col class="c1" /> <col class="c2" /> <col class="c3" /></colgroup>
<thead>
<tr><td class="header-judul" colspan="3">Lingkup Akreditasi Alat Sprayer</td></tr>
<tr><td class="header-kolom">Metode Pengujian</td><td class="header-kolom">Bahan/Produk</td><td class="header-kolom">Jenis Pengujian</td></tr>
</thead>
<tbody class="data-group">
<tr><td></td><td rowspan="72">Alat Pemeliharaan Tanaman - Sprayer Gendong Elektrik</td><td>Uji Verifikasi</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.2</td><td>Pengukuran Dimensi dan Spesifikasi :</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Panjang Tangki</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Lebar Tangki</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Tinggi berikut ruang pompa dan baterai</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.4 (Gravimetri)</td><td>Bobot kosong</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1.2c</td><td>Kapasitas tangki</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Tebal dinding tangki</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Diameter corong saringan pengisian</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1.1a</td><td>Ukuran lubang saringan pengisian</td></tr>
<tr><td>SNI 8485 : 2018, Butir 6.3.1.1b</td><td>Ukuran lubang saringan bawah (dasar tangki)</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Panjang selang</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Diameter luar selang</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Panjang pipa penyemprotan</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Diameter luar pipa penyemprotan</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Lebar sabuk gendong</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Tebal busa alas bahu</td></tr>
<tr><td></td><td>Tangki</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1.2a</td><td>Terbuat dari bahan baja tahan karat (stainless steel) atau plastik (HDPE )</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.1 (Visual)</td><td>Untuk tangki plastik, batas dan permukaan pengisian cairan harus mudah terlihat selama proses pengisian.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Dilengkapi dengan corong saringan pengisian berdiameter minimum 50 mm, dengan ukuran lubang saringan 0,1 mm sampai 1,0 mm</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Tangki mempunyai lubang saringan bawah (dasar tangki), dengan ukuran lubang mesh 32 sampai mesh 48</td></tr>
<tr><td></td><td>Ruang baterai dan pompa</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1.3</td><td>Terbuat dari bahan baja tahan karat (stainless steel) tebal minimum 1,0 mm, atau plastik (HDPE) tebal minimum 2,5 mm</td></tr>
<tr><td></td><td>Tutup Tangki</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1.2b</td><td>Tutup tangki (lid ) harus mudah ditutup oleh operator yang memakai sarung tangan dan mempunyai seal yang efektif.</td></tr>
<tr><td></td><td>Pipa semprot</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.2 (Visual)</td><td>Pipa penyemprot harus mudah dilepaskan dari sambungan agar dapat disimpan jika tidak digunakan.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.3 (Visual)</td><td>Pipa penyemprot tidak boleh mempunyai bagian bengkok yang tajam dalam semua posisi kerja normal</td></tr>
<tr><td></td><td>Nosel</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.4 (Visual)</td><td>Disediakan minimal 2 tipe nosel dengan bentuk penyemprotan, tipe F (kipas pipih), tipe FE (kipas datar), atau tipe Kerucut</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.5 (Visual)</td><td>Badan nosel mempunyai ulir tipe standar</td></tr>
<tr><td></td><td>Katup buka tutup Selang semprot</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.6 (Visual)</td><td>Saluran-saluran tekanan harus dilengkapi dengan katup-katup yang dapat menutup dengan cepat (seketika).</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.7 (Visual)</td><td>Katup harus menutup ketika dilepaskan dan harus tidak terkunci ketika dalam posisi buka</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.8 (Visual)</td><td>Pembukaan yang tidak diinginkan dari katup penutup harus minimum, misalnya akibat gaya atau bagian penguncian.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.9 (Visual)</td><td>Katup penutup harus membuka dan menutup secara tepat, dan harus diberi tanda buka dan tutup.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.10 (Visual)</td><td>Pegangan katup penutup harus nyaman dan mudah digenggam oleh tangan operator yang memakai sarung tangan.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.11 (Visual)</td><td>Katup penutup harus dapat dioperasikan dengan nyaman tanpa melelahkan tangan operator.</td></tr>
<tr><td></td><td>Selang semprot</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.12 (Visual)</td><td>Bahan selang bisa berupa karet atau bahan sintetis</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.13 (Visual)</td><td>Selang disambungkan ke penyambung (connector)dan tutupsekrup selang (screw cap), dan ke pengikat (clamp).</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.14 (Visual)</td><td>Bahan selang yang terbuat dari karet boleh memiliki satu atau lebih lapisan serat yang diperkeras.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.15 (Visual)</td><td>Penggunaan sambungan tipe ulir harus cukup kuat dan dapat dikencangkan dengan ibu jari dan tidak bocor ketika dioperasikan pada tekanan maksimum.</td></tr>
<tr><td></td><td>Sabuk gendong</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.16 (Visual)</td><td>Sabuk gendong (strap) dan alas bahu sabuk gendong, harus kuat menahan beban dan terbuat dari bahan yang tidak menyerap (polyester braid atau polypropylene multi filament yarn)</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.17 (Visual)</td><td>Minimal terdapat satu sabuk gendong, lengkap dengan bagian yang dapat dengan cepat dipasang dan dilepas dengan satu tangan</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.18 (Visual)</td><td>Tidak boleh longgar sendiri, misalnya akibat gaya gravitasi, atau akibat adanya gerakan</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.19 (Visual)</td><td>Harus dapat diatur sesuai postur tubuh operator.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.20 (Visual)</td><td>Suatu mekanisme semacam pengancing harus tersedia untuk melepas dengan cepat ketika dalam keadaan darurat.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.21 (Visual)</td><td>Tidak boleh ada kerusakan pada sabuk gendong dan titik-titik fiksasi yang mengurangi fungsi sebagai konsekuensi uji ketahanan sabuk gendong.</td></tr>
<tr><td></td><td>Saringan</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Ukuran lubang saringan harus lebih kecil dari diameter tersempit dari ukuran nosel terkecil yang digunakan.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.22 (Visual)</td><td>Untuk saringan atas terbuat baja anti karat atau plastik, dan saringan pada dasar tangki terbuat baja anti karat,dandapat dilepas, atau diganti, serta dibersihkan.</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.5.23 (Visual)</td><td>Desain saringan memungkinkan mengisi tangki dengan cepat tanpa tumpah dan dilengkapi ventilasi udara</td></tr>
<tr><td></td><td>Penyambung dan penyatu</td></tr>
<tr><td>SNI 8485 : 2023, Butir 6.3.1 dan PO-GIS-PTN-001 Butir 5.1.3 (Dimensi)</td><td>Diameter dan ukuran ulirnya sama</td></tr>
<tr><td></td><td>Uji Unjuk Kerja</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.2.1</td><td>Uji debit penyemprotan</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.2.7</td><td>Uji sabuk gendong dan titik-titik fiksasinya</td></tr>
<tr><td>SNI 8485 : 2018 Butir 6.2.4.1.4</td><td>Uji volume deposit permukaan luar</td></tr>
<tr><td>SNI 8485 : 2018 Butir 6.2.4.1.5</td><td>Uji volume cairan sisa total</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.2.6</td><td>Uji kestabilan</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.2.2</td><td>Uji skala isi tangki sprayer</td></tr>
<tr><td>SNI 8485 : 2018 Butir 6.2.4.1.8</td><td>Uji volume total</td></tr>
<tr><td>SNI 8485 : 2018 Butir 6.2.4.1.9</td><td>Uji laju pengisian</td></tr>
<tr><td>SNI 8485 : 2018 Butir 6.2.4.1.10</td><td>Uji pengosongan</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.2.9</td><td>Uji bentur</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.2.3</td><td>Uji penyemprotan</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.5</td><td>Uji Pelayanan</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.3</td><td>Uji Beban Berkesinambungan</td></tr>
<tr><td>SNI 8485 : 2023 Butir 6.3.4</td><td>Uji Kesesuaian</td></tr>
</tbody>
</table>`;
