import { z } from "zod";

import { documentStatuses, formTypes } from "@/lib/domain";

export const createDocumentSchema = z.object({
  title: z.string().trim().min(3, "Judul dokumen minimal 3 karakter."),
  formType: z.enum(formTypes, {
    message: "Tipe form wajib dipilih.",
  }),
  referenceNo: z.string().trim().max(100).optional().or(z.literal("")),
  clientName: z.string().trim().max(100).optional().or(z.literal("")),
  sampleName: z.string().trim().max(100).optional().or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
  assignedToId: z.string().trim().optional().or(z.literal("")),
});

export const updateDocumentSchema = createDocumentSchema.extend({
  documentId: z.string().trim().min(1),
});

export const transitionSchema = z.object({
  documentId: z.string().trim().min(1),
  nextStatus: z.enum(documentStatuses),
  comment: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const reviewCommentSchema = z.object({
  documentId: z.string().trim().min(1),
  comment: z.string().trim().min(3, "Komentar review minimal 3 karakter."),
});
