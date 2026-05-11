"use client";

import { useState } from "react";

import { loginAction } from "@/actions/auth";

const demoPassword = "Password123!";

const demoAccounts = [
  {
    label: "Super Admin",
    email: "superadmin@gis-lhu.local",
    shortcut: "SA",
  },
  {
    label: "Admin Lab",
    email: "admin@gis-lhu.local",
    shortcut: "AD",
  },
];

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fillDemoAccount = (accountEmail: string) => {
    setEmail(accountEmail);
    setPassword(demoPassword);
  };

  return (
    <>
      <form action={loginAction} className="mt-6 space-y-3.5">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-white/38">
            Email
          </span>
          <input
            className="login-input"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="superadmin@gis-lhu.local"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-white/38">
            Password
          </span>
          <input
            className="login-input"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={demoPassword}
            required
          />
        </label>

        <button className="login-submit mt-4 w-full rounded-[16px] px-4 py-3.5 text-sm font-semibold text-[#101114]">
          Masuk ke Sistem
        </button>
      </form>

      <div className="my-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-white/22">
        <div className="h-px flex-1 bg-white/10" />
        <span>Demo access</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {demoAccounts.map((account) => (
          <button
            key={account.email}
            type="button"
            className="login-provider text-white/82 transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            onClick={() => fillDemoAccount(account.email)}
          >
            <span className="text-sm font-semibold">{account.shortcut}</span>
            <span>{account.label}</span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm leading-7 text-white/34">
        Klik akun demo untuk isi otomatis. Password seluruh akun demo:{" "}
        <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 font-mono text-white/78">
          {demoPassword}
        </span>
      </p>
    </>
  );
}
