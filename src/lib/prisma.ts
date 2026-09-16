import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Cache the client on globalThis so Vercel serverless cold starts don't
// exhaust the Neon connection pool by creating a new PrismaClient per request.
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
globalForPrisma.prisma = prisma;
