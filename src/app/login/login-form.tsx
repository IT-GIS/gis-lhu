"use client";

import { useState, useTransition } from "react";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { loginAction } from "@/actions/auth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        const result = await loginAction(formData);
        if (result?.error) {
          setError(result.error);
        }
      } catch (submitError) {
        if (isRedirectError(submitError)) {
          throw submitError;
        }

        setError("Terjadi gangguan saat memproses login. Silakan coba lagi.");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
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
            placeholder="email@perusahaan.com"
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
            placeholder="Masukkan password"
            required
          />
        </label>

        {error ? <p className="rounded-2xl bg-rose-500/15 px-4 py-3 text-sm font-semibold text-rose-100">{error}</p> : null}

        <button disabled={isPending} className="login-submit mt-4 w-full rounded-[16px] px-4 py-3.5 text-sm font-semibold text-[#101114] disabled:opacity-70">
          {isPending ? "Memproses..." : "Masuk ke Sistem"}
        </button>
      </form>
    </>
  );
}
