import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

import { getDatabasePoolConfig } from "@/lib/database-config";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const databaseConfig = getDatabasePoolConfig() as ConstructorParameters<typeof PrismaMariaDb>[0];

  return new PrismaClient({
    adapter: new PrismaMariaDb(databaseConfig),
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
