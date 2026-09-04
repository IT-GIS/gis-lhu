import type { Metadata } from "next";

import { PublicVerificationNavbar } from "@/components/public-verification-navbar";
import { VerificationSearch } from "@/components/verification-search";

const VERIFICATION_NAVBAR_STYLES = `
  .verification-navbar-scope {
    position: fixed;
    top: 24px;
    left: 0;
    z-index: 1000;
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0 24px;
    transition: top 0.3s ease;
  }

  .verification-navbar-scope.scrolled { top: 12px; }

  .verification-navbar-scope .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: min(1000px, 100%);
    gap: 14px;
    padding: 12px 24px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .verification-navbar-scope .nav-brand {
    display: flex;
    flex: 0 0 250px;
    min-width: 0;
    align-items: center;
    gap: 10px;
    color: #0a2540;
    font-size: 1.02rem;
    font-weight: 900;
    line-height: 1.2;
    text-decoration: none;
    white-space: nowrap;
  }

  .verification-navbar-scope .nav-brand img {
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    object-fit: contain;
    transform: scale(1.45);
  }

  .verification-navbar-scope .nav-menu {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .verification-navbar-scope .nav-menu > li { display: flex; align-items: center; }

  .verification-navbar-scope .nav-link {
    display: inline-flex;
    min-height: 38px;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 8px 12px;
    border-radius: 999px;
    color: #50616b;
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
  }

  .verification-navbar-scope .nav-link:hover,
  .verification-navbar-scope .nav-dropdown-trigger:hover { background: rgba(201, 244, 245, 0.9); color: #0070eb; }
  .verification-navbar-scope .nav-dropdown details { position: relative; }
  .verification-navbar-scope .nav-dropdown summary { cursor: pointer; list-style: none; }
  .verification-navbar-scope .nav-dropdown summary::-webkit-details-marker { display: none; }
  .verification-navbar-scope .nav-dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    display: grid;
    min-width: 220px;
    gap: 4px;
    padding: 8px;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.16);
  }
  .verification-navbar-scope .nav-dropdown-link { padding: 10px 12px; border-radius: 10px; color: #334155; font-size: 0.85rem; text-decoration: none; }
  .verification-navbar-scope .nav-dropdown-link:hover { background: #eff6ff; color: #0369a1; }
  .verification-navbar-scope .nav-actions { display: flex; flex: 0 0 auto; align-items: center; gap: 8px; }
  .verification-navbar-scope .language-switch { display: inline-flex; height: 38px; align-items: center; gap: 7px; padding: 0 13px; border: 1px solid rgba(0, 112, 243, 0.18); border-radius: 999px; background: rgba(255, 255, 255, 0.9); color: #0a2540; font-size: 0.8rem; font-weight: 900; text-decoration: none; white-space: nowrap; }
  .verification-navbar-scope .mobile-menu-btn { display: none; border: 0; background: transparent; color: #0a2540; font-size: 1.2rem; }

  @media (max-width: 1024px) {
    .verification-navbar-scope .nav-brand { flex: 1 1 auto; max-width: 360px; }
    .verification-navbar-scope .nav-menu { position: absolute; top: calc(100% + 12px); right: 18px; left: 18px; display: none; flex-direction: column; align-items: stretch; gap: 8px; padding: 18px; border: 1px solid rgba(226, 232, 240, 0.9); border-radius: 24px; background: rgba(255, 255, 255, 0.96); box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18); }
    .verification-navbar-scope .nav-menu.active { display: flex; }
    .verification-navbar-scope .nav-link { width: 100%; justify-content: flex-start; padding: 12px 14px; font-size: 0.95rem; }
    .verification-navbar-scope .mobile-menu-btn { display: inline-flex; align-items: center; justify-content: center; }
  }

  @media (max-width: 640px) {
    .verification-navbar-scope { top: 12px; padding: 0 12px; }
    .verification-navbar-scope .navbar { padding: 10px 14px; }
    .verification-navbar-scope .nav-brand { flex-basis: auto; }
    .verification-navbar-scope .nav-brand img { width: 40px; height: 40px; flex-basis: 40px; }
    .verification-navbar-scope .language-switch { height: 36px; padding: 0 10px; }
  }
`;

export const metadata: Metadata = {
  title: "Verifikasi LHU - GISLAB",
  description:
    "Verifikasi keaslian Laporan Hasil Uji GISLAB menggunakan nomor order, nomor LHU, atau barcode.",
};

export function VerificationSearchPageContent({
  language = "id",
}: {
  language?: "id" | "en";
}) {
  const isEnglish = language === "en";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eff8ff_0%,#ffffff_48%,#f5fbff_100%)] text-slate-950">
      <style dangerouslySetInnerHTML={{ __html: VERIFICATION_NAVBAR_STYLES }} />
      <PublicVerificationNavbar language={language} />
      <main className="px-4 pb-10 pt-32 sm:px-6 sm:pt-36 lg:px-10 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky-700">
              {isEnglish
                ? "GISLAB PUBLIC VERIFICATION"
                : "GISLAB PUBLIC VERIFICATION"}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              {isEnglish
                ? "Verify Laboratory Test Report"
                : "Verifikasi Laporan Hasil Uji"}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {isEnglish
                ? "Confirm that the LHU is registered and issued by PT Global Inspeksi Sistem."
                : "Pastikan dokumen LHU tercatat dan diterbitkan oleh PT Global Inspeksi Sistem."}
            </p>
          </div>
          <VerificationSearch language={language} />
        </div>
      </main>
    </div>
  );
}

export default function VerificationSearchPage() {
  return <VerificationSearchPageContent />;
}
