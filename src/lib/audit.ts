import type { Prisma } from "@prisma/client";

export async function recordAudit(
  tx: Prisma.TransactionClient,
  {
    actorId,
    action,
    entityType,
    entityId,
    metadata,
  }: {
    actorId?: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Prisma.InputJsonValue;
  },
) {
  await tx.auditLog.create({
    data: {
      actorId: actorId ?? null,
      action,
      entityType,
      entityId,
      metadata,
    },
  });
}
