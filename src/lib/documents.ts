import { randomBytes } from "crypto";

import {
  type Prisma,
  ReviewAction,
  type Role,
} from "@prisma/client";

import { recordAudit } from "@/lib/audit";
import type { AuthUser } from "@/lib/auth";
import { formTypeLabels } from "@/lib/domain";
import {
  canCreateDocument,
  canDeleteDocument,
  canEditDocument,
  canPublishDocument,
  canReviewDocument,
  canRevokeDocument,
  canSubmitForReview,
} from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { parseLhuDocumentInput, resolveLhuPayload } from "@/lib/lhu-payload";
import {
  reviewCommentSchema,
  transitionSchema,
} from "@/lib/validators";
import { canTransitionStatus } from "@/lib/workflow";

let formTypeEnumReady = false;

async function ensureLatestFormTypeEnum() {
  if (formTypeEnumReady) {
    return;
  }

  const alterSql = "MODIFY `formType` ENUM('TYPE_1','TYPE_2','TYPE_3','TYPE_4','TYPE_5','TYPE_6','TYPE_7') NOT NULL";

  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE \`document\` ${alterSql}`);
    formTypeEnumReady = true;
    return;
  } catch (lowercaseError) {
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE \`Document\` ${alterSql}`);
      formTypeEnumReady = true;
      return;
    } catch {
      throw new Error(
        `Database enum FormType belum mendukung tipe form terbaru. Jalankan migration form type terbaru sampai 20260622000000_add_form_type_7_za terlebih dahulu. Detail: ${
          lowercaseError instanceof Error ? lowercaseError.message : "ALTER TABLE document gagal"
        }`,
      );
    }
  }
}

