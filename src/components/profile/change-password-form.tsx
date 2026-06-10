"use client";

import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChangePasswordFormProps = {
  action: (formData: FormData) => void | Promise<void>;
};

const labelClass =
  "mb-2 block text-sm font-bold text-[var(--color-gis-navy)] dark:text-slate-200";

export function ChangePasswordForm({ action }: ChangePasswordFormProps) {
  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className={labelClass}>Password Lama</span>
        <Input
          type="password"
          name="oldPassword"
          placeholder="••••••••"
          required
        />
      </label>

      <label className="block">
        <span className={labelClass}>Password Baru</span>
        <Input
          type="password"
          name="newPassword"
          placeholder="Minimal 6 karakter"
          minLength={6}
          required
        />
      </label>

      <label className="block">
        <span className={labelClass}>Konfirmasi Password Baru</span>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Ulangi password baru"
          minLength={6}
          required
        />
      </label>

      <div className="flex justify-end pt-2">
        <Button type="submit" className="w-full sm:w-auto">
          <KeyRound className="mr-2 h-4 w-4" />
          Perbarui Password
        </Button>
      </div>
    </form>
  );
}
