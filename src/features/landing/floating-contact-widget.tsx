"use client";

import { useState } from "react";

const FLOATING_CONTACT_WIDGET_STYLES = `
  .floating-contact-widget {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1200;
    font-family: "Plus Jakarta Sans", sans-serif;
  }

  .floating-contact-toggle {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    border: none;
    color: #ffffff;
    background: linear-gradient(135deg, #0070F3, #00DFD8);
    box-shadow: 0 18px 36px rgba(0, 112, 243, 0.28);
    font-size: 1.55rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.28s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .floating-contact-toggle:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 22px 44px rgba(0, 112, 243, 0.34);
  }

  .floating-contact-toggle i {
    transition: transform 0.25s ease;
  }

  .floating-contact-toggle.active i {
    transform: rotate(45deg);
  }

  .floating-contact-window {
    position: absolute;
    right: 0;
    bottom: 78px;
    display: grid;
    gap: 12px;
    width: auto;
    background: transparent;
    box-shadow: none;
    transform: translateY(14px) scale(0.92);
    opacity: 0;
    pointer-events: none;
    transition: all 0.28s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .floating-contact-window.active {
    transform: translateY(0) scale(1);
    opacity: 1;
    pointer-events: auto;
  }

  .floating-contact-icon-link {
    width: 56px;
    height: 56px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 1.55rem;
    text-decoration: none;
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.18);
    transition: all 0.25s ease;
  }

  .floating-contact-icon-link:hover {
    transform: translateY(-3px) scale(1.05);
  }

  .floating-contact-icon-link.whatsapp {
    background: #25D366;
  }

  .floating-contact-icon-link.email {
    background: linear-gradient(135deg, #0070F3, #00A3FF);
  }

  .floating-contact-icon-link.instagram {
    background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45);
  }

  @media (max-width: 640px) {
    .floating-contact-widget {
      right: 18px;
      bottom: 18px;
    }

    .floating-contact-toggle {
      width: 58px;
      height: 58px;
      font-size: 1.45rem;
    }

    .floating-contact-window {
      bottom: 72px;
      gap: 10px;
    }

    .floating-contact-icon-link {
      width: 52px;
      height: 52px;
      font-size: 1.45rem;
    }
  }
`;

export function FloatingContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{ __html: FLOATING_CONTACT_WIDGET_STYLES }}
      />

      <div className="floating-contact-widget">
        <div className={`floating-contact-window${open ? " active" : ""}`}>
          <a
            className="floating-contact-icon-link whatsapp"
            href="https://wa.me/6281285328232?text=Halo%20GIS%20Laboratorium"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp GIS"
          >
            <i className="fa-brands fa-whatsapp" />
          </a>

          <a
            className="floating-contact-icon-link email"
            href="mailto:info@gislaboratorium.com?subject=Informasi%20Layanan%20GISLAB"
            aria-label="Email GIS"
          >
            <i className="fa-solid fa-envelope" />
          </a>

          <a
            className="floating-contact-icon-link instagram"
            href="https://www.instagram.com/ptglobalinspeksisistem/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram GIS"
          >
            <i className="fa-brands fa-instagram" />
          </a>
        </div>

        <button
          className={`floating-contact-toggle${open ? " active" : ""}`}
          type="button"
          aria-label="Buka menu kontak"
          onClick={() => setOpen((value) => !value)}
        >
          <i className="fa-solid fa-plus" />
        </button>
      </div>
    </>
  );
}
