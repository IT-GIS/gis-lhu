import { notFound } from "next/navigation";

import { LhuDocumentPreview } from "@/components/lhu/lhu-document-preview";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getDocumentDetail } from "@/lib/documents";
import { resolveLhuPayload } from "@/lib/lhu-payload";

type Params = Promise<{ id: string }>;

export default async function PrintDocumentPage({ params }: { params: Params }) {
  const user = await requireAuthenticatedUser();
  const { id } = await params;
  const document = await getDocumentDetail(id, user.role);

  if (!document) {
    notFound();
  }

  const payload = resolveLhuPayload(document.formType, document.formPayload);

  return (
    <main className="min-h-screen bg-slate-200 px-4 py-8 print:bg-white print:p-0">
      <style>{`
        @page { size: A4; margin: 14mm; }
        @media print {
          .print-shell { box-shadow: none !important; width: 210mm !important; min-height: 297mm !important; padding: 0 !important; }
        }
      `}</style>
      <div className="print-shell mx-auto min-h-[297mm] w-[210mm] max-w-full bg-white shadow-2xl">
        <LhuDocumentPreview
          formType={document.formType}
          payload={payload}
          documentNumber={document.documentNumber}
        />
      </div>
    </main>
  );
}
