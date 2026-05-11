import type { ReactNode } from "react";

import { AppShell } from "@/components/app-shell";
import { requireAuthenticatedUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function InternalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAuthenticatedUser();

  return <AppShell user={user}>{children}</AppShell>;
}
