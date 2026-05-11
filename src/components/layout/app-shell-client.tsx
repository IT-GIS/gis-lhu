"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import type { AppRole } from "@/lib/domain";

interface AppShellClientProps {
  children: React.ReactNode;
  userFullName: string;
  userRole: AppRole;
  userRoleLabel: string;
  logoutAction: () => void;
}

/**
 * AppShellClient Component
 * Client-side layout with collapsible sidebar, glassmorphism styling,
 * and top bar with user info. Ported from gift project design.
 */
export function AppShellClient({
  children,
  userFullName,
  userRole,
  userRoleLabel,
  logoutAction,
}: AppShellClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-500">
      <div
        className={`mx-auto grid min-h-screen max-w-[1600px] gap-6 p-4 transition-all duration-500 ease-in-out ${
          isCollapsed ? "grid-cols-1 lg:grid-cols-[104px_1fr]" : "grid-cols-1 lg:grid-cols-[280px_1fr]"
        }`}
      >
        <aside className={`relative lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] z-40 rounded-[32px] border border-white/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 p-5 shadow-glass backdrop-blur-xl flex flex-col transition-all duration-500 overflow-visible ${isCollapsed ? "items-center px-4" : ""}`}>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-10 z-50 h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md hover:scale-110 transition-transform hidden lg:flex items-center justify-center text-slate-600 dark:text-slate-300"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          <div className="mb-8 flex items-center justify-center group cursor-pointer w-full relative h-12">
            <div className={`absolute left-0 transition-all duration-500 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-100 shadow-sm border border-slate-200 overflow-hidden group-hover:scale-105 group-hover:shadow-md ${isCollapsed ? "h-12 w-12 translate-x-[12px]" : "h-12 w-12 translate-x-0"}`}>
              <div className="relative font-[family-name:var(--font-display-ui)] font-black text-xl tracking-tight flex items-baseline">
                <span className="text-gis-blue">G</span>
                <span className="text-gis-red text-2xl -mx-[2px] drop-shadow-sm">I</span>
                <span className="text-gis-blue">S</span>
              </div>
            </div>

            <div className={`absolute pl-16 transition-all duration-500 flex flex-col justify-center whitespace-nowrap overflow-hidden ${isCollapsed ? "opacity-0 w-0 -translate-x-4" : "opacity-100 w-full translate-x-0"}`}>
               <div className="font-bold text-slate-900 dark:text-slate-100 text-base">GIS LHU</div>
               <div className="text-[9px] font-medium text-slate-500 dark:text-slate-400">PT. GLOBAL INSPEKSI SISTEM</div>
            </div>
          </div>

          <SidebarNav isCollapsed={isCollapsed} userRole={userRole} />

          <div className={`mt-auto pt-8 flex transition-all duration-500 w-full ${isCollapsed ? "flex-col gap-4 items-center" : "items-center gap-3"}`}>
             <ThemeToggle />
             <form action={logoutAction} className={isCollapsed ? "" : "w-full"}>
               <Button variant="secondary" className={`transition-all duration-500 overflow-hidden ${isCollapsed ? "h-10 w-10 p-0 rounded-xl bg-slate-100 dark:bg-slate-800" : "w-full rounded-xl"}`} title={isCollapsed ? "Logout" : undefined}>
                 <LogOut className="shrink-0 h-4 w-4" />
                 <span className={`whitespace-nowrap transition-all duration-500 ${isCollapsed ? "max-w-0 opacity-0 hidden" : "ml-2 max-w-[100px] opacity-100"}`}>Logout</span>
               </Button>
             </form>
          </div>
        </aside>

        <div className="rounded-[32px] flex-1 min-w-0 border border-white/60 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 shadow-glass backdrop-blur-xl flex flex-col overflow-hidden transition-all duration-500">
          <div className="border-b border-white/70 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between bg-white/40 dark:bg-slate-900/30">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:block">Workflow LHU • Draft → Review → Publish → Verify</div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 sm:hidden">LHU Panel</div>

            <div className="flex items-center gap-3 group bg-white/70 hover:bg-white px-2 py-2 sm:px-3 sm:py-1.5 rounded-full border border-white/80 shadow-sm transition-all hover:shadow-md dark:bg-slate-800/80 dark:border-slate-700 dark:hover:bg-slate-800">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{userFullName}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{userRoleLabel}</div>
              </div>
              <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-600/10 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
          <main className="p-4 sm:p-6 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}