function normalizeOptionalString(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeSampleText(value?: string | null) {
  return (value ?? "").toUpperCase().replace(/\s+/g, " ").trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasExactWord(text: string, keyword: string) {
  return new RegExp(`(^|[^A-Z0-9])${escapeRegExp(keyword)}([^A-Z0-9]|$)`).test(
    text,
  );
}

function hasAnyKeyword(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function categorizeSampleName(sampleName?: string | null) {
  const text = normalizeSampleText(sampleName);

  if (!text) {
    return "Lainnya";
  }

  if (
    hasAnyKeyword(text, [
      "CPO",
      "CRUDE PALM OIL",
      "PALM OIL",
      "PALM KERNEL",
      "RBD",
      "OLEIN",
      "SAWIT",
      "MINYAK GORENG",
      "MINYAK MAKAN MERAH",
      "MINYAK NABATI",
      "COOKING OIL",
      "VEGETABLE OIL",
    ])
  ) {
    return "Sawit & Minyak Nabati";
  }

  if (
    hasAnyKeyword(text, [
      "MINYAK LUMAS",
      "PELUMAS",
      "LUBRICANT",
      "LUBRICATING",
      "ENGINE OIL",
      "MOTOR OIL",
      "GEAR OIL",
      "HYDRAULIC OIL",
      "TWO STROKE",
      "STROKE",
      "SAE",
      "API",
      "JASO",
    ]) ||
    hasExactWord(text, "4T") ||
    hasExactWord(text, "2T")
  ) {
    return "Minyak Lumas / Pelumas";
  }

  if (
    hasAnyKeyword(text, [
      "PUPUK",
      "FERTILIZER",
      "TRIPLE SUPER PHOSPHATE",
      "SUPER PHOSPHATE",
      "PHOSPHATE",
      "FOSFAT",
      "UREA",
      "KCL",
      "ZA",
      "SP36",
      "SP-36",
    ]) ||
    hasExactWord(text, "TSP") ||
    hasExactWord(text, "NPK")
  ) {
    return "Pupuk";
  }

  if (
    hasExactWord(text, "STP") ||
    hasExactWord(text, "WWTP") ||
    hasExactWord(text, "IPAL") ||
    hasAnyKeyword(text, [
      "AIR LIMBAH",
      "AIR BERSIH",
      "AIR MINUM",
      "AIR SUNGAI",
      "AIR DANAU",
      "AIR SUMUR",
      "AIR MINERAL",
      "WASTEWATER",
      "SEWAGE",
      "LIMBAH CAIR",
    ])
  ) {
    return "Air & Lingkungan";
  }

  if (
    hasAnyKeyword(text, [
      "UDARA",
      "AMBIEN",
      "AMBIENT",
      "EMISI",
      "CEROBONG",
      "OPASITAS",
      "KEBISINGAN",
      "PARTIKULAT",
      "PM10",
      "PM2.5",
    ]) ||
    hasExactWord(text, "NO2") ||
    hasExactWord(text, "SO2") ||
    hasExactWord(text, "NH3") ||
    hasExactWord(text, "H2S") ||
    hasExactWord(text, "CO") ||
    hasExactWord(text, "CO2") ||
    hasExactWord(text, "O2")
  ) {
    return "Udara & Emisi";
  }

  if (
    hasAnyKeyword(text, [
      "SPRAYER",
      "ALAT SEMPROT",
      "SEMPROT",
      "GENDONG ELEKTRIK",
      "KNAPSACK",
    ])
  ) {
    return "Alat Sprayer";
  }

  return "Lainnya";
}

async function generateDocumentNumber(tx: Prisma.TransactionClient) {
  const year = new Date().getFullYear();
  const prefix = `GIS-LHU/${year}/`;
  const documents = await tx.document.findMany({
    select: {
      documentNumber: true,
    },
  });

  const latestSequence = documents.reduce((latest, document) => {
    if (!document.documentNumber.startsWith(prefix)) {
      return latest;
    }

    const sequence = Number.parseInt(document.documentNumber.slice(prefix.length), 10);
    return Number.isFinite(sequence) ? Math.max(latest, sequence) : latest;
  }, 0);

  return `${prefix}${String(latestSequence + 1).padStart(4, "0")}`;
}

function isDocumentNumberUniqueError(error: unknown) {
  const candidate = error as { code?: string; meta?: { target?: unknown }; message?: string };
  const target = Array.isArray(candidate.meta?.target) ? candidate.meta.target.join(" ") : String(candidate.meta?.target ?? "");

  return candidate.code === "P2002" && /documentNumber|Document_documentNumber_key/i.test(`${target} ${candidate.message ?? ""}`);
}

function createVerificationToken() {
  return randomBytes(18).toString("hex");
}

function assertCanViewDocument(role: Role) {
  void role;
  return true;
}

export async function getAssignableUsers() {
  return prisma.user.findMany({
    where: {
      active: true,
      role: {
        not: "VIEWER_AUDITOR",
      },
    },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      role: true,
    },
  });
}

export async function getDashboardData() {
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const [documentsByStatus, latestDocuments, latestActivities, chartDocuments] =
    await Promise.all([
      prisma.document.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),
      prisma.document.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        include: {
          creator: {
            select: { name: true },
          },
        },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: {
          actor: {
            select: { name: true },
          },
        },
      }),
      prisma.document.findMany({
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          formType: true,
          formPayload: true,
          sampleName: true,
          createdAt: true,
        },
      }),
    ]);

  const monthlyMap = new Map<
    string,
    {
      year: string;
      month: string;
      monthIndex: number;
      published: number;
    }
  >();

  const sampleCategoryDocuments = chartDocuments.map((document) => {
    const createdAt = document.createdAt;
    const year = String(createdAt.getFullYear());
    const monthIndex = createdAt.getMonth();
    const month = monthLabels[monthIndex];
    const monthlyKey = `${year}-${monthIndex}`;

    const currentMonthly = monthlyMap.get(monthlyKey) ?? {
      year,
      month,
      monthIndex,
      published: 0,
    };

    currentMonthly.published += 1;
    monthlyMap.set(monthlyKey, currentMonthly);

    const payload = resolveLhuPayload(document.formType, document.formPayload);

    const sampleName =
      payload.sample.sampleName?.trim() || document.sampleName?.trim() || "";

    return {
      year,
      month,
      monthIndex,
      sampleName: sampleName || "Tanpa Nama Sampel",
      sampleCategory: categorizeSampleName(sampleName),
    };
  });

  return {
    documentsByStatus,
    latestDocuments,
    latestActivities,
    monthlyDocuments: Array.from(monthlyMap.values()).sort((a, b) => {
      if (a.year !== b.year) return Number(a.year) - Number(b.year);
      return a.monthIndex - b.monthIndex;
    }),
    sampleCategoryDocuments,
  };
}

