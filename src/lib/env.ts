const required = (name: string, fallback?: string) => {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Environment variable ${name} is required.`);
  }
  return value;
};

const ttlDaysRaw = process.env.SESSION_TTL_DAYS ?? "7";
const ttlDays = Number(ttlDaysRaw);
const lhuMinConfidenceRaw = process.env.OPENAI_LHU_MIN_CONFIDENCE ?? "0.8";
const lhuMinConfidence = Number(lhuMinConfidenceRaw);

if (Number.isNaN(ttlDays) || ttlDays <= 0) {
  throw new Error("SESSION_TTL_DAYS must be a positive number.");
}

if (Number.isNaN(lhuMinConfidence) || lhuMinConfidence < 0 || lhuMinConfidence > 1) {
  throw new Error("OPENAI_LHU_MIN_CONFIDENCE must be a number between 0 and 1.");
}

export const env = {
  appUrl: required("APP_URL", "http://localhost:3000"),
  sessionTtlDays: ttlDays,
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  openaiLhuModel: process.env.OPENAI_LHU_MODEL ?? "gpt-5.5",
  openaiLhuMinConfidence: lhuMinConfidence,
};
