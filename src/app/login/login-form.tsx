"use client";

import { useState, useTransition } from "react";

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
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: formData,
        });
        const result = (await response.json()) as { error?: string; redirectTo?: string };

        if (!response.ok || result.error) {
          setError(result.error ?? "Terjadi gangguan saat memproses login. Silakan coba lagi.");
          return;
        }

        window.location.assign(result.redirectTo ?? "/dashboard");
      } catch (submitError) {
        console.error("Login request failed", submitError);
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