export async function getDocuments() {
  await ensureDocumentVerificationTokens();

  return prisma.document.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      creator: {
        select: { name: true },
      },
      assignedTo: {
        select: { name: true },
      },
      verification: true,
    },
  });
}

async function ensureDocumentVerificationTokens() {
  const documents = await prisma.document.findMany({
    select: {
      id: true,
      status: true,
      publishedAt: true,
      verification: {
        select: {
          id: true,
          isActive: true,
          publishedAt: true,
        },
      },
    },
  });
  const missingTokenDocuments = documents.filter((document) => !document.verification);

  if (!missingTokenDocuments.length) {
    return;
  }

  await prisma.$transaction([
    ...missingTokenDocuments.map((document) =>
      prisma.verificationToken.create({
        data: {
          documentId: document.id,
          token: createVerificationToken(),
          isActive: document.status !== "revoked",
          publishedAt: document.publishedAt ?? new Date(),
        },
      }),
    ),
  ]);
}

export async function getReviewQueue() {
  return prisma.document.findMany({
    where: { status: "review" },
    orderBy: { updatedAt: "asc" },
    include: {
      creator: {
        select: { name: true },
      },
      assignedTo: {
        select: { name: true },
      },
    },
  });
}

export async function getPublishedDocuments() {
  return prisma.document.findMany({
    where: {
      status: {
        in: ["published", "revoked"],
      },
    },
    orderBy: { publishedAt: "desc" },
    include: {
      verification: true,
    },
  });
}

export async function getDocumentDetail(documentId: string, role: Role) {
  assertCanViewDocument(role);

  return prisma.document.findUnique({
    where: { id: documentId },
    include: {
      creator: {
        select: { name: true, email: true },
      },
      assignedTo: {
        select: { id: true, name: true, role: true },
      },
      reviewEntries: {
        orderBy: { createdAt: "desc" },
        include: {
          reviewer: {
            select: { name: true, role: true },
          },
        },
      },
      verification: true,
    },
  });
}

export async function getRecentAuditLog(documentId: string) {
  return prisma.auditLog.findMany({
    where: {
      entityType: "document",
      entityId: documentId,
    },
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      actor: {
        select: { name: true },
      },
    },
  });
}

export async function createDocument(actor: AuthUser, input: Record<string, string>) {
  if (!canCreateDocument(actor.role)) {
    throw new Error("Anda tidak memiliki izin untuk membuat dokumen.");
  }

  const parsed = parseLhuDocumentInput(input);

  if (parsed.formType !== "TYPE_1" && parsed.formType !== "TYPE_2") {
    await ensureLatestFormTypeEnum();
  }

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      return await prisma.$transaction(async (tx) => {
        const documentNumber = await generateDocumentNumber(tx);

        const created = await tx.document.create({
          data: {
            documentNumber,
            title: parsed.title,
            formType: parsed.formType,
            referenceNo: normalizeOptionalString(parsed.referenceNo),
            clientName: normalizeOptionalString(parsed.clientName),
            sampleName: normalizeOptionalString(parsed.sampleName),
            notes: normalizeOptionalString(parsed.notes),
            assignedToId: normalizeOptionalString(parsed.assignedToId),
            formPayload: parsed.formPayload as Prisma.InputJsonValue,
            createdById: actor.id,
          },
        });

        const token = createVerificationToken();
        await tx.verificationToken.create({
          data: {
            documentId: created.id,
            token,
            isActive: true,
            publishedAt: new Date(),
          },
        });

        await recordAudit(tx, {
          actorId: actor.id,
          action: "document.create",
          entityType: "document",
          entityId: created.id,
          metadata: {
            documentNumber,
            formTypeLabel: formTypeLabels[created.formType],
            verificationToken: token,
          },
        });

        return created;
      });
    } catch (error) {
      if (attempt < 5 && isDocumentNumberUniqueError(error)) {
        continue;
      }

      throw error;
    }
  }

  throw new Error("Nomor dokumen gagal dibuat. Silakan coba simpan ulang.");
}

