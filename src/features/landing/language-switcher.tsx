"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LANGUAGE_SWITCHER_STYLES = `
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .site-language-switch {
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

  .site-language-switch:hover {
    color: #0070F3;
    transform: translateY(-1px);
    border-color: rgba(0, 112, 243, 0.32);
    background: #ffffff;
  }

  .site-language-switch i {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .nav-actions {
      gap: 8px;
    }

    .site-language-switch {
      height: 36px;
      padding: 0 11px;
      font-size: 0.78rem;
    }
  }
`;

function getLanguageTarget(pathname: string) {
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  if (isEnglish) {
    const idPath = pathname.replace(/^\/en/, "") || "/";
    return {
      href: idPath,
      label: "ID",
      title: "Ganti ke Bahasa Indonesia",
    };
  }

  return {
    href: pathname === "/" ? "/en" : `/en${pathname}`,
    label: "EN",
    title: "Switch to English",
  };
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const target = getLanguageTarget(pathname);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LANGUAGE_SWITCHER_STYLES }} />

      <Link
        href={target.href}
        className="site-language-switch"
        aria-label={target.title}
        title={target.title}
      >
        <i className="fa-solid fa-globe" />
        <span>{target.label}</span>
      </Link>
    </>
  );
}
