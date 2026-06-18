"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const whatsappNumber = "6285281844641";
const email = "globalinspeksisistem@gmail.com";

const COMPLAINTS_APPEALS_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --primary: #0A2540;
    --secondary: #0070F3;
    --accent: #00DFD8;
    --white: #FFFFFF;
    --text-dark: #1E293B;
    --text-muted: #64748B;
    --glass-bg: rgba(255, 255, 255, 0.72);
    --glass-border: rgba(255, 255, 255, 0.82);
    --shadow-soft: 0 18px 50px rgba(15, 23, 42, 0.08);
    --radius-pill: 100px;
    --radius-lg: 34px;
    --font-main: 'Plus Jakarta Sans', sans-serif;
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  * {
    box-sizing: border-box;
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
      radial-gradient(circle at 88% 8%, rgba(0, 223, 216, 0.16), transparent 26%),
      radial-gradient(circle at 8% 88%, rgba(0, 112, 243, 0.12), transparent 30%),
      #f8fcff;
    overflow-x: hidden;
  }

  /* HEADER DISAMAKAN DENGAN HALAMAN ARTIKEL */
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
    gap: 8px;
    align-items: center;
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
    font-weight: 600;
    font-size: 0.93rem;
    line-height: 1;
    color: var(--text-muted);
    transition: var(--transition);
    cursor: pointer;
    white-space: nowrap;
  }

  .nav-link:hover {
    color: var(--primary);
    background: rgba(0, 112, 243, 0.07);
  }

  .nav-link.active {
    background: rgba(0, 223, 216, 0.16);
    color: var(--secondary);
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
    font-weight: 800;
    font-size: 0.94rem;
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

  .complaints-hero {
    position: relative;
    display: flex;
    min-height: 100vh;
    align-items: center;
    overflow: hidden;
    padding: 150px 24px 80px;
  }

  .complaints-orb-one {
    position: absolute;
    right: -120px;
    top: 0;
    height: 320px;
    width: 320px;
    border-radius: 999px;
    background: rgba(0, 223, 216, 0.20);
    filter: blur(70px);
  }

  .complaints-orb-two {
    position: absolute;
    left: -130px;
    bottom: 40px;
    height: 380px;
    width: 380px;
    border-radius: 999px;
    background: rgba(0, 112, 243, 0.14);
    filter: blur(80px);
  }

  .complaints-grid {
    position: relative;
    z-index: 2;
    margin: 0 auto;
    display: grid;
    width: 100%;
    max-width: 1180px;
    gap: 42px;
    align-items: center;
    grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
  }

  .complaints-badge {
    display: inline-flex;
    border-radius: 999px;
    background: rgba(0, 223, 216, 0.14);
    padding: 10px 22px;
    color: var(--secondary);
    font-size: 0.82rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  .complaints-title {
    margin-top: 26px;
    max-width: 760px;
    font-size: clamp(2.6rem, 5vw, 4.9rem);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.045em;
    color: var(--primary);
  }

  .complaints-desc {
    margin-top: 24px;
    max-width: 680px;
    color: #64748b;
    font-size: 1.12rem;
    font-weight: 650;
    line-height: 1.85;
  }

  .complaints-actions {
    margin-top: 34px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .complaints-btn-primary,
  .complaints-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border-radius: 999px;
    padding: 16px 28px;
    font-weight: 800;
    text-decoration: none;
    transition: var(--transition);
  }

  .complaints-btn-primary {
    color: #ffffff;
    background: linear-gradient(135deg, var(--secondary), var(--accent));
    box-shadow: 0 18px 40px rgba(0, 112, 243, 0.25);
  }

  .complaints-btn-primary:hover,
  .complaints-btn-secondary:hover {
    transform: translateY(-2px);
  }

  .complaints-btn-secondary {
    color: var(--primary);
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(226, 232, 240, 0.95);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  }

  .complaints-contact-card {
    border-radius: 36px;
    border: 1px solid rgba(255, 255, 255, 0.88);
    background: rgba(255, 255, 255, 0.78);
    padding: 34px;
    box-shadow: 0 30px 80px rgba(10, 37, 64, 0.12);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
  }

  .complaints-contact-card h2 {
    color: var(--primary);
    font-size: 1.65rem;
    font-weight: 800;
    line-height: 1.25;
  }

  .complaints-contact-list {
    margin-top: 26px;
    display: grid;
    gap: 16px;
  }

  .complaints-contact-item {
    border-radius: 26px;
    background: rgba(248, 250, 252, 0.9);
    padding: 22px;
  }

  .complaints-contact-item p:first-child {
    color: #94a3b8;
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .complaints-contact-item p:last-child {
    margin-top: 9px;
    color: var(--primary);
    font-size: 1.08rem;
    font-weight: 800;
    overflow-wrap: anywhere;
  }

  .complaints-note {
    color: #64748b;
    font-size: 0.95rem;
    font-weight: 650;
    line-height: 1.75;
  }

  @media (max-width: 768px) {
    .navbar-wrapper {
      padding: 0 16px;
    }

    .navbar {
      padding: 10px 14px;
    }

    .nav-brand {
      font-size: 0.88rem;
      gap: 8px;
      min-width: 0;
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
      margin-top: 12px;
      display: none;
      flex-direction: column;
      align-items: stretch;
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

    .nav-menu > li {
      width: 100%;
    }

    .nav-link {
      width: 100%;
      justify-content: center;
    }

    .nav-dropdown,
    .nav-dropdown details {
      width: 100%;
    }

    .nav-dropdown-menu {
      position: static;
      min-width: 100%;
      margin-top: 8px;
      box-shadow: none;
      background: rgba(248, 252, 255, 0.92);
    }

    .complaints-hero {
      padding-top: 130px;
    }

    .complaints-grid {
      grid-template-columns: 1fr;
    }

    .complaints-actions {
      flex-direction: column;
    }

    .complaints-btn-primary,
    .complaints-btn-secondary {
      width: 100%;
    }

    .complaints-contact-card {
      padding: 26px;
      border-radius: 30px;
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

            <button
              className="mobile-menu-btn"
              type="button"
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i className="fa-solid fa-bars" />
            </button>
          </nav>
        </header>

        <section className="complaints-hero">
          <div className="complaints-orb-one" />
          <div className="complaints-orb-two" />

          <div className="complaints-grid">
            <div>
              <span className="complaints-badge">Keluhan dan Banding</span>

              <h1 className="complaints-title">
                Sampaikan keluhan atau banding Anda kepada GISLAB.
              </h1>

              <p className="complaints-desc">
                PT Global Inspeksi Sistem menyediakan kanal komunikasi untuk
                pelanggan yang ingin menyampaikan keluhan, banding, atau
                permintaan tindak lanjut terkait layanan pengujian laboratorium.
              </p>

              <div className="complaints-actions">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Halo%20GISLAB%2C%20saya%20ingin%20menyampaikan%20keluhan%20atau%20banding.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="complaints-btn-primary"
                >
                  Hubungi WhatsApp <i className="fa-brands fa-whatsapp" />
                </a>

                <a
                  href={`mailto:${email}?subject=Keluhan%20dan%20Banding%20GISLAB`}
                  className="complaints-btn-secondary"
                >
                  Kirim Email <i className="fa-solid fa-envelope" />
                </a>
              </div>
            </div>

            <aside className="complaints-contact-card">
              <h2>Kontak Keluhan dan Banding</h2>

              <div className="complaints-contact-list">
                <div className="complaints-contact-item">
                  <p>WhatsApp</p>
                  <p>+62 852-8184-4641</p>
                </div>

                <div className="complaints-contact-item">
                  <p>Email</p>
                  <p>{email}</p>
                </div>

                <p className="complaints-note">
                  Detail formulir, alur penanganan, dan dokumen pendukung bisa
                  ditambahkan pada tahap update berikutnya.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
