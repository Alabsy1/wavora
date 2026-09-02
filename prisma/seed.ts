import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "alabsyabdelrhman@gmail.com";
  const password = process.env.ADMIN_PASSWORD ?? "abdo.elwa@yahoo.com";
  const name = process.env.ADMIN_NAME ?? "Absy Abdelrhman";

  const hashed = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { password: hashed, name },
    create: { email, password: hashed, name },
  });

  const defaultFlags = [
    { key: "nav-sea", value: "true" },
    { key: "nav-adventure", value: "true" },
    { key: "nav-stays", value: "true" },
    { key: "nav-spots", value: "true" },
    { key: "nav-eats", value: "true" },
    { key: "nav-experiences", value: "true" },
    { key: "section_hero", value: "true" },
    { key: "section_mood_grid", value: "true" },
    { key: "section_featured_sea", value: "true" },
    { key: "section_adventure", value: "true" },
    { key: "section_stays", value: "true" },
    { key: "section_spots_eats", value: "true" },
    { key: "section_day_planner", value: "true" },
  ];

  for (const flag of defaultFlags) {
    await prisma.siteConfig.upsert({
      where: { key: flag.key },
      update: {},
      create: flag,
    });
  }

  console.log("Seed complete: admin user and feature flags created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
