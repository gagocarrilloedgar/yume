import { User as PrismaUser } from "@prisma/client";

export type User = {
  id: PrismaUser["id"];
} & Partial<PrismaUser>;
