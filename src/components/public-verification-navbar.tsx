"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function PublicVerificationNavbar({
  language = "id",
}: {
  language?: "id" | "en";
}) {
  const isEnglish = language === "en";
  useEffect(() => {
    const navbar = document.getElementById("verification-navbar");
    const menu = document.getElementById("verification-nav-menu");
    const menuButton = document.getElementById(
      "verification-mobile-menu-button",
    );

    if (!navbar || !menu || !menuButton) return;

    const handleScroll = () =>
      navbar.classList.toggle("scrolled", window.scrollY > 24);
    const toggleMenu = () => menu.classList.toggle("active");
    const closeMenu = () => menu.classList.remove("active");

    window.addEventListener("scroll", handleScroll, { passive: true });
    menuButton.addEventListener("click", toggleMenu);
    menu.addEventListener("click", closeMenu);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      menuButton.removeEventListener("click", toggleMenu);
      menu.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <header className="verification-navbar-scope" id="verification-navbar">
      <nav className="navbar">
        <Link href={isEnglish ? "/en" : "/"} className="nav-brand">
          <Image
            src="/landing/animation/logo-lab.png"
            alt="GISLAB"
            width={52}
            height={52}
            priority
          />
          Global Inspeksi Sistem
        </Link>
        <ul className="nav-menu" id="verification-nav-menu">
          <li>
            <Link href="/" className="nav-link">
              {isEnglish ? "Home" : "Beranda"}
            </Link>
          </li>
          <li>
            <Link
              href={isEnglish ? "/en/profile" : "/profile"}
              className="nav-link"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href={isEnglish ? "/en/service" : "/service"}
              className="nav-link"
            >
              {isEnglish ? "Services" : "Layanan"}
            </Link>
          </li>
          <li>
            <Link
              href={
                isEnglish
                  ? "/en/ruang-lingkup-pengujian"
                  : "/ruang-lingkup-pengujian"
              }
              className="nav-link"
            >
              {isEnglish ? "Testing Scope" : "Ruang Lingkup Pengujian"}
            </Link>
          </li>
          <li className="nav-dropdown">
            <details>
              <summary className="nav-link nav-dropdown-trigger">
                {isEnglish ? "Information" : "Informasi"}{" "}
                <i className="fa-solid fa-chevron-down" />
              </summary>
              <div className="nav-dropdown-menu">
                <Link
                  href={isEnglish ? "/en/informasi" : "/informasi"}
                  className="nav-dropdown-link"
                >
                  {isEnglish ? "Articles" : "Artikel"}{" "}
                  <i className="fa-solid fa-newspaper" />
                </Link>
                <Link
                  href={
                    isEnglish
                      ? "/en/informasi/keluhan-dan-banding"
                      : "/informasi/keluhan-dan-banding"
                  }
                  className="nav-dropdown-link"
                >
                  {isEnglish ? "Complaints and Appeals" : "Keluhan dan Banding"}{" "}
                  <i className="fa-solid fa-comments" />
                </Link>
                <Link
                  href={isEnglish ? "/en/verify" : "/verify"}
                  className="nav-dropdown-link"
                >
                  {isEnglish ? "LHU Verification" : "Verifikasi LHU"}{" "}
                  <i className="fa-solid fa-check-circle" />
                </Link>
              </div>
            </details>
          </li>
          <li>
            <Link
              href={isEnglish ? "/en/contact" : "/contact"}
              className="nav-link"
            >
              {isEnglish ? "Contact" : "Kontak"}
            </Link>
          </li>
        </ul>
        <div className="nav-actions">
          <Link
            href={isEnglish ? "/" : "/en"}
            className="language-switch"
            aria-label="Switch to English"
            title={isEnglish ? "Switch to Indonesian" : "Switch to English"}
          >
            <i className="fa-solid fa-globe" />
            <span>{isEnglish ? "ID" : "EN"}</span>
          </Link>
          <button
            className="mobile-menu-btn"
            id="verification-mobile-menu-button"
            aria-label="Buka menu"
            type="button"
          >
            <i className="fas fa-bars" />
          </button>
        </div>
      </nav>
    </header>
  );
}
