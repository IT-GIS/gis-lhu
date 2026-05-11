import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="max-w-lg rounded-[32px] border border-white/70 bg-white/90 p-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
        <p className="text-xs uppercase tracking-[0.28em] text-amber-600">404</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-slate-950">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-500">
          Tautan yang Anda buka tidak tersedia atau dokumen sudah berpindah.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
