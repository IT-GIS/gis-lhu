"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

const CONTACT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .contact-page {
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

  .contact-page * {
    box-sizing: border-box;
  }

  .contact-page a {
    color: inherit;
    text-decoration: none;
  }

  .contact-page ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .contact-page .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .contact-page .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-soft);
  }

  .contact-page .glass-dark {
    background: var(--glass-dark-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-dark-border);
    color: var(--white);
  }

  .contact-page .navbar-wrapper {
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

  .contact-page .navbar-wrapper.scrolled {
    top: 12px;
  }

  .contact-page .navbar {
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

  .contact-page .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 1.25rem;
    color: var(--primary);
    white-space: nowrap;
  }

  .contact-page .nav-brand img {
    height: 28px;
    width: auto;
    transform: scale(1.8);
    transform-origin: left center;
    margin-right: 36px;
  }

  .contact-page .nav-menu {
    display: flex;
    gap: 8px;
  }

  .contact-page .nav-link {
    display: block;
    padding: 8px 16px;
    border-radius: var(--radius-pill);
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--text-muted);
    transition: var(--transition);
    white-space: nowrap;
  }

  .contact-page .nav-link:hover {
    color: var(--primary);
    background: rgba(0, 112, 243, 0.05);
  }

  .contact-page .nav-link.active {
    background: rgba(0, 223, 216, 0.15);
    color: var(--secondary);
    font-weight: 600;
  }

  .contact-page .mobile-menu-btn {
    display: none;
    font-size: 1.5rem;
    color: var(--primary);
    background: none;
    border: none;
    cursor: pointer;
  }

  .contact-page .contact-main {
    padding-top: 0;
  }

  .contact-page .contact-hero-section {
    max-width: none;
    padding: 0;
  }

  .contact-page .contact-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 0;
    margin: 0;
    padding-top: 100px;
    background:
      linear-gradient(90deg, rgba(10, 37, 64, 0.88), rgba(10, 37, 64, 0.5), rgba(250, 252, 255, 0.2)),
      url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1800') center/cover;
  }

  .contact-page .contact-hero::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 40%;
    background: linear-gradient(0deg, rgba(250, 252, 255, 0.96), transparent);
    z-index: 1;
  }

  .contact-page .hero-content {
  position: relative;
  z-index: 2;
  width: min(1280px, 100%);
  margin: 0 auto;
  padding: clamp(72px, 8vw, 120px) clamp(24px, 7vw, 88px);
  color: var(--white);
}

  .contact-page .eyebrow {
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

.contact-page .hero-title {
  color: var(--white);
  max-width: 780px;
  font-size: clamp(2.2rem, 4.6vw, 4.2rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.045em;
  margin: 0 0 22px;
  text-wrap: balance;
}

.contact-page .hero-text {
  max-width: 640px;
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(0.98rem, 1.15vw, 1.08rem);
  font-weight: 650;
  line-height: 1.75;
  margin: 0;
}

  .contact-page .quick-contact {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: min(1280px, calc(100% - 48px));
    margin: -58px auto 0;
    position: relative;
    z-index: 5;
  }

  .contact-page .quick-card {
    min-height: 154px;
    padding: 28px;
    border-radius: var(--radius-md);
    transition: var(--transition);
  }

  .contact-page .quick-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-hover);
  }

  .contact-page .quick-icon {
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    color: var(--secondary);
    background: rgba(0, 112, 243, 0.1);
    font-size: 1.25rem;
    margin-bottom: 18px;
  }

  .contact-page .quick-label {
    color: var(--primary);
    font-size: 1.05rem;
    font-weight: 800;
    margin: 0 0 8px;
  }

  .contact-page .quick-value {
    color: #405a70;
    font-weight: 700;
    overflow-wrap: anywhere;
    margin: 0;
  }

  .contact-page .section {
    padding: 96px 0;
  }

  .contact-page .section-header {
    display: grid;
    grid-template-columns: minmax(420px, 0.95fr) minmax(420px, 1.05fr);
    gap: clamp(32px, 4vw, 56px);
    align-items: center;
    margin-bottom: 42px;
  }

  .contact-page .section-title {
    color: var(--primary);
    font-size: clamp(2.6rem, 3.7vw, 4rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.04em;
    margin: 0;
    max-width: 660px;
  }

  .contact-page .section-copy {
    color: #24445f;
    font-size: clamp(1rem, 1.25vw, 1.22rem);
    font-weight: 650;
    line-height: 1.75;
    margin: 0;
    max-width: 720px;
  }

  .contact-page .office-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .contact-page .office-card {
    position: relative;
    min-height: 430px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    border-radius: var(--radius-lg);
    isolation: isolate;
  }

  .contact-page .office-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(10, 37, 64, 0.12), rgba(10, 37, 64, 0.86));
    z-index: -1;
  }

  .contact-page .office-card.jakarta {
    background: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200') center/cover;
  }

  .contact-page .office-card.surabaya {
    width: min(100%, 1120px);
    margin: 0 auto;
    background: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600') center/cover;
  }

  .contact-page .office-body {
    width: min(100%, 760px);
    padding: clamp(34px, 4vw, 52px);
    color: var(--white);
  }

  .contact-page .office-kicker {
    display: inline-flex;
    margin-bottom: 10px;
    padding: 6px 12px;
    border-radius: 999px;
    color: var(--primary);
    background: rgba(255, 255, 255, 0.86);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .contact-page .office-title {
    color: var(--white);
    font-size: clamp(2rem, 2.8vw, 3rem);
    font-weight: 800;
    line-height: 1.08;
    margin: 0 0 22px;
  }

  .contact-page .office-list {
    display: grid;
    gap: 15px;
    max-width: 680px;
  }

  .contact-page .office-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: rgba(255, 255, 255, 0.88);
    font-weight: 650;
  }

  .contact-page .office-list i {
    width: 20px;
    margin-top: 5px;
    color: var(--accent);
  }

  .contact-page .contact-panel {
    display: grid;
    grid-template-columns: minmax(280px, 0.86fr) minmax(0, 1.14fr);
    gap: 28px;
    align-items: stretch;
  }

  .contact-page .contact-info-panel,
  .contact-page .form-panel {
    border-radius: var(--radius-lg);
    padding: 38px;
  }

  .contact-page .contact-info-panel {
    color: var(--white);
    background:
      linear-gradient(135deg, rgba(10, 37, 64, 0.96), rgba(0, 88, 188, 0.84)),
      url('https://images.unsplash.com/photo-1581092919535-7146ff1a590b?auto=format&fit=crop&q=80&w=1200') center/cover;
    box-shadow: var(--shadow-soft);
  }

  .contact-page .contact-info-panel .section-title {
    color: var(--white);
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-bottom: 18px;
  }

  .contact-page .contact-info-panel p {
    color: rgba(255, 255, 255, 0.82);
    font-weight: 600;
    margin: 0 0 28px;
  }

  .contact-page .info-list {
    display: grid;
    gap: 18px;
  }

  .contact-page .info-item {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
  }

  .contact-page .info-item i {
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.12);
    color: var(--accent);
  }

  .contact-page .info-item strong {
    display: block;
    color: var(--white);
    font-weight: 800;
    margin-bottom: 4px;
  }

  .contact-page .info-item span {
    color: rgba(255, 255, 255, 0.82);
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  .contact-page .form-panel {
    position: relative;
    overflow: hidden;
  }

  .contact-page .form-panel::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: rgba(0, 223, 216, 0.12);
    pointer-events: none;
  }

  .contact-page .form-title {
    position: relative;
    color: var(--primary);
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 10px;
  }

  .contact-page .form-copy {
    position: relative;
    color: var(--text-muted);
    font-weight: 600;
    margin: 0 0 28px;
  }

  .contact-page .contact-form {
    position: relative;
    display: grid;
    gap: 18px;
  }

  .contact-page .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .contact-page .field {
    display: grid;
    gap: 8px;
  }

  .contact-page .field label {
    color: var(--primary);
    font-size: 0.88rem;
    font-weight: 800;
  }

  .contact-page .field input,
  .contact-page .field textarea {
    width: 100%;
    border: 1px solid rgba(10, 37, 64, 0.1);
    border-radius: 18px;
    padding: 15px 16px;
    color: var(--text-dark);
    background: rgba(255, 255, 255, 0.82);
    font: inherit;
    outline: none;
    transition: var(--transition);
  }

  .contact-page .field textarea {
    min-height: 166px;
    resize: vertical;
  }

  .contact-page .field input:focus,
  .contact-page .field textarea:focus {
    border-color: rgba(0, 112, 243, 0.45);
    box-shadow: 0 0 0 4px rgba(0, 112, 243, 0.1);
  }

  .contact-page .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 24px;
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 800;
    transition: var(--transition);
  }

  .contact-page .btn-primary {
    color: var(--white);
    background: linear-gradient(135deg, var(--secondary), var(--accent));
    box-shadow: 0 16px 34px -22px rgba(0, 112, 243, 0.85);
  }

  .contact-page .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }

  .contact-page .form-message {
    display: none;
    color: #0f766e;
    font-weight: 800;
    margin: 0;
  }

  .contact-page .form-message.active {
    display: block;
  }

  .contact-page .map-section {
    padding: 0 0 96px;
  }

  .contact-page .map-shell {
    overflow: hidden;
    border-radius: var(--radius-lg);
    min-height: 420px;
  }

  .contact-page .map-shell iframe {
    width: 100%;
    height: 420px;
    display: block;
    border: 0;
    filter: saturate(0.98) contrast(1.02);
  }

  .contact-page .footer {
    position: relative;
    padding: 80px 0 40px;
    background: linear-gradient(135deg, var(--primary), #0e4e8a);
    color: var(--white);
    overflow: hidden;
  }

  .contact-page .footer-panel {
    position: relative;
    z-index: 10;
    padding: 60px;
    border-radius: var(--radius-lg);
  }

  .contact-page .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 40px;
  }

  .contact-page .footer-col-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 24px;
  }

  .contact-page .footer-text {
    color: var(--light-blue);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .contact-page .footer-link {
    color: var(--light-blue);
    transition: var(--transition);
    display: block;
    margin-bottom: 12px;
  }

  .contact-page .footer-link:hover {
    color: var(--accent);
    transform: translateX(5px);
  }

  .contact-page .newsletter-form {
    display: flex;
    margin-top: 16px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-pill);
    padding: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .contact-page .newsletter-input {
    flex-grow: 1;
    min-width: 0;
    background: transparent;
    border: none;
    padding: 10px 16px;
    color: var(--white);
    outline: none;
    font-family: inherit;
  }

  .contact-page .newsletter-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .contact-page .newsletter-btn {
    background: var(--secondary);
    color: var(--white);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    flex: 0 0 auto;
  }

  .contact-page .newsletter-btn:hover {
    background: var(--accent);
    transform: scale(1.05);
  }

  .contact-page .footer-bottom {
    position: relative;
    z-index: 10;
    text-align: center;
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
  }

  .contact-page .whatsapp-widget {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1100;
  }

  .contact-page .whatsapp-toggle {
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

  .contact-page .whatsapp-window {
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

  .contact-page .whatsapp-window.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .contact-page .wa-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
    background: #075E54;
    color: #fff;
  }

  .contact-page .wa-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
  }

  .contact-page .wa-brand img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  .contact-page .wa-close {
    border: none;
    background: transparent;
    color: #fff;
    cursor: pointer;
    font-size: 1.1rem;
  }

  .contact-page .wa-body {
    padding: 18px;
    display: grid;
    gap: 14px;
  }

  .contact-page .wa-bubble {
    padding: 12px 14px;
    border-radius: 16px;
    color: #1f2937;
    background: #e8fff0;
    font-weight: 650;
  }

  .contact-page .wa-link {
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
    .contact-page .navbar {
      border-radius: 28px;
    }

    .contact-page .mobile-menu-btn {
      display: block;
    }

    .contact-page .nav-menu {
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

    .contact-page .nav-menu.active {
      display: flex;
    }

    .contact-page .nav-link {
      white-space: normal;
    }

    .contact-page .quick-contact,
    .contact-page .contact-panel,
    .contact-page .footer-grid {
      grid-template-columns: 1fr;
    }

    .contact-page .quick-contact {
      margin-top: 28px;
    }
  }

  @media (max-width: 860px) {
    .contact-page .section-header {
      grid-template-columns: 1fr;
      gap: 22px;
      align-items: start;
    }

    .contact-page .section-title {
      font-size: clamp(2.1rem, 8vw, 2.8rem);
      max-width: 100%;
      letter-spacing: -0.035em;
    }

    .contact-page .section-copy {
      max-width: 100%;
    }

    .contact-page .office-card.surabaya {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    .contact-page .container {
      padding: 0 18px;
    }

    .contact-page .nav-brand {
      font-size: 0.88rem;
      gap: 8px;
    }

    .contact-page .nav-brand img {
      width: 32px;
      height: auto;
      margin-right: 0;
      transform: none;
    }

.contact-page .hero-content {
  width: 100%;
  padding: 104px 22px 64px;
  max-width: 100vw;
}

.contact-page .hero-title {
  max-width: 520px;
  font-size: clamp(1.75rem, 7.2vw, 2.35rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.contact-page .hero-text {
  max-width: 520px;
  font-size: 0.95rem;
  line-height: 1.7;
}

    .contact-page .contact-hero {
      min-height: 100vh;
    }

    .contact-page .section {
      padding: 72px 0;
    }

    .contact-page .office-card {
      min-height: 470px;
    }

    .contact-page .office-body,
    .contact-page .contact-info-panel,
    .contact-page .form-panel,
    .contact-page .footer-panel {
      padding: 28px 22px;
    }

    .contact-page .office-title {
      font-size: 2rem;
    }

    .contact-page .form-row {
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

export function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [messageReady, setMessageReady] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    ensureLandingHeadAssets();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setMessageReady(false);
    setMessageError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Pesan belum bisa dikirim. Silakan coba lagi.");
      }

      form.reset();
      setMessageReady(true);
    } catch (error) {
      setMessageError(error instanceof Error ? error.message : "Pesan belum bisa dikirim. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <style dangerouslySetInnerHTML={{ __html: CONTACT_STYLES }} />
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
              <Link href="/ruang-lingkup-pengujian" className="nav-link">
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
              <Link href="/contact" className="nav-link active">
                Kontak
              </Link>
            </li>
          </ul>
          <button
            className="mobile-menu-btn"
            id="mobileMenuBtn"
            type="button"
            aria-label="Buka menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <i className="fa-solid fa-bars" />
          </button>
        </nav>
      </header>

      <main className="contact-main">
        <section className="contact-hero-section">
          <div className="contact-hero">
            <div className="hero-content">
              <span className="eyebrow">
                <i className="fa-solid fa-headset" /> Kontak kami
              </span>
              <h1 className="hero-title">
                Hubungi kami dan beri tahu kami bagaimana kami dapat membantu.
              </h1>
              <p className="hero-text">
                Tim Global Inspeksi Sistem siap membantu kebutuhan pengujian,
                koordinasi sampel, administrasi, dan informasi layanan
                laboratorium.
              </p>
            </div>
          </div>

          <div className="quick-contact">
            {/* Mengganti href tel ke nomor utama dan menampilkan 3 nomor tersusun */}
            <a className="quick-card glass" href="tel:+6281285328232">
              <span className="quick-icon">
                <i className="fa-solid fa-phone" />
              </span>
              <h2 className="quick-label">Telepon</h2>
              <p className="quick-value">
                +62 812-8532-8232 <br />
                +62 817-888-879 <br />
                +62 812-1704-7976
              </p>
            </a>

            <a
              className="quick-card glass"
              href="mailto:globalinspeksisistem@gmail.com"
            >
              <span className="quick-icon">
                <i className="fa-solid fa-envelope" />
              </span>
              <h2 className="quick-label">Email</h2>
              <p className="quick-value">globalinspeksisistem@gmail.com</p>
            </a>

            <a
              className="quick-card glass"
              href="https://wa.me/6281285328232?text=Halo%20GIS%20Laboratorium"
              target="_blank"
              rel="noopener"
            >
              <span className="quick-icon">
                <i className="fa-brands fa-whatsapp" />
              </span>
              <h2 className="quick-label">WhatsApp</h2>
              <p className="quick-value">Customer Service GIS</p>
            </a>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="eyebrow">
                  <i className="fa-solid fa-building" /> Office
                </span>
                <h2 className="section-title">
                  Kunjungi kantor GIS Laboratorium.
                </h2>
              </div>
              <p className="section-copy">
                GIS Laboratorium siap melayani Anda. Kunjungi kantor kami untuk
                konsultasi, pengiriman sampel, atau kebutuhan koordinasi
                pengujian secara langsung.
              </p>
            </div>

            {/* Mengubah grid menjadi 1 kolom, membatasi lebar maksimal, dan menaruhnya di tengah */}
            <div className="office-grid">
              <article className="office-card surabaya glass">
                <div className="office-body">
                  <span className="office-kicker">Branch Office</span>
                  <h3 className="office-title">Surabaya</h3>
                  <ul className="office-list">
                    <li>
                      <i className="fa-solid fa-phone" />
                      <span>+62 812-8532-8232</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope" />
                      <span>globalinspeksisistem@gmail.com</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-location-dot" />
                      <span>
                        Jl. Pahlawan No.2, Kwadengan Barat, Lemahputro, Kec.
                        Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61213
                      </span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="discuss">
          <div className="container">
            <div className="contact-panel">
              <aside className="contact-info-panel">
                <span className="eyebrow">
                  <i className="fa-solid fa-comments" /> Discuss with us
                </span>
                <h2 className="section-title">Contact info</h2>
                <p>
                  Hubungi kami untuk pertanyaan layanan, kebutuhan penawaran,
                  atau konsultasi ruang lingkup pengujian.
                </p>
                <div className="info-list">
                  <div className="info-item">
                    <i className="fa-solid fa-location-dot" />
                    <div>
                      <strong>Alamat</strong>
                      <span>
                        DELREY Biztown Blok B1 No. 5 Jl. Lingkar Bumi Botanika
                        Utara, Desa Lengkong Kulon, Kecamatan Pagedangan,
                        Kabupaten Tangerang, Provinsi Banten Kode Pos 15331
                      </span>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fa-solid fa-phone" />
                    <div>
                      <strong>Telepon</strong>
                      <span>
                        +62 812-8532-8232 <br />
                        +62 817-888-879 <br />
                        +62 812-1704-7976
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <i className="fa-solid fa-envelope" />
                    <div>
                      <strong>Email</strong>
                      <span>globalinspeksisistem@gmail.com</span>
                    </div>
                  </div>
                </div>
              </aside>

              <section
                className="form-panel glass"
                aria-labelledby="contactFormTitle"
              >
                <h2 className="form-title" id="contactFormTitle">
                  Contact Us
                </h2>
                <p className="form-copy">
                  Isi pesan singkat berikut agar tim kami dapat membantu Anda
                  lebih cepat.
                </p>
                <form
                  className="contact-form"
                  id="contactForm"
                  onSubmit={handleSubmit}
                >
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@perusahaan.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Ceritakan kebutuhan pengujian atau pertanyaan Anda."
                      required
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Mengirim..." : "Send"}{" "}
                    <i className="fa-solid fa-paper-plane" />
                  </button>
                  <p className={`form-message${messageReady ? " active" : ""}`}>
                    Terima kasih. Pesan Anda sudah terkirim dan tersimpan di
                    admin.
                  </p>
                  {messageError ? (
                    <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
                      {messageError}
                    </p>
                  ) : null}
                </form>
              </section>
            </div>
          </div>
        </section>

        <section className="map-section">
          <div className="container">
            <div className="map-shell glass">
              <iframe
                title="Peta lokasi kantor GIS Laboratorium"
                src="https://www.google.com/maps?q=Jl.%20Raya%20Daan%20Mogot%20No.%2089%20Wijaya%20Kusuma%20Grogol%20Petamburan%20Jakarta%20Barat&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="kontak">
        <div className="container">
          <div className="footer-panel glass-dark">
            <div className="footer-grid">
              {/* Kolom 1: Contact */}
              <div>
                <h4 className="footer-col-title">Contact</h4>
                <div className="footer-text">
                  <i className="fa-solid fa-envelope" />{" "}
                  globalinspeksisistem@gmail.com
                </div>
                <div
                  className="footer-text"
                  style={{ alignItems: "flex-start" }}
                >
                  <i
                    className="fa-solid fa-phone"
                    style={{ marginTop: "4px" }}
                  />{" "}
                  <div>
                    +62 812-8532-8232
                    <br />
                    +62 817-888-879
                    <br />
                    +62 812-1704-7976
                  </div>
                </div>
                <div className="footer-text">
                  <i className="fa-solid fa-globe" /> www.gislaboratorium.com
                </div>
              </div>

              {/* Kolom 2: Link */}
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

      <div className="whatsapp-widget">
        <div
          className={`whatsapp-window${whatsappOpen ? " active" : ""}`}
          id="whatsappWindow"
        >
          <div className="wa-header">
            <div className="wa-brand">
              <Image
                src="/landing/animation/logo-lab.png"
                alt="GISLAB"
                width={28}
                height={28}
              />
              <span>PT Global Inspeksi Sistem</span>
            </div>
            <button
              className="wa-close"
              id="closeWhatsapp"
              type="button"
              aria-label="Tutup WhatsApp"
              onClick={() => setWhatsappOpen(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="wa-body">
            <div className="wa-bubble">
              Halo! Ada yang bisa kami bantu mengenai layanan pengujian GIS?
            </div>
            <a
              className="wa-link"
              href="https://wa.me/6281285328232?text=Halo%20GIS%20Laboratorium"
              target="_blank"
              rel="noopener"
            >
              <i className="fa-brands fa-whatsapp" />
              <span>Customer Service 1</span>
            </a>
          </div>
        </div>
        <button
          className="whatsapp-toggle"
          id="toggleWhatsapp"
          type="button"
          aria-label="Buka WhatsApp"
          onClick={() => setWhatsappOpen((value) => !value)}
        >
          <i className="fa-brands fa-whatsapp" />
        </button>
      </div>
    </div>
  );
}
