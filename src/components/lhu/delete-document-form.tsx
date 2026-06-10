"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import { deleteDocumentAction } from "@/actions/documents";
import { Button } from "@/components/ui/button";

export function DeleteDocumentForm({
  documentId,
  documentLabel,
}: {
  documentId: string;
  documentLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" size="sm" variant="destructive" onClick={() => setIsOpen(true)}>
        Hapus
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`delete-document-title-${documentId}`}
        >
          <div className="w-full max-w-md rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2
                  id={`delete-document-title-${documentId}`}
                  className="text-lg font-bold text-slate-950 dark:text-slate-50"
                >
                  Hapus LHU?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  LHU <span className="font-semibold text-slate-900 dark:text-slate-100">{documentLabel}</span> akan
                  dihapus permanen. Data dokumen dan barcode verifikasi ikut terhapus.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Batal
              </Button>
              <form action={deleteDocumentAction}>
                <input type="hidden" name="documentId" value={documentId} />
                <Button type="submit" variant="destructive" className="w-full sm:w-auto">
                  Hapus Permanen
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
