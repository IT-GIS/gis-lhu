import type { ReactNode } from "react";

import { logoutAction } from "@/actions/auth";
import type { AuthUser } from "@/lib/auth";
import { roleLabels } from "@/lib/domain";
import { AppShellClient } from "@/components/layout/app-shell-client";

/**
 * AppShell Server Component
 * Responsible for passing server-side session data to the
 * interactive client-side layout shell (collapsible sidebar design from gift).
 */
export function AppShell({
  user,
  children,
}: {
  user: AuthUser;
  children: ReactNode;
}) {
  return (
    <AppShellClient
      userFullName={user.name}
      userRole={user.role}
      userRoleLabel={roleLabels[user.role]}
      logoutAction={logoutAction}
    >
      {children}
    </AppShellClient>
  );
}
