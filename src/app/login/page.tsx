import { redirectIfAuthenticated } from "@/lib/auth";
import LoginClient from "./login-client";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return <LoginClient />;
}
