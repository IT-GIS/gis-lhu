type DatabaseEnv = {
  [key: string]: string | undefined;
  DATABASE_URL?: string;
  MYSQL_HOST?: string;
  MYSQL_PORT?: string;
  MYSQL_USER?: string;
  MYSQL_PASSWORD?: string;
  MYSQL_DATABASE?: string;
};

const DEFAULT_DATABASE_OPTIONS = {
  connectionLimit: 2,
  connectTimeout: 10_000,
  acquireTimeout: 30_000,
  socketTimeout: 30_000,
};

function hasMysqlConfig(env: DatabaseEnv) {
  return Boolean(env.MYSQL_HOST || env.MYSQL_PORT || env.MYSQL_USER || env.MYSQL_PASSWORD || env.MYSQL_DATABASE);
}

function readMysqlPort(env: DatabaseEnv) {
  const port = Number(env.MYSQL_PORT ?? 3306);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Environment variable MYSQL_PORT must be a valid port number.");
  }

  return port;
}

function readMysqlConfig(env: DatabaseEnv) {
  if (!env.MYSQL_USER) {
    throw new Error("Environment variable MYSQL_USER is required when using MYSQL_* database config.");
  }

  if (!env.MYSQL_DATABASE) {
    throw new Error("Environment variable MYSQL_DATABASE is required when using MYSQL_* database config.");
  }

  return {
    host: env.MYSQL_HOST || "127.0.0.1",
    port: readMysqlPort(env),
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD ?? "",
    database: env.MYSQL_DATABASE,
  };
}

function normalizeDatabaseUrl(value: string) {
  const url = new URL(value);

  if (url.hostname === "localhost") {
    url.hostname = "127.0.0.1";
  }

  url.searchParams.set("connectionLimit", url.searchParams.get("connectionLimit") ?? String(DEFAULT_DATABASE_OPTIONS.connectionLimit));
  url.searchParams.set("connectTimeout", url.searchParams.get("connectTimeout") ?? String(DEFAULT_DATABASE_OPTIONS.connectTimeout));
  url.searchParams.set("acquireTimeout", url.searchParams.get("acquireTimeout") ?? String(DEFAULT_DATABASE_OPTIONS.acquireTimeout));
  url.searchParams.set("socketTimeout", url.searchParams.get("socketTimeout") ?? String(DEFAULT_DATABASE_OPTIONS.socketTimeout));

  return url.toString();
}

export function getDatabasePoolConfig(env: DatabaseEnv = process.env) {
  if (hasMysqlConfig(env)) {
    return {
      ...readMysqlConfig(env),
      ...DEFAULT_DATABASE_OPTIONS,
    };
  }

  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL or MYSQL_* database environment variables are required.");
  }

  return normalizeDatabaseUrl(env.DATABASE_URL);
}

export function getPrismaDatasourceUrl(env: DatabaseEnv = process.env) {
  if (hasMysqlConfig(env)) {
    const config = readMysqlConfig(env);
    const url = new URL(`mysql://${config.host}`);

    url.port = String(config.port);
    url.username = config.user;
    url.password = config.password;
    url.pathname = `/${config.database}`;

    return normalizeDatabaseUrl(url.toString());
  }

  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL or MYSQL_* database environment variables are required.");
  }

  return normalizeDatabaseUrl(env.DATABASE_URL);
}
