# GIS LHU

GIS LHU adalah aplikasi manajemen Laporan Hasil Uji berbasis Next.js, Prisma, dan MySQL untuk workflow laboratorium dari draft sampai verifikasi publik.

## Stack

- Next.js App Router
- TypeScript
- Prisma ORM
- MySQL / Laragon
- Vitest

## Environment

Gunakan file `.env` berikut:

```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/gis_lhu"
APP_URL="http://localhost:3000"
SESSION_TTL_DAYS="7"
```

## Menjalankan aplikasi

```bash
npm install
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

## Akun demo

Semua akun menggunakan password `Password123!`.

- `superadmin@gis-lhu.local`
- `admin@gis-lhu.local`
- `frontdesk@gis-lhu.local`
- `analis@gis-lhu.local`
- `qa@gis-lhu.local`
- `auditor@gis-lhu.local`

## Route utama

- `/login`
- `/dashboard`
- `/documents`
- `/documents/new`
- `/documents/[id]`
- `/review`
- `/published`
- `/verify/[token]`

## Verifikasi

Perintah yang sudah diverifikasi pada workspace ini:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run db:migrate -- --name init`
