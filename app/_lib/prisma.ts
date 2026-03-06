import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });   
} else {
  if (!global.cachedPrisma) {
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({ connectionString });
    global.cachedPrisma = new PrismaClient({adapter})
  }
  prisma = global.cachedPrisma
}

export const db = prisma