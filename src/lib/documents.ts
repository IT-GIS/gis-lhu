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
import { parseLhuDocumentInput } from "@/lib/lhu-payload";
import {
  reviewCommentSchema,
  transitionSchema,
} from "@/lib/validators";
import { canTransitionStatus } from "@/lib/workflow";

function normalizeOptionalString(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

async function generateDocumentNumber(tx: Prisma.TransactionClient) {
  const year = new Date().getFullYear();
  const start = new Date(`${year}-01-01T00:00:00.000Z`);
  const end = new Date(`${year + 1}-01-01T00:00:00.000Z`);

  const totalThisYear = await tx.document.count({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });

  return `GIS-LHU/${year}/${String(totalThisYear + 1).padStart(4, "0")}`;
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
  const [documentsByStatus, latestDocuments, latestActivities] = await Promise.all([
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
  ]);

  return {
    documentsByStatus,
    latestDocuments,
    latestActivities,
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
  const inactiveTokens = documents.filter((document) => document.verification && !document.verification.isActive);

  if (!missingTokenDocuments.length && !inactiveTokens.length) {
    return;
  }

  await prisma.$transaction([
    ...missingTokenDocuments.map((document) =>
      prisma.verificationToken.create({
        data: {
          documentId: document.id,
          token: createVerificationToken(),
          isActive: true,
          publishedAt: new Date(),
        },
      }),
    ),
    ...inactiveTokens.map((document) =>
      prisma.verificationToken.update({
        where: { documentId: document.id },
        data: {
          isActive: true,
          revokedAt: null,
          publishedAt: document.verification?.publishedAt ?? new Date(),
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

  return prisma.$transaction(async (tx) => {
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
}

export async function updateDocument(actor: AuthUser, input: Record<string, string>) {
  const parsed = parseLhuDocumentInput(input);
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
      const token = createVerificationToken();

      await tx.verificationToken.upsert({
        where: { documentId: existing.id },
        update: {
          token,
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