export async function updateDocument(actor: AuthUser, input: Record<string, string>) {
  const parsed = parseLhuDocumentInput(input);
  const documentId = input.documentId?.trim();

  if (!documentId) {
    throw new Error("Dokumen tidak ditemukan.");
  }

  if (parsed.formType !== "TYPE_1" && parsed.formType !== "TYPE_2") {
    await ensureLatestFormTypeEnum();
  }

  return prisma.$transaction(async (tx) => {
    const existing = await tx.document.findUnique({
      where: { id: documentId },
    });

    if (!existing) {
      throw new Error("Dokumen tidak ditemukan.");
    }

    if (!canEditDocument(actor.role, existing.status)) {
      throw new Error("Dokumen pada status ini tidak dapat diubah oleh role Anda.");
    }

    const nextFormType = existing.status === "draft" ? parsed.formType : existing.formType;

    const updated = await tx.document.update({
      where: { id: existing.id },
      data: {
        title: parsed.title,
        referenceNo: normalizeOptionalString(parsed.referenceNo),
        clientName: normalizeOptionalString(parsed.clientName),
        sampleName: normalizeOptionalString(parsed.sampleName),
        notes: normalizeOptionalString(parsed.notes),
        assignedToId: normalizeOptionalString(parsed.assignedToId),
        formType: nextFormType,
        formPayload: parsed.formPayload as Prisma.InputJsonValue,
      },
    });

    await recordAudit(tx, {
      actorId: actor.id,
      action: "document.update",
      entityType: "document",
      entityId: updated.id,
      metadata: {
        status: updated.status,
      },
    });

    return updated;
  });
}

export async function deleteDocument(actor: AuthUser, input: Record<string, string>) {
  if (!canDeleteDocument(actor.role)) {
    throw new Error("Anda tidak memiliki izin untuk menghapus dokumen.");
  }

  const documentId = input.documentId?.trim();

  if (!documentId) {
    throw new Error("Dokumen tidak ditemukan.");
  }

  return prisma.$transaction(async (tx) => {
    const existing = await tx.document.findUnique({
      where: { id: documentId },
    });

    if (!existing) {
      throw new Error("Dokumen tidak ditemukan.");
    }

    await recordAudit(tx, {
      actorId: actor.id,
      action: "document.delete",
      entityType: "document",
      entityId: existing.id,
      metadata: {
        documentNumber: existing.documentNumber,
        title: existing.title,
      },
    });

    await tx.document.delete({
      where: { id: existing.id },
    });

    return existing;
  });
}

async function createReviewEntry(
  tx: Prisma.TransactionClient,
  {
    documentId,
    reviewerId,
    action,
    comment,
  }: {
    documentId: string;
    reviewerId: string;
    action: ReviewAction;
    comment?: string | null;
  },
) {
  await tx.reviewEntry.create({
    data: {
      documentId,
      reviewerId,
      action,
      comment: normalizeOptionalString(comment ?? null),
    },
  });
}

