import { redirect } from "next/navigation";

import { createDocumentAction } from "@/actions/documents";
import { FlashMessage } from "@/components/flash-message";
import { LhuDocumentForm } from "@/components/lhu/lhu-document-form";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getAssignableUsers } from "@/lib/documents";
import { canCreateDocument } from "@/lib/permissions";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function NewDocumentPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await requireAuthenticatedUser();

  if (!canCreateDocument(user.role)) {
    redirect("/documents");
  }

  const params = await searchParams;
  const assignableUsers = await getAssignableUsers();
  const error = typeof params.error === "string" ? params.error : undefined;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Buat draft dokumen baru"
        description="Isi draft Laporan Hasil Pengujian lengkap dengan data pelanggan, sampel, hasil uji, dan tanda tangan."
      />

      <FlashMessage error={error} />

      <SectionCard title="Draft LHU" description="Pilih tipe form lalu isi bagian laporan sesuai dokumen contoh.">
        <LhuDocumentForm
          action={createDocumentAction}
          assignableUsers={assignableUsers}
          submitLabel="Simpan Draft"
        />
      </SectionCard>
    </div>
  );
}
