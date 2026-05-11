"use client";

import { useState, useTransition, useEffect } from "react";
import { loginAction } from "@/actions/auth";

// ---------------------------------------------------------------------------
// Neumorphic CSS variables & styles injected via a <style> tag.
// Using inline approach since Tailwind cannot express arbitrary shadow values.
// ---------------------------------------------------------------------------

const NEU_CSS = `
  :root {
    --neu-login-bg:       #E4EBF5;
    --neu-login-white:    #FFFFFF;
    --neu-login-light-2:  #c8d0e7;
    --neu-login-light-3:  #bec8e4;
    --neu-login-dark:     #9baacf;
    --neu-login-primary:  #2B3386;
    --neu-login-pri-light:#3A44A4;
    --neu-login-pri-dark: #1F2563;
    --neu-login-shadow:   .3rem .3rem .6rem var(--neu-login-light-2), -.2rem -.2rem .5rem var(--neu-login-white);
    --neu-login-inset:    inset .2rem .2rem .5rem var(--neu-login-light-2), inset -.2rem -.2rem .5rem var(--neu-login-white);
  }

  .neu-root {
    min-height: 100vh;
    background: var(--neu-login-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', 'Inter', sans-serif;
    padding: 2rem;
  }

  .neu-login-card {
    width: 100%;
    max-width: 32rem;
    background: var(--neu-login-bg);
    border-radius: 2.2rem;
    box-shadow: .8rem .8rem 1.4rem var(--neu-login-light-2), -.2rem -.2rem 1.8rem var(--neu-login-white);
    padding: 2.5rem 2.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  /* Avatar circle */
  .neu-avatar {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 50%;
    box-shadow: var(--neu-login-shadow);
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--neu-login-bg);
  }
  .neu-avatar-inner {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    box-shadow: var(--neu-login-inset);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: #fff;
  }

  /* Title */
  .neu-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--neu-login-dark);
    text-align: center;
    line-height: 1.2;
    margin-top: -.6rem;
  }
  .neu-subtitle {
    font-size: 1rem;
    color: var(--neu-login-light-3);
    text-align: center;
    margin-top: -.3rem;
    font-weight: 500;
  }

  /* Input group */
  .neu-input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }
  .neu-field {
    position: relative;
    display: flex;
    align-items: center;
  }
  .neu-login-input {
    width: 100%;
    height: 4.5rem;
    border: none;
    border-radius: 1rem;
    padding: 0 1.5rem 0 4.2rem;
    font-size: 1.2rem;
    font-family: inherit;
    color: var(--neu-login-dark);
    background: var(--neu-login-bg);
    box-shadow: var(--neu-login-inset);
    outline: none;
    transition: box-shadow .3s ease;
  }
  .neu-login-input::placeholder {
    color: var(--neu-login-light-3);
  }
  .neu-login-input:focus {
    box-shadow: var(--neu-login-shadow);
  }
  .neu-input-icon {
    position: absolute;
    left: 1.4rem;
    font-size: 1.8rem;
    color: var(--neu-login-light-3);
    pointer-events: none;
    transition: color .3s;
    display: flex;
    align-items: center;
  }
  .neu-field:focus-within .neu-input-icon {
    color: var(--neu-login-primary);
  }

  /* Error message */
  .neu-error {
    width: 100%;
    background: #fde8e8;
    border-radius: 1rem;
    box-shadow: var(--neu-login-inset);
    padding: 1.2rem 1.6rem;
    font-size: 1.25rem;
    color: #c0392b;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: .8rem;
  }

  /* Primary button */
  .neu-btn-primary {
    width: 100%;
    height: 4.5rem;
    border: none;
    border-radius: 1rem;
    font-size: 1.3rem;
    font-family: inherit;
    font-weight: 700;
    letter-spacing: .05em;
    color: var(--neu-login-bg);
    background: var(--neu-login-primary);
    box-shadow: inset .2rem .2rem 1rem var(--neu-login-pri-light),
                inset -.2rem -.2rem 1rem var(--neu-login-pri-dark),
                var(--neu-login-shadow);
    cursor: pointer;
    transition: all .3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .8rem;
  }
  .neu-btn-primary:hover:not(:disabled) {
    color: #fff;
    transform: translateY(-.1rem);
    box-shadow: inset .2rem .2rem 1rem var(--neu-login-pri-light),
                inset -.2rem -.2rem 1rem var(--neu-login-pri-dark),
                .4rem .4rem .8rem var(--neu-login-light-2), -.2rem -.2rem .5rem var(--neu-login-white);
  }
  .neu-btn-primary:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: inset .2rem .2rem 1rem var(--neu-login-pri-dark),
                inset -.2rem -.2rem 1rem var(--neu-login-pri-light);
  }
  .neu-btn-primary:disabled {
    opacity: .7;
    cursor: not-allowed;
  }

  /* Divider */
  .neu-divider {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: var(--neu-login-light-3);
    font-size: 1.1rem;
    font-weight: 600;
  }
  .neu-divider-line {
    flex: 1;
    height: .1rem;
    background: linear-gradient(to right, transparent, var(--neu-login-light-2), transparent);
  }

  /* Demo credential chips */
  .neu-demo-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .8rem;
  }
  .neu-demo-chip {
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    box-shadow: var(--neu-login-shadow);
    background: var(--neu-login-bg);
    cursor: pointer;
    transition: box-shadow .2s;
    border: none;
    font-family: inherit;
    text-align: left;
  }
  .neu-demo-chip:hover { box-shadow: var(--neu-login-inset); }
  .neu-demo-chip:active { box-shadow: var(--neu-login-inset); }
  .neu-chip-role {
    font-size: .95rem;
    font-weight: 700;
    color: var(--neu-login-primary);
    display: block;
  }
  .neu-chip-email {
    font-size: .85rem;
    color: var(--neu-login-dark);
    display: block;
    margin-top: .1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Spinner */
  @keyframes neu-spin { to { transform: rotate(360deg); } }
  .neu-spinner {
    width: 1.8rem;
    height: 1.8rem;
    border: .25rem solid rgba(255,255,255,.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: neu-spin .7s linear infinite;
    display: inline-block;
  }

  @media (max-width: 480px) {
    .neu-login-card { padding: 3rem 2rem; }
    .neu-demo-grid { grid-template-columns: 1fr; }
  }

  /* Cloudflare Checking Styles */
  .cf-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1.8rem;
    padding: 2rem 1rem;
    animation: cfFadeIn 0.5s ease-out;
    width: 100%;
  }
  @keyframes cfFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .cf-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--neu-login-primary);
  }
  .cf-subtitle {
    font-size: 1rem;
    color: var(--neu-login-dark);
    line-height: 1.5;
  }
  .cf-spinner {
    width: 3.5rem;
    height: 3.5rem;
    border: 4px solid var(--neu-login-light-2);
    border-top-color: var(--neu-login-primary);
    border-radius: 50%;
    animation: neu-spin 1s linear infinite;
  }
  .cf-footer {
    font-size: 0.85rem;
    color: var(--neu-login-light-3);
    margin-top: 1.5rem;
    font-family: monospace;
    background: var(--neu-login-bg);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--neu-login-inset);
  }
`;

