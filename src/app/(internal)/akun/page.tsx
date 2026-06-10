import { Mail, Shield, User } from "lucide-react";

// Perhatikan: Kita import dari auth karena kamu sudah menggabungkannya di file auth.ts
import { changePasswordAction } from "@/actions/auth"; 
import { ChangePasswordForm } from "@/components/profile/change-password-form";
import { FlashMessage } from "@/components/flash-message";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { Card } from "@/components/ui/card";
import { requireAuthenticatedUser } from "@/lib/auth";
import { roleLabels } from "@/lib/domain";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // 1. Ambil session user yang sedang login
  const user = await requireAuthenticatedUser();

  // 2. Ambil query string untuk pesan sukses/gagal dari server action
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const success = typeof query.success === "string" ? query.success : undefined;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      {/* Header Halaman */}
      <PageHeader
        title="Profil Pengguna"
        description="Informasi detail mengenai akun Anda serta pengaturan keamanan kata sandi."
      />

      {/* Menampilkan pesan alert jika ada proses ganti password */}
      <FlashMessage error={error} success={success} />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        
        {/* Kolom Kiri: Ringkasan Akun */}
        <div className="space-y-6">
          <Card className="flex flex-col items-center justify-center p-6 text-center rounded-[28px]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-gis-blue)]/10 border-2 border-[var(--color-gis-blue)]/20 shadow-sm">
              <User className="h-12 w-12 text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-[var(--color-gis-navy)] dark:text-slate-100">
              {user.name}
            </h2>
            <p className="mt-2 inline-flex items-center rounded-full bg-[var(--color-gis-blue)]/5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[var(--color-gis-blue)] dark:bg-slate-800 dark:text-[var(--color-gis-cyan)]">
              {roleLabels[user.role as keyof typeof roleLabels] ?? user.role}
            </p>
          </Card>
        </div>

        {/* Kolom Kanan: Detail Informasi & Form Ganti Password */}
        <div className="space-y-6">
          
          {/* Section 1: Identitas Akun */}
          <SectionCard 
            title="Detail Informasi Akun" 
            description="Identitas resmi Anda yang digunakan untuk mencatat setiap aktivitas log pada dokumen LHU."
          >
            <div className="mt-2 space-y-2">
              <div className="grid gap-1 py-3 border-b border-sky-50 sm:grid-cols-[180px_1fr] dark:border-slate-800/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400 shrink-0" /> Nama Lengkap
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {user.name}
                </span>
              </div>

              <div className="grid gap-1 py-3 border-b border-sky-50 sm:grid-cols-[180px_1fr] dark:border-slate-800/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" /> Alamat Email
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {user.email ?? "-"}
                </span>
              </div>

              <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-slate-400 shrink-0" /> Hak Akses / Role
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {user.role} ({roleLabels[user.role as keyof typeof roleLabels] ?? "Tidak Diketahui"})
                </span>
              </div>
            </div>
          </SectionCard>

          {/* Section 2: Form Keamanan / Ganti Password */}
          <SectionCard
            title="Keamanan Akun"
            description="Ubah kata sandi Anda secara berkala untuk menjaga keamanan akses ke sistem manajemen LHU."
          >
            <div className="mt-2">
              <ChangePasswordForm action={changePasswordAction} />
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}