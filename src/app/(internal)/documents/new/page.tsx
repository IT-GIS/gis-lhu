import { redirect } from "next/navigation";

import { createDocumentAction } from "@/actions/documents";
import { FlashMessage } from "@/components/flash-message";
import { SectionCard } from "@/components/section-card";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getAssignableUsers } from "@/lib/documents";
import { formTypeLabels, formTypes } from "@/lib/domain";
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
      <section className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs uppercase tracking-[0.28em] text-amber-600">Pembuatan Dokumen</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-slate-950">
          Buat draft dokumen baru
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Pada fase awal, tipe form wajib dipilih tetapi field detail per form masih disiapkan sebagai placeholder kosong.
        </p>
      </section>

      <FlashMessage error={error} />

      <SectionCard title="Identitas dokumen" description="Masukkan metadata inti yang sudah diketahui untuk draft awal">
        <form action={createDocumentAction} className="grid gap-5 lg:grid-cols-2">
          <label className="block lg:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Judul dokumen</span>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
              type="text"
              name="title"
              placeholder="Contoh: LHU Air Bersih PT Nusantara"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Tipe form</span>
            <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm" name="formType" defaultValue="TYPE_1">
              {formTypes.map((type) => (
                <option key={type} value={type}>
                  {formTypeLabels[type]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">PIC / assignee</span>
            <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm" name="assignedToId" defaultValue="">
              <option value="">Belum ditentukan</option>
              {assignableUsers.map((assignee) => (
                <option key={assignee.id} value={assignee.id}>
                  {assignee.name} ({assignee.role})
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Nomor referensi</span>
            <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm" type="text" name="referenceNo" placeholder="REF-001" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Nama klien</span>
            <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm" type="text" name="clientName" placeholder="PT Nusantara" />
          </label>

          <label className="block lg:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Nama sampel</span>
            <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm" type="text" name="sampleName" placeholder="Sampel Air Bersih" />
          </label>

          <label className="block lg:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Catatan awal</span>
            <textarea className="min-h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm" name="notes" placeholder="Informasi awal yang perlu diketahui tim QA atau analis." />
          </label>

          <div className="flex justify-end lg:col-span-2">
            <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Simpan Draft
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