const demoPassword = "Password123!";

const DEMO_ACCOUNTS = [
  { role: "Super Admin", email: "superadmin@gis-lhu.local" },
  { role: "Admin Lab", email: "admin@gis-lhu.local" },
];

/**
 * LoginClient — Login page with Neumorphic Soft-UI design.
 * Ported from gift project, adapted for GIS branding.
 */
export default function LoginClient() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Cloudflare-like protection state
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationText, setVerificationText] = useState("Checking your browser...");
  const [rayId] = useState(
    () =>
      `${Math.random().toString(16).substring(2, 10).toUpperCase()}-${Math.random()
        .toString(16)
        .substring(2, 6)
        .toUpperCase()}`,
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setVerificationText("Verifying connection security..."), 1200);
    const timer2 = setTimeout(() => setVerificationText("Validating browser environment..."), 2500);
    const timer3 = setTimeout(() => setIsVerifying(false), 3800);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[number]) => {
    setEmail(acc.email);
    setPassword(demoPassword);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        // loginAction is a server action; we call it via FormData
        await loginAction(formData);
      } catch {
        setError("Terjadi gangguan saat memproses login. Silakan coba lagi.");
      }
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NEU_CSS }} />

      <div className="neu-root">
        <div className="neu-login-card">
          {isVerifying ? (
            <div className="cf-wrapper">
              <div className="cf-spinner" />
              <div className="cf-title">{verificationText}</div>
              <div className="cf-subtitle">
                Please wait while we secure your connection before accessing GIS LHU.
                <br />
                This process is automatic.
              </div>
              <div className="cf-footer">
                Ray ID: {rayId}
              </div>
            </div>
          ) : (
            <>
              {/* ── Logo Avatar ── */}
              <div className="neu-avatar">
                <div className="neu-avatar-inner">
                  <div className="relative font-black text-2xl tracking-tight flex items-baseline" style={{ fontFamily: "var(--font-display-ui)" }}>
                    <span style={{ color: "#2B3386" }}>G</span>
                    <span style={{ color: "#C1121F", fontSize: "1.8rem", margin: "0 -2px" }}>I</span>
                    <span style={{ color: "#2B3386" }}>S</span>
                  </div>
                </div>
              </div>

              {/* ── Heading ── */}
              <div style={{ textAlign: "center", marginTop: "-.4rem" }}>
                <div className="neu-title">GIS LHU</div>
                <div className="neu-subtitle">PT. Global Inspeksi Sistem</div>
              </div>

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.4rem" }}>

                {/* Email Field */}
                <div className="neu-field">
                  <span className="neu-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="neu-login-input"
                    autoComplete="email"
                  />
                </div>

                {/* Password Field */}
                <div className="neu-field">
                  <span className="neu-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="neu-login-input"
                    autoComplete="current-password"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="neu-error">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" disabled={isPending} className="neu-btn-primary">
                  {isPending
                    ? <><span className="neu-spinner" /> Masuk...</>
                    : <>
                      Masuk
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </>
                  }
                </button>
              </form>

              {/* ── Demo Credentials ── */}
              <div className="neu-divider">
                <span className="neu-divider-line" />
                <span>Demo Akun</span>
                <span className="neu-divider-line" />
              </div>

              <div className="neu-demo-grid">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    className="neu-demo-chip"
                    onClick={() => fillDemo(acc)}
                  >
                    <span className="neu-chip-role">{acc.role}</span>
                    <span className="neu-chip-email">{acc.email}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
