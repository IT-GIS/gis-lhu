"use client";

import {
  Activity, FileText,
  LayoutDashboard,
  Newspaper,
  SearchCheck,
  Settings,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { AppRole } from "@/lib/domain";
import { canCreateDocument, canManageBlogPosts } from "@/lib/permissions";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documents/new", label: "Buat Draft", icon: Upload, permission: "createDocument" },
  { href: "/documents", label: "Dokumen LHU", icon: FileText },
  { href: "/published", label: "Arsip Publikasi", icon: SearchCheck },
];

const bottomNavItems = [
  {
    href: "/posts",
    label: "Post",
    icon: Newspaper,
    permission: "manageBlogPosts",
  },
  {
    href: "/audit-logs",
    label: "Audit Logs",
    icon: Activity,
    permission: "manageBlogPosts",
  },
  { href: "/akun", label: "Pengaturan", icon: Settings }, 
];

function hasPermission(role: AppRole, permission?: string) {
  if (!permission) return true;
  if (permission === "createDocument") return canCreateDocument(role);
  if (permission === "manageBlogPosts") return canManageBlogPosts(role);
  return true;
}

type NavItem = (typeof navItems)[number] | (typeof bottomNavItems)[number];

export function SidebarNav({ isCollapsed = false, userRole }: { isCollapsed?: boolean; userRole: AppRole }) {
  const pathname = usePathname();
  const visibleNavItems = navItems.filter((item) => hasPermission(userRole, item.permission));
  const visibleBottomNavItems = bottomNavItems.filter((item) => hasPermission(userRole, item.permission));

  const renderNavItem = (item: NavItem, visibleItems: NavItem[]) => {
    const Icon = item.icon;
    const matchesCurrent =
      pathname === item.href ||
      (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));

    const isSuppressedByMoreSpecific = visibleItems.some(
      (other) =>
        other.href !== item.href &&
        other.href.length > item.href.length &&
        (pathname === other.href || pathname.startsWith(other.href + "/")),
    );

    const isActive = matchesCurrent && !isSuppressedByMoreSpecific;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`group relative flex items-center overflow-hidden rounded-2xl py-3 text-sm font-bold transition-all duration-500 ${
          isCollapsed ? "justify-center px-0" : "justify-between gap-3 px-3"
        } ${
          isActive
            ? "border border-[var(--color-gis-blue)]/24 bg-white text-[var(--color-gis-blue)] shadow-[0_12px_32px_-18px_rgba(0,112,243,0.55)] dark:border-[var(--color-gis-cyan)]/24 dark:bg-slate-900 dark:text-[var(--color-gis-cyan)]"
            : "border border-white/45 bg-white/42 text-[var(--color-gis-navy)] shadow-none hover:bg-white/88 hover:text-[var(--color-gis-blue)] dark:border-slate-800/60 dark:bg-slate-900/48 dark:text-slate-200 dark:hover:bg-slate-900/90 dark:hover:text-[var(--color-gis-cyan)]"
        }`}
        title={isCollapsed ? item.label : undefined}
      >
        {isActive ? (
          <div className="absolute left-0 top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-r-lg bg-[var(--color-gis-blue)] shadow-[0_0_14px_rgba(0,112,243,0.55)] transition-all duration-500 dark:bg-[var(--color-gis-cyan)]" />
        ) : null}

        <div className={`relative z-10 flex w-full items-center ${isCollapsed ? "justify-center pl-0" : "gap-3 pl-1"}`}>
          <div
            className={`rounded-xl p-1.5 transition-all duration-500 ${
              isActive
                ? "bg-[var(--color-gis-blue)]/10 shadow-sm dark:bg-[var(--color-gis-cyan)]/20"
                : "group-hover:bg-slate-100 dark:group-hover:bg-slate-800/80"
            }`}
          >
            <Icon
              className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                isActive ? "scale-110 rotate-[-10deg]" : "group-hover:scale-110 group-hover:rotate-[10deg]"
              }`}
            />
          </div>

          <span
            className={`whitespace-nowrap tracking-wide drop-shadow-[0_1px_0_rgba(255,255,255,0.45)] transition-all duration-500 dark:drop-shadow-none ${
              isCollapsed
                ? "max-w-0 -translate-x-2 opacity-0"
                : `max-w-[160px] opacity-100 ${isActive ? "translate-x-1.5" : "group-hover:translate-x-1"}`
            }`}
          >
            {item.label}
          </span>
        </div>

        {!isCollapsed ? (
          <div
            className={`relative z-10 shrink-0 transition-all duration-500 ${
              isActive
                ? "translate-x-0 scale-100 opacity-100"
                : "-translate-x-4 scale-0 opacity-0 group-hover:-translate-x-1 group-hover:scale-75 group-hover:opacity-100"
            }`}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-gis-blue)]/80 shadow-[0_0_8px_rgba(0,112,243,0.45)] dark:bg-[var(--color-gis-cyan)]/80" />
          </div>
        ) : null}
      </Link>
    );
  };

  return (
    <nav className="mb-8 w-full space-y-1.5">
      <div
        className={`overflow-hidden whitespace-nowrap px-2 text-xs font-extrabold uppercase tracking-widest text-slate-600 transition-all duration-500 dark:text-slate-300 ${
          isCollapsed ? "mb-0 max-h-0 opacity-0" : "mb-4 max-h-10 opacity-100"
        }`}
      >
        Menu Utama
      </div>
      {visibleNavItems.map((item) => renderNavItem(item, visibleNavItems))}

      {visibleBottomNavItems.length > 0 ? (
        <div className="mt-8 border-t border-slate-200/70 pt-4 dark:border-slate-800">
          <div
            className={`overflow-hidden whitespace-nowrap px-2 text-xs font-extrabold uppercase tracking-widest text-slate-600 transition-all duration-500 dark:text-slate-300 ${
              isCollapsed ? "mb-0 max-h-0 opacity-0" : "mb-3 max-h-10 opacity-100"
            }`}
          >
            Website
          </div>
          {visibleBottomNavItems.map((item) => renderNavItem(item, visibleBottomNavItems))}
        </div>
      ) : null}
    </nav>
  );
}
