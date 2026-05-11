const required = (name: string, fallback?: string) => {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Environment variable ${name} is required.`);
  }
  return value;
};

const ttlDaysRaw = process.env.SESSION_TTL_DAYS ?? "7";
const ttlDays = Number(ttlDaysRaw);

if (Number.isNaN(ttlDays) || ttlDays <= 0) {
  throw new Error("SESSION_TTL_DAYS must be a positive number.");
}

export const env = {
  appUrl: required("APP_URL", "http://localhost:3000"),
  databaseUrl: required("DATABASE_URL"),
  sessionTtlDays: ttlDays,
};
