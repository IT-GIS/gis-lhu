import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, BlogPostStatus, DocumentStatus, FormType, Role, ReviewAction } from "@prisma/client";
import { hashSync } from "bcryptjs";

import { initialBlogArticles } from "../src/features/landing/blog-data";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for seeding.");
}

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(databaseUrl),
});

const passwordHash = hashSync("Password123!", 10);

async function seedUsers() {
  const users = [
    ["Super Admin", "superadmin@gis-lhu.local", Role.SUPER_ADMIN],
    ["Admin Lab", "admin@gis-lhu.local", Role.ADMIN_LAB],
    ["Frontdesk", "frontdesk@gis-lhu.local", Role.FRONTDESK],
    ["Analis", "analis@gis-lhu.local", Role.ANALIS],
    ["QA Supervisor", "qa@gis-lhu.local", Role.QA_SUPERVISOR],
    ["Auditor", "auditor@gis-lhu.local", Role.VIEWER_AUDITOR],
  ] as const;

  for (const [name, email, role] of users) {
    await prisma.user.upsert({
      where: { email },
      update: { name, role, passwordHash, active: true },
      create: { name, email, role, passwordHash, active: true },
    });
  }
}

async function seedDocuments() {
  const creator = await prisma.user.findUniqueOrThrow({
    where: { email: "frontdesk@gis-lhu.local" },
  });
  const analyst = await prisma.user.findUniqueOrThrow({
    where: { email: "analis@gis-lhu.local" },
  });
  const reviewer = await prisma.user.findUniqueOrThrow({
    where: { email: "qa@gis-lhu.local" },
  });

  const docs = [
    {
      documentNumber: "GIS-LHU/2026/0001",
      title: "LHU Air Bersih PT Nusantara",
      referenceNo: "REF-001",
      clientName: "PT Nusantara",
      sampleName: "Sampel Air Bersih",
      notes: "Draft awal untuk pengujian laboratorium.",
      status: DocumentStatus.input_hasil,
      formType: FormType.TYPE_1,
      assignedToId: analyst.id,
    },
    {
      documentNumber: "GIS-LHU/2026/0002",
      title: "LHU Limbah Cair CV Samudera",
      referenceNo: "REF-002",
      clientName: "CV Samudera",
      sampleName: "Sampel Limbah Cair",
      notes: "Menunggu review QA.",
      status: DocumentStatus.review,
      formType: FormType.TYPE_2,
      assignedToId: analyst.id,
    },
    {
      documentNumber: "GIS-LHU/2026/0003",
      title: "LHU Emisi Cerobong PT Sentosa",
      referenceNo: "REF-003",
      clientName: "PT Sentosa",
      sampleName: "Sampel Emisi",
      notes: "Sudah dipublikasikan untuk verifikasi.",
      status: DocumentStatus.published,
      formType: FormType.TYPE_1,
      assignedToId: reviewer.id,
      publishedAt: new Date(),
    },
  ] as const;

  for (const doc of docs) {
    const created = await prisma.document.upsert({
      where: { documentNumber: doc.documentNumber },
      update: {
        ...doc,
        formPayload: {},
        createdById: creator.id,
      },
      create: {
        ...doc,
        formPayload: {},
        createdById: creator.id,
      },
    });

    if (created.status === DocumentStatus.review) {
      await prisma.reviewEntry.upsert({
        where: {
          id: `${created.id}-submit`,
        },
        update: {},
        create: {
          id: `${created.id}-submit`,
          documentId: created.id,
          reviewerId: reviewer.id,
          action: ReviewAction.SUBMIT,
          comment: "Dokumen siap direview QA.",
        },
      });
    }

    if (created.status === DocumentStatus.published) {
      await prisma.verificationToken.upsert({
        where: { documentId: created.id },
        update: {
          token: "gis-lhu-demo-token-0003",
          isActive: true,
          publishedAt: created.publishedAt ?? new Date(),
          revokedAt: null,
        },
        create: {
          documentId: created.id,
          token: "gis-lhu-demo-token-0003",
          isActive: true,
          publishedAt: created.publishedAt ?? new Date(),
        },
      });
    }
  }
}

async function seedBlogPosts() {
  const admin = await prisma.user.findUniqueOrThrow({
    where: { email: "admin@gis-lhu.local" },
  });

  for (const article of initialBlogArticles) {
    await prisma.blogPost.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        coverImage: article.image,
        sourceUrl: article.sourceUrl,
        status: BlogPostStatus.published,
        publishedAt: new Date(article.date),
        updatedById: admin.id,
      },
      create: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        coverImage: article.image,
        sourceUrl: article.sourceUrl,
        status: BlogPostStatus.published,
        publishedAt: new Date(article.date),
        createdById: admin.id,
        updatedById: admin.id,
      },
    });
  }
}

async function main() {
  await seedUsers();
  await seedDocuments();
  await seedBlogPosts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
