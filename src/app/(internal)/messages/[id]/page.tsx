import type { ReactNode } from "react";

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  Clock,
  Inbox,
  Mail,
  MailOpen,
  UserRound,
} from "lucide-react";

import {
  deleteContactMessageAction,
  updateContactMessageStatusAction,
} from "@/actions/contact-messages";
import { DeleteMessageButton } from "@/components/messages/delete-message-button";
import { FlashMessage } from "@/components/flash-message";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireAuthenticatedUser } from "@/lib/auth";
import { canViewContactMessages } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "unread" | "read" | "archived";
  source: string | null;
  userAgent: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const statusLabels: Record<ContactMessage["status"], string> = {
  unread: "Belum dibaca",
  read: "Sudah dibaca",
  archived: "Diarsipkan",
};

const statusClassNames: Record<ContactMessage["status"], string> = {
  unread:
    "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300",
  read: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300",
  archived:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300",
};

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function StatusBadge({ status }: { status: ContactMessage["status"] }) {
  return (
    <Badge className={statusClassNames[status]}>{statusLabels[status]}</Badge>
  );
}

function StatusAction({
  id,
  status,
  returnTo,
  children,
}: {
  id: string;
  status: ContactMessage["status"];
  returnTo: string;
  children: ReactNode;
}) {
  return (
    <form action={updateContactMessageStatusAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="returnTo" value={returnTo} />

      <Button type="submit" variant="secondary" size="sm">
        {children}
      </Button>
    </form>
  );
}

export default async function MessageDetailPage({
  params,
  searchParams,
}: RouteContext) {
  const user = await requireAuthenticatedUser();

  if (!canViewContactMessages(user.role)) {
    redirect("/dashboard");
  }

  const { id } = await params;
  const query = await searchParams;

  const success = typeof query.success === "string" ? query.success : undefined;
  const error = typeof query.error === "string" ? query.error : undefined;

  const rows = await prisma.$queryRaw<ContactMessage[]>`
    SELECT id, name, email, subject, message, status, source, userAgent, createdAt, updatedAt
    FROM contactmessage
    WHERE id = ${id}
    LIMIT 1
  `;

  const message = rows[0];

  if (!message) {
    notFound();
  }

  const detailPath = `/messages/${message.id}`;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Detail Pesan"
        description="Baca rincian pesan yang dikirim melalui halaman Contact Us."
        actions={
          <Button asChild variant="secondary">
            <Link href="/messages">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Pesan
            </Link>
          </Button>
        }
      />

      <FlashMessage success={success} error={error} />

      <SectionCard
        title={message.subject || "Pesan dari halaman Contact Us"}
        description={`Dikirim oleh ${message.name}`}
      >
        <div className="space-y-5">
          <div className="flex flex-col justify-between gap-4 rounded-[28px] border border-sky-100 bg-sky-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/55 lg:flex-row lg:items-start">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <StatusBadge status={message.status} />

                {message.status === "unread" ? (
                  <Badge className="border-cyan-200 bg-white text-cyan-700 dark:border-cyan-900/70 dark:bg-slate-950 dark:text-cyan-300">
                    Pesan baru
                  </Badge>
                ) : null}
              </div>

              <h2 className="text-2xl font-black leading-tight text-[var(--color-gis-navy)] dark:text-slate-100">
                {message.subject || "Pesan dari halaman Contact Us"}
              </h2>

              <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-slate-400" />
                  {message.name}
                </div>

                <a
                  href={`mailto:${message.email}`}
                  className="flex items-center gap-2 text-[var(--color-gis-blue)] hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {message.email}
                </a>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  {formatDateTime(message.createdAt)} WIB
                </div>

                <div className="flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-slate-400" />
                  {message.source || "contact_page"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/45">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400">
              Isi Pesan
            </p>

            <div className="whitespace-pre-line text-base font-medium leading-8 text-slate-700 dark:text-slate-200">
              {message.message}
            </div>
          </div>

          {message.userAgent ? (
            <div className="rounded-[22px] border border-slate-100 bg-slate-50/70 p-4 text-xs font-semibold leading-6 text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
              <span className="font-black text-slate-600 dark:text-slate-300">
                User Agent:
              </span>{" "}
              {message.userAgent}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {message.status !== "read" ? (
              <StatusAction id={message.id} status="read" returnTo={detailPath}>
                <MailOpen className="h-3.5 w-3.5" />
                Tandai dibaca
              </StatusAction>
            ) : null}

            {message.status !== "archived" ? (
              <StatusAction
                id={message.id}
                status="archived"
                returnTo={detailPath}
              >
                <Archive className="h-3.5 w-3.5" />
                Arsipkan
              </StatusAction>
            ) : null}

            {message.status === "archived" ? (
              <StatusAction
                id={message.id}
                status="unread"
                returnTo={detailPath}
              >
                <Inbox className="h-3.5 w-3.5" />
                Kembalikan
              </StatusAction>
            ) : null}

            <form action={deleteContactMessageAction}>
              <input type="hidden" name="id" value={message.id} />
              <DeleteMessageButton senderName={message.name} />
            </form>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
