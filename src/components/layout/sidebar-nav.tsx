"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, ClipboardCheck, Upload, SearchCheck } from "lucide-react";
import { canCreateDocument, canReviewDocument } from "@/lib/permissions";
import type { AppRole } from "@/lib/domain";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documents/new", label: "Buat Draft", icon: Upload, permission: "createDocument" },
  { href: "/review", label: "Review QA", icon: ClipboardCheck, permission: "reviewDocument" },
  { href: "/documents", label: "Dokumen Terpadu", icon: FileText },
  { href: "/published", label: "Arsip Publikasi", icon: SearchCheck },
];

function hasPermission(role: AppRole, permission?: string) {
  if (!permission) return true;
  if (permission === "createDocument") return canCreateDocument(role);
  if (permission === "reviewDocument") return canReviewDocument(role);
  return true;
}

export function SidebarNav({ isCollapsed = false, userRole }: { isCollapsed?: boolean; userRole: AppRole }) {
  const pathname = usePathname();

  const visibleNavItems = navItems.filter(item => hasPermission(userRole, item.permission));

  return (
    <nav className="space-y-1.5 w-full mb-8">
      <div className={`text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 transition-all duration-500 whitespace-nowrap overflow-hidden ${isCollapsed ? "opacity-0 max-h-0 mb-0" : "opacity-100 max-h-10 mb-4"}`}>Menu Utama</div>
      {visibleNavItems.map((item) => {
        const Icon = item.icon;

        // Detect active route precisely (2 stages):
        const matchesCurrent =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));

        // Cancel if another MORE SPECIFIC item matches
        const isSuppressedByMoreSpecific = visibleNavItems.some(
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
             className={`group relative flex items-center ${isCollapsed ? "justify-center" : "justify-between"} rounded-2xl py-3 text-sm font-bold transition-all duration-500 overflow-hidden ${
               isCollapsed ? "px-0" : "px-3 gap-3"
             } ${
               isActive
                 ? "text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-[0_4px_20px_-4px_rgba(40,157,185,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(40,157,185,0.1)] border border-indigo-600/20 dark:border-indigo-600/20"
                 : "text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-transparent shadow-none"
             }`}
             title={isCollapsed ? item.label : undefined}
           >
            {/* Left glow pillar indicator */}
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-r-lg shadow-[0_0_12px_rgba(40,157,185,0.6)] transition-all duration-500" />
            )}

            <div className={`flex items-center relative z-10 w-full ${isCollapsed ? "justify-center pl-0" : "gap-3 pl-1"}`}>
              {/* Icon wrapper */}
              <div className={`p-1.5 rounded-xl transition-all duration-500 ${isActive ? 'bg-indigo-600/10 dark:bg-indigo-600/20 shadow-sm' : 'group-hover:bg-slate-100 dark:group-hover:bg-slate-700/50'}`}>
                <Icon className={`h-4 w-4 shrink-0 transition-all duration-300 ${isActive ? 'scale-110 rotate-[-10deg]' : 'group-hover:scale-110 group-hover:rotate-[10deg]'}`} />
              </div>

              {/* Collapsible text */}
              <span className={`tracking-wide whitespace-nowrap transition-all duration-500 ${
                isCollapsed
                  ? "max-w-0 opacity-0 -translate-x-2"
                  : `max-w-[160px] opacity-100 ${isActive ? 'translate-x-1.5' : 'group-hover:translate-x-1'}`
              }`}>
                {item.label}
              </span>
            </div>

            {/* Trailing dot indicator */}
            {!isCollapsed && (
              <div className={`relative shrink-0 z-10 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-0 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:scale-75'}`}>
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-600/80 dark:bg-indigo-400/80 shadow-[0_0_8px_rgba(40,157,185,0.4)]" />
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
