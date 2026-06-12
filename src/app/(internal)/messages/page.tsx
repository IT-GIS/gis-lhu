import type { ReactNode } from "react";

import { redirect } from "next/navigation";
import { Inbox, MailOpen, Archive } from "lucide-react";

import { updateContactMessageStatusAction } from "@/actions/contact-messages";
import { FlashMessage } from "@/components/flash-message";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  unread: "border-cyan-200 bg-cyan-50 text-cyan-700",
  read: "border-slate-200 bg-slate-50 text-slate-600",
  archived: "border-amber-200 bg-amber-50 text-amber-700",
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
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${statusClassNames[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

function StatusAction({ id, status, children }: { id: string; status: ContactMessage["status"]; children: ReactNode }) {
  return (
    <form action={updateContactMessageStatusAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <Button type="submit" variant="secondary" size="sm">
        {children}
      </Button>
    </form>
  );
}

export default async function MessagesPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireAuthenticatedUser();

  if (!canViewContactMessages(user.role)) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const success = typeof params.success === "string" ? params.success : undefined;
  const error = typeof params.error === "string" ? params.error : undefined;

  const messages = await prisma.$queryRaw<ContactMessage[]>`
    SELECT id, name, email, subject, message, status, source, userAgent, createdAt, updatedAt
    FROM contactmessage
    ORDER BY createdAt DESC
    LIMIT 200
  `;

  const unreadCount = messages.filter((message) => message.status === "unread").length;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Pesan Contact Us"
        description="Lihat pesan yang dikirim pengunjung melalui form Contact Us di halaman publik GIS Laboratorium."
        actions={
          <div className="flex items-center gap-2 rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-extrabold text-cyan-700">
            <Inbox className="h-4 w-4" />
            {unreadCount} pesan belum dibaca
          </div>
        }
      />

      <FlashMessage success={success} error={error} />

      <SectionCard title="Kotak pesan" description={`Menampilkan ${messages.length} pesan terbaru.`}>
        {messages.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-sky-200 bg-sky-50/60 p-8 text-center text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900/60">
            Belum ada pesan dari halaman Contact Us.
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Pengirim</TableHead>
                  <TableHead>Pesan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="whitespace-nowrap text-xs font-semibold text-slate-500">
                      {formatDateTime(message.createdAt)} WIB
                    </TableCell>
                    <TableCell className="min-w-[220px]">
                      <div className="font-extrabold text-[var(--color-gis-navy)] dark:text-slate-100">{message.name}</div>
                      <a className="text-xs font-bold text-[var(--color-gis-blue)] hover:underline" href={`mailto:${message.email}`}>
                        {message.email}
                      </a>
                    </TableCell>
                    <TableCell className="min-w-[360px]">
                      <div className="mb-1 text-sm font-extrabold text-slate-800 dark:text-slate-100">
                        {message.subject || "Pesan dari halaman Contact Us"}
                      </div>
                      <p className="whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">{message.message}</p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={message.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {message.status !== "read" ? (
                          <StatusAction id={message.id} status="read">
                            <MailOpen className="h-3.5 w-3.5" />
                            Sudah dibaca
                          </StatusAction>
                        ) : null}
                        {message.status !== "archived" ? (
                          <StatusAction id={message.id} status="archived">
                            <Archive className="h-3.5 w-3.5" />
                            Arsipkan
                          </StatusAction>
                        ) : null}
                        {message.status === "archived" ? (
                          <StatusAction id={message.id} status="unread">
                            <Inbox className="h-3.5 w-3.5" />
                            Kembalikan
                          </StatusAction>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </SectionCard>
    </div>
  );
}
