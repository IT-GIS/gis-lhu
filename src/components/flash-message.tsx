export function FlashMessage({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  if (!error && !success) {
    return null;
  }

  const isError = Boolean(error);

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm ${
        isError
          ? "border-rose-200 bg-rose-50 text-rose-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {error ?? success}
    </div>
  );
}
