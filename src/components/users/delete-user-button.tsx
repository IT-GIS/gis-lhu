"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function DeleteUserButton({
  disabled = false,
  userName,
}: {
  disabled?: boolean;
  userName: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="sm"
      variant="outline"
      disabled={disabled || pending}
      className="whitespace-nowrap border-red-100 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
      onClick={(event) => {
        const confirmed = window.confirm(
          `Yakin ingin menghapus akun ${userName}? Akun ini tidak akan bisa login lagi.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
      {pending ? "Menghapus..." : "Hapus"}
    </Button>
  );
}