export async function transitionDocument(actor: AuthUser, input: Record<string, string>) {
  const parsed = transitionSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    const existing = await tx.document.findUnique({
      where: { id: parsed.documentId },
      include: { verification: true },
    });

    if (!existing) {
      throw new Error("Dokumen tidak ditemukan.");
    }

    if (!canTransitionStatus(existing.status, parsed.nextStatus)) {
      throw new Error("Perubahan status tidak valid.");
    }

    const comment = normalizeOptionalString(parsed.comment);

    if (parsed.nextStatus === "input_hasil") {
      if (!canEditDocument(actor.role, existing.status)) {
        throw new Error("Anda tidak dapat memindahkan dokumen ke tahap input hasil.");
      }
    }

    if (parsed.nextStatus === "review") {
      if (!canSubmitForReview(actor.role, existing.status)) {
        throw new Error("Anda tidak dapat mengirim dokumen ke review.");
      }

      await createReviewEntry(tx, {
        documentId: existing.id,
        reviewerId: actor.id,
        action: ReviewAction.SUBMIT,
        comment,
      });
    }

    if (parsed.nextStatus === "revisi") {
      if (!canReviewDocument(actor.role)) {
        throw new Error("Hanya QA atau supervisor yang dapat mengembalikan revisi.");
      }

      if (!comment) {
        throw new Error("Komentar revisi wajib diisi.");
      }

      await createReviewEntry(tx, {
        documentId: existing.id,
        reviewerId: actor.id,
        action: ReviewAction.RETURN_REVISI,
        comment,
      });
    }

    if (parsed.nextStatus === "approved") {
      if (!canReviewDocument(actor.role)) {
        throw new Error("Hanya QA atau supervisor yang dapat approve.");
      }

      await createReviewEntry(tx, {
        documentId: existing.id,
        reviewerId: actor.id,
        action: ReviewAction.APPROVE,
        comment,
      });
    }

    if (parsed.nextStatus === "published" && !canPublishDocument(actor.role)) {
      throw new Error("Hanya admin yang dapat publish dokumen.");
    }

    if (parsed.nextStatus === "revoked" && !canRevokeDocument(actor.role)) {
      throw new Error("Hanya admin yang dapat revoke dokumen.");
    }

    const publishedAt = parsed.nextStatus === "published" ? new Date() : existing.publishedAt;

    const updated = await tx.document.update({
      where: { id: existing.id },
      data: {
        status: parsed.nextStatus,
        publishedAt,
      },
    });

    if (parsed.nextStatus === "published") {
      const token = existing.verification?.token ?? createVerificationToken();

      await tx.verificationToken.upsert({
        where: { documentId: existing.id },
        update: {
          isActive: true,
          publishedAt: publishedAt ?? new Date(),
          revokedAt: null,
        },
        create: {
          documentId: existing.id,
          token,
          isActive: true,
          publishedAt: publishedAt ?? new Date(),
        },
      });
    }

    if (parsed.nextStatus === "revoked" && existing.verification) {
      await tx.verificationToken.update({
        where: { documentId: existing.id },
        data: {
          isActive: false,
          revokedAt: new Date(),
        },
      });
    }

    await recordAudit(tx, {
      actorId: actor.id,
      action: `document.status.${parsed.nextStatus}`,
      entityType: "document",
      entityId: existing.id,
      metadata: {
        from: existing.status,
        to: parsed.nextStatus,
        comment,
      },
    });

    return updated;
  });
}

export async function addReviewComment(actor: AuthUser, input: Record<string, string>) {
  if (!canReviewDocument(actor.role)) {
    throw new Error("Hanya QA atau supervisor yang dapat menambah komentar review.");
  }

  const parsed = reviewCommentSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    const existing = await tx.document.findUnique({
      where: { id: parsed.documentId },
    });

    if (!existing) {
      throw new Error("Dokumen tidak ditemukan.");
    }

    if (existing.status !== "review") {
      throw new Error("Komentar review hanya dapat ditambahkan saat status review.");
    }

    await createReviewEntry(tx, {
      documentId: existing.id,
      reviewerId: actor.id,
      action: ReviewAction.COMMENT,
      comment: parsed.comment,
    });

    await recordAudit(tx, {
      actorId: actor.id,
      action: "document.review.comment",
      entityType: "document",
      entityId: existing.id,
      metadata: {
        comment: parsed.comment,
      },
    });
  });
}

export async function resolveVerificationToken(token: string) {
  const verification = await prisma.verificationToken.findUnique({
    where: { token },
    include: {
      document: true,
    },
  });

  if (!verification) {
    return null;
  }

  return verification;
}
