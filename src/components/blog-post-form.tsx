import type { BlogPost, BlogPostStatus } from "@prisma/client";
import Link from "next/link";

import { blogCategories } from "@/features/landing/blog-data";
import { Button } from "@/components/ui/button";

type BlogPostFormProps = {
  action: (formData: FormData) => void;
  post?: BlogPost;
  submitLabel: string;
};

function toDateTimeLocal(value?: Date | null) {
  if (!value) return "";
  const offset = value.getTimezoneOffset() * 60_000;
  return new Date(value.getTime() - offset).toISOString().slice(0, 16);
}

const fieldClass =
  "w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-[var(--color-gis-blue)] focus:shadow-[0_18px_40px_-18px_rgba(0,112,243,0.24)] dark:border-slate-800 dark:bg-slate-950/70";
const labelClass = "mb-2 block text-sm font-bold text-[var(--color-gis-navy)] dark:text-slate-200";
const helpClass = "mt-1.5 block text-xs leading-5 text-slate-500";

export function BlogPostForm({ action, post, submitLabel }: BlogPostFormProps) {
  const status = post?.status ?? ("published" satisfies BlogPostStatus);

  return (
    <form action={action} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      {post ? <input type="hidden" name="postId" value={post.id} /> : null}
      <input type="hidden" name="sourceUrl" value={post?.sourceUrl ?? ""} />

      <div className="space-y-6">
        <div className="rounded-[28px] border border-sky-100 bg-sky-50/55 p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]">
            Informasi utama
          </p>
          <div className="mt-5 grid gap-5">
            <label className="block">
              <span className={labelClass}>Judul artikel</span>
              <input
                className={`${fieldClass} text-base font-semibold`}
                type="text"
                name="title"
                defaultValue={post?.title}
                placeholder="Contoh: Pengujian Lingkungan untuk Industri"
                required
              />
              <span className={helpClass}>Judul ini tampil di kartu artikel dan halaman detail Informasi.</span>
            </label>

            <label className="block">
              <span className={labelClass}>Slug URL</span>
              <input
                className={fieldClass}
                type="text"
                name="slug"
                defaultValue={post?.slug}
                placeholder="pengujian-lingkungan-untuk-industri"
                required
              />
              <span className={helpClass}>Gunakan huruf kecil, angka, dan tanda hubung. Contoh: artikel-baru-gislab.</span>
            </label>

            <label className="block">
              <span className={labelClass}>Ringkasan singkat</span>
              <textarea
                className={`${fieldClass} min-h-32 leading-7`}
                name="excerpt"
                defaultValue={post?.excerpt}
                placeholder="Tulis 1-2 kalimat ringkas yang akan tampil di kartu artikel."
                required
              />
              <span className={helpClass}>Ringkasan idealnya singkat, jelas, dan menarik untuk pembaca.</span>
            </label>
          </div>
        </div>

        <div className="rounded-[28px] border border-sky-100 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]">
                Isi artikel
              </p>
              <h3 className="mt-2 text-lg font-bold text-[var(--color-gis-navy)] dark:text-slate-100">
                Konten yang tampil di website
              </h3>
            </div>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[var(--color-gis-blue)] dark:bg-slate-800 dark:text-[var(--color-gis-cyan)]">
              Pisahkan paragraf dengan baris kosong
            </span>
          </div>
          <textarea
            className={`${fieldClass} min-h-[520px] resize-y leading-8`}
            name="content"
            defaultValue={post?.content}
            placeholder={`Tulis isi artikel di sini.\n\nContoh struktur:\nPembuka artikel...\n\nSubjudul 1\nIsi paragraf...\n\nSubjudul 2\nIsi paragraf...`}
            required
          />
        </div>
      </div>

      <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
        <div className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-glass backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/58">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]">
            Publikasi
          </p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className={labelClass}>Status</span>
              <select className={fieldClass} name="status" defaultValue={status}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Tanggal publish</span>
              <input
                className={fieldClass}
                type="datetime-local"
                name="publishedAt"
                defaultValue={toDateTimeLocal(post?.publishedAt)}
              />
              <span className={helpClass}>Boleh dikosongkan. Jika status published, sistem akan memakai waktu sekarang.</span>
            </label>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-glass backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/58">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]">
            Tampilan kartu
          </p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className={labelClass}>Kategori</span>
              <select className={fieldClass} name="category" defaultValue={post?.category ?? blogCategories[0]} required>
                {blogCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Gambar cover</span>
              <input
                className={fieldClass}
                type="text"
                name="coverImage"
                defaultValue={post?.coverImage ?? ""}
                placeholder="/landing/blog/nama-gambar.png"
              />
              <span className={helpClass}>Isi path gambar dari folder public atau URL gambar. Boleh dikosongkan.</span>
            </label>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-100 bg-cyan-50/55 p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <h3 className="text-sm font-bold text-[var(--color-gis-navy)] dark:text-slate-100">Tips pengisian</h3>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
            <li>Gunakan judul yang jelas dan mudah dicari.</li>
            <li>Ringkasan cukup 1-2 kalimat.</li>
            <li>Konten artikel bisa memakai subjudul dan daftar menggunakan baris baru.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Button>
            {submitLabel}
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/posts">Batal</Link>
          </Button>
        </div>
      </aside>
    </form>
  );
}
