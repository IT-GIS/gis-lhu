import { redirect } from "next/navigation";
import { Mail, Shield, UserPlus, Users } from "lucide-react";

import { createUserAction, deleteUserAction } from "@/actions/users";
import { DeleteUserButton } from "@/components/users/delete-user-button";
import { FlashMessage } from "@/components/flash-message";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { roleLabels, roles, type AppRole } from "@/lib/domain";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const actor = await requireAuthenticatedUser();

  if (!canManageUsers(actor.role as AppRole)) {
    redirect("/dashboard");
  }

  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : undefined;
  const success = typeof query.success === "string" ? query.success : undefined;

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="User"
        description="Kelola daftar akun yang dapat mengakses dashboard GIS LHU."
      />

      <FlashMessage error={error} success={success} />

      <div className="grid min-w-0 gap-6 2xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="min-w-0">
          <SectionCard
            title="Tambah Akun"
            description="Buat akun baru untuk user internal sesuai role dan kebutuhan akses."
          >
            <form action={createUserAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Contoh: Geovalen Immanuel"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Login</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@gislaboratorium.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role / Hak Akses</Label>
                <select
                  id="role"
                  name="role"
                  defaultValue="FRONTDESK"
                  className="h-11 w-full rounded-2xl border border-sky-100 bg-white/90 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[var(--color-gis-blue)] dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
                  required
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {roleLabels[role]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password Awal</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimal 8 karakter"
                  autoComplete="new-password"
                  required
                />
                <p className="text-xs font-medium text-slate-500">
                  Password awal dapat diganti oleh user melalui halaman
                  Pengaturan.
                </p>
              </div>

              <Button type="submit" className="w-full">
                <UserPlus className="h-4 w-4" />
                Tambah Akun
              </Button>
            </form>
          </SectionCard>
        </div>

        <div className="min-w-0">
          <SectionCard
            title="Daftar User Terdaftar"
            description={`${users.length} akun terdaftar di sistem GIS LHU.`}
          >
            <div className="w-full overflow-x-auto pb-2">
              <TableContainer>
                <Table className="min-w-[980px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[210px]">User</TableHead>
                      <TableHead className="w-[230px]">Email</TableHead>
                      <TableHead className="w-[180px]">Role</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[120px]">Dibuat</TableHead>
                      <TableHead className="w-[120px] text-right">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.length ? (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-gis-blue)]/10 text-[var(--color-gis-blue)] dark:bg-cyan-400/10 dark:text-cyan-200">
                                <Users className="h-4 w-4" />
                              </div>

                              <div className="min-w-0">
                                <p className="font-bold text-slate-800 dark:text-slate-100">
                                  {user.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  ID: {user.id.slice(0, 8)}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                              <span className="break-all">{user.email}</span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 shrink-0 text-slate-400" />
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                {roleLabels[user.role as AppRole]}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <Badge
                              className={
                                user.active
                                  ? "border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
                                  : "border-red-100 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300"
                              }
                            >
                              {user.active ? "Aktif" : "Nonaktif"}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-sm font-medium text-slate-500">
                            {formatDate(user.createdAt)}
                          </TableCell>

                          <TableCell className="text-right">
                            {user.active ? (
                              <form action={deleteUserAction}>
                                <input
                                  type="hidden"
                                  name="userId"
                                  value={user.id}
                                />

                                <DeleteUserButton
                                  userName={user.name}
                                  disabled={user.id === actor.id}
                                />
                              </form>
                            ) : (
                              <span className="whitespace-nowrap text-xs font-semibold text-slate-400">
                                Sudah dihapus
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="py-8 text-center text-sm text-slate-500"
                        >
                          Belum ada user terdaftar.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
