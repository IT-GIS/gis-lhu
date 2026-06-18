"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

const fieldClass =
  "w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-[var(--color-gis-blue)] focus:shadow-[0_18px_40px_-18px_rgba(0,112,243,0.24)] dark:border-slate-800 dark:bg-slate-950/70";
const labelClass =
  "mb-2 block text-sm font-bold text-[var(--color-gis-navy)] dark:text-slate-200";
const helpClass =
  "mt-1.5 block text-xs leading-5 text-slate-500 dark:text-slate-400";

type BlogCoverImagePickerProps = {
  defaultValue?: string | null;
};

export function BlogCoverImagePicker({
  defaultValue,
}: BlogCoverImagePickerProps) {
  const [imagePath, setImagePath] = useState(defaultValue ?? "");
  const [localPreview, setLocalPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const previewSrc = useMemo(() => {
    if (localPreview) return localPreview;
    return imagePath.trim();
  }, [imagePath, localPreview]);

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5MB.");
      event.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalPreview((oldUrl) => {
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      return objectUrl;
    });

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await fetch("/api/admin/blog-cover", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        ok?: boolean;
        path?: string;
        error?: string;
      };

      if (!response.ok || !result.ok || !result.path) {
        throw new Error(result.error ?? "Upload gambar gagal.");
      }

      setImagePath(result.path);
      setLocalPreview("");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload gambar gagal.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block">
        <span className={labelClass}>Gambar cover</span>

        <input
          className={fieldClass}
          type="text"
          name="coverImage"
          value={imagePath}
          onChange={(event) => {
            setImagePath(event.target.value);
            setError("");
          }}
          placeholder="/landing/blog/nama-gambar.png"
        />

        <span className={helpClass}>
          Path gambar akan otomatis terisi setelah upload. Bisa juga isi manual
          dari folder public atau URL gambar.
        </span>
      </label>

      <label className="block">
        <span className={labelClass}>Pilih gambar dari komputer</span>

        <input
          className={`${fieldClass} cursor-pointer file:mr-4 file:rounded-xl file:border-0 file:bg-[var(--color-gis-blue)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-600`}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <span className={helpClass}>
          Format yang disarankan: PNG, JPG, JPEG, WEBP, atau GIF. Maksimal 5MB.
        </span>
      </label>

      {isUploading ? (
        <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-semibold text-[var(--color-gis-blue)] dark:border-slate-800 dark:bg-slate-900">
          Mengupload gambar...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      ) : null}

      {previewSrc ? (
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-sky-50/70 p-3 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
            Preview gambar
          </p>

          <img
            src={previewSrc}
            alt="Preview cover artikel"
            className="h-48 w-full rounded-2xl object-cover"
          />

          <p className="mt-3 break-all text-xs font-semibold text-slate-500">
            {imagePath}
          </p>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-sky-200 bg-sky-50/60 p-6 text-center text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          Belum ada gambar cover.
        </div>
      )}
    </div>
  );
}
