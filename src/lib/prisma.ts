import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function requiredDatabaseUrl() {
  const value = process.env.DATABASE_URL;

  if (!value) {
    throw new Error("Environment variable DATABASE_URL is required.");
  }

  try {
    const url = new URL(value);

    if (url.hostname === "localhost") {
      url.hostname = "127.0.0.1";
    }

    url.searchParams.set("connectionLimit", url.searchParams.get("connectionLimit") ?? "2");
    url.searchParams.set("connectTimeout", url.searchParams.get("connectTimeout") ?? "10000");
    url.searchParams.set("acquireTimeout", url.searchParams.get("acquireTimeout") ?? "30000");
    url.searchParams.set("socketTimeout", url.searchParams.get("socketTimeout") ?? "30000");

    return url.toString();
  } catch {
    return value;
  }
}

function createPrismaClient() {
  return new PrismaClient({
    adapter: new PrismaMariaDb(requiredDatabaseUrl()),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrismaClient();
    const value = Reflect.get(client, property);

    return typeof value === "function" ? value.bind(client) : value;
  },
});
