import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Archive,
  Bell,
  Clock,
  Inbox,
  Mail,
  MessageSquareText,
} from "lucide-react";

import { FlashMessage } from "@/components/flash-message";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { Badge } from "@/components/ui/badge";
import { requireAuthenticatedUser } from "@/lib/auth";
import { canViewContactMessages } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

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

function getMessagePreview(value: string, maxLength = 130) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength)}...`;
}

function StatusBadge({ status }: { status: ContactMessage["status"] }) {
  return (
    <Badge className={statusClassNames[status]}>{statusLabels[status]}</Badge>
  );
}

function MessageStatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number;
  icon: typeof Inbox;
  tone?: "default" | "cyan" | "amber";
}) {
  const toneClass =
    tone === "cyan"
      ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300"
      : tone === "amber"
        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
        : "bg-slate-50 text-slate-700 dark:bg-slate-900/70 dark:text-slate-200";

  return (
    <div className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-black text-[var(--color-gis-navy)] dark:text-slate-100">
            {value}
          </p>
        </div>

        <div className={`rounded-2xl p-3 ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await requireAuthenticatedUser();

  if (!canViewContactMessages(user.role)) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const success =
    typeof params.success === "string" ? params.success : undefined;
  const error = typeof params.error === "string" ? params.error : undefined;

  const messages = await prisma.$queryRaw<ContactMessage[]>`
    SELECT id, name, email, subject, message, status, source, userAgent, createdAt, updatedAt
    FROM contactmessage
    ORDER BY createdAt DESC
    LIMIT 200
  `;

  const unreadCount = messages.filter(
    (message) => message.status === "unread",
  ).length;

  const archivedCount = messages.filter(
    (message) => message.status === "archived",
  ).length;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Pesan Contact Us"
        description="Lihat pesan yang dikirim pengunjung melalui form Contact Us di halaman publik GIS Laboratorium."
        actions={
          <div className="flex items-center gap-2 rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-extrabold text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300">
            <Bell className="h-4 w-4" />
            {unreadCount} pesan baru
          </div>
        }
      />

      <FlashMessage success={success} error={error} />

      {unreadCount > 0 ? (
        <div className="rounded-[24px] border border-cyan-100 bg-cyan-50/80 px-5 py-4 text-sm font-bold text-cyan-800 shadow-sm dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-200">
          Ada {unreadCount} pesan yang belum dibaca. Tekan card pesan untuk
          membaca rincian.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <MessageStatCard
          label="Total Pesan"
          value={messages.length}
          icon={Inbox}
        />
        <MessageStatCard
          label="Belum Dibaca"
          value={unreadCount}
          icon={Bell}
          tone="cyan"
        />
        <MessageStatCard
          label="Diarsipkan"
          value={archivedCount}
          icon={Archive}
          tone="amber"
        />
      </div>

      <SectionCard
        title="Kotak Pesan"
        description={`Menampilkan ${messages.length} pesan terbaru.`}
      >
        {messages.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-sky-200 bg-sky-50/60 p-8 text-center text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900/60">
            Belum ada pesan dari halaman Contact Us.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => {
              const isUnread = message.status === "unread";
              const isArchived = message.status === "archived";
              const isEven = index % 2 === 0;

              const cardClassName = isUnread
                ? "border-cyan-300 bg-cyan-50/45 shadow-[0_18px_44px_-32px_rgba(6,182,212,0.75)] dark:border-cyan-800 dark:bg-cyan-950/20"
                : isArchived
                  ? "border-amber-200 bg-amber-50/45 opacity-80 dark:border-amber-900/70 dark:bg-amber-950/20"
                  : isEven
                    ? "border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950/55"
                    : "border-slate-200 bg-slate-50/85 shadow-sm dark:border-slate-800 dark:bg-slate-900/55";

              const accentClassName = isUnread
                ? "bg-cyan-500"
                : isArchived
                  ? "bg-amber-400"
                  : "bg-slate-300 dark:bg-slate-600";

              return (
                <Link
                  key={message.id}
                  href={`/messages/${message.id}`}
                  className={`group relative flex flex-col gap-5 overflow-hidden rounded-[28px] border p-5 pl-6 transition-all hover:-translate-y-0.5 hover:border-[var(--color-gis-blue)]/35 hover:shadow-xl md:flex-row md:items-center md:justify-between ${cardClassName}`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-1.5 ${accentClassName}`}
                  />

                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        isUnread
                          ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"
                          : isArchived
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      <MessageSquareText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black text-[var(--color-gis-navy)] dark:text-slate-100">
                          {message.name}
                        </p>

                        {isUnread ? (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.7)]" />
                        ) : null}

                        <StatusBadge status={message.status} />
                      </div>

                      <p className="mt-1 break-all text-xs font-bold text-[var(--color-gis-blue)]">
                        {message.email}
                      </p>

                      <p className="mt-3 text-sm font-extrabold text-slate-800 dark:text-slate-100">
                        {message.subject || "Pesan dari halaman Contact Us"}
                      </p>

                      <p className="mt-2 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                        {getMessagePreview(message.message, 180)}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-4 text-xs font-bold text-slate-400 dark:border-slate-800 md:w-[230px] md:flex-col md:items-end md:border-t-0 md:pt-0">
                    <span className="flex items-center gap-2 text-left md:text-right">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      {formatDateTime(message.createdAt)} WIB
                    </span>

                    <span className="rounded-2xl bg-[var(--color-gis-blue)]/10 px-4 py-2 font-extrabold text-[var(--color-gis-blue)] transition group-hover:bg-[var(--color-gis-blue)] group-hover:text-white">
                      Baca detail
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
