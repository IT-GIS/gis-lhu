import { randomBytes } from "crypto";

import { compare } from "bcryptjs";
import type { Role } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "gis_lhu_session";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

function sessionExpiryDate() {
  return new Date(Date.now() + env.sessionTtlDays * 24 * 60 * 60 * 1000);
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user || !user.active) {
    return null;
  }

  const matches = await compare(password, user.passwordHash);

  if (!matches) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  } satisfies AuthUser;
}

export async function createUserSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = sessionExpiryDate();

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function destroyUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({
      where: { token },
    });
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt <= new Date() || !session.user.active) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  } satisfies AuthUser;
}

export async function requireAuthenticatedUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function redirectIfAuthenticated() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }
}
