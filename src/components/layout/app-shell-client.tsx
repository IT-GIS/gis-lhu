"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";
import Image from "next/image";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import type { AppRole } from "@/lib/domain";

interface AppShellClientProps {
  children: React.ReactNode;
  userFullName: string;
  userRole: AppRole;
  userRoleLabel: string;
  logoutAction: () => void;
}

export function AppShellClient({
  children,
  userFullName,
  userRole,
  userRoleLabel,
  logoutAction,
}: AppShellClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,rgba(0,223,216,0.18),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(0,112,243,0.16),transparent_32%),linear-gradient(180deg,#f8fcff_0%,#eef7fb_48%,#ffffff_100%)] transition-colors duration-500 dark:bg-[radial-gradient(circle_at_12%_10%,rgba(0,223,216,0.12),transparent_30%),linear-gradient(180deg,#061827_0%,#0f172a_100%)]">
      <div
        className={`mx-auto grid min-h-screen max-w-[1600px] gap-6 p-4 transition-all duration-500 ease-in-out ${
          isCollapsed
            ? "grid-cols-1 lg:grid-cols-[104px_1fr]"
            : "grid-cols-1 lg:grid-cols-[280px_1fr]"
        }`}
      >
        <aside
          className={`relative z-40 flex flex-col overflow-visible rounded-[32px] border border-white/80 bg-white/86 p-5 shadow-glass backdrop-blur-2xl transition-all duration-500 dark:border-slate-700/80 dark:bg-[#07111f]/92 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] ${
            isCollapsed ? "items-center px-4" : ""
          }`}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-10 z-50 hidden h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white text-slate-600 shadow-md transition-transform hover:scale-110 hover:text-[var(--color-gis-blue)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 lg:flex"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          <div className="group relative mb-8 flex h-12 w-full cursor-pointer items-center justify-center">
            <div
              className={`absolute left-0 flex items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_16px_34px_rgba(10,37,64,0.12)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-glow dark:border-slate-800 dark:bg-slate-100 ${
                isCollapsed
                  ? "h-12 w-12 translate-x-[12px] p-1.5"
                  : "h-12 w-12 translate-x-0 p-1.5"
              }`}
            >
              <Image
                src="/landing/animation/logo-lab.png"
                alt="GIS Laboratorium"
                width={96}
                height={48}
                className="h-auto w-full object-contain"
                priority
              />
            </div>

            <div
              className={`absolute flex flex-col justify-center overflow-hidden whitespace-nowrap pl-16 transition-all duration-500 ${
                isCollapsed
                  ? "w-0 -translate-x-4 opacity-0"
                  : "w-full translate-x-0 opacity-100"
              }`}
            >
              <div className="text-base font-extrabold tracking-tight text-[var(--color-gis-navy)] dark:text-slate-100">
                GIS LHU
              </div>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                PT. GLOBAL INSPEKSI SISTEM
              </div>
            </div>
          </div>

          <SidebarNav isCollapsed={isCollapsed} userRole={userRole} />

          <div
            className={`mt-auto flex w-full border-t border-slate-200/70 pt-6 transition-all duration-500 dark:border-slate-800 ${
              isCollapsed ? "flex-col items-center gap-4" : "items-center gap-3"
            }`}
          >
            <ThemeToggle />
            <form action={logoutAction} className={isCollapsed ? "" : "w-full"}>
              <Button
                variant="secondary"
                className={`overflow-hidden transition-all duration-500 dark:text-slate-100 dark:hover:text-white ${
                  isCollapsed
                    ? "h-10 w-10 rounded-xl bg-white/80 p-0 dark:bg-slate-900"
                    : "w-full rounded-xl"
                }`}
                title={isCollapsed ? "Logout" : undefined}
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span
                  className={`whitespace-nowrap transition-all duration-500 ${
                    isCollapsed
                      ? "hidden max-w-0 opacity-0"
                      : "ml-2 max-w-[100px] opacity-100"
                  }`}
                >
                  Logout
                </span>
              </Button>
            </form>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white/60 shadow-glass backdrop-blur-2xl transition-all duration-500 dark:border-slate-800/80 dark:bg-slate-950/40">
          <div className="flex items-center justify-between border-b border-white/80 bg-white/72 px-6 py-4 dark:border-slate-800/80 dark:bg-slate-950/56">
            <div className="hidden text-sm font-bold text-[var(--color-gis-navy)] dark:text-slate-200 sm:block">
              Workflow LHU GIS: Draft {"->"} Review {"->"} Publish {"->"} Verify
            </div>
            <div className="text-sm font-bold text-[var(--color-gis-navy)] dark:text-slate-200 sm:hidden">
              LHU Panel
            </div>

            <div className="group flex items-center gap-3 rounded-full border border-white/85 bg-white/75 px-2 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:hover:bg-slate-900 sm:px-3 sm:py-1.5">
              <div className="hidden text-right md:block">
                <div className="text-sm font-bold text-slate-800 transition-colors group-hover:text-[var(--color-gis-blue)] dark:text-slate-100 dark:group-hover:text-[var(--color-gis-cyan)]">
                  {userFullName}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]">
                  {userRoleLabel}
                </div>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[var(--color-gis-blue)]/10 shadow-sm transition-transform group-hover:scale-110 dark:border-slate-700 dark:bg-slate-800">
                <User className="h-4 w-4 text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]" />
              </div>
            </div>
          </div>
          <main className="overflow-x-hidden p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
