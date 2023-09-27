import { User as PrismaUser } from "@prisma/client";

export type UserProfile = Pick<
  PrismaUser,
  "id" | "name" | "email" | "bio" | "username"
>;

export type User = {
  id: PrismaUser["id"];
} & Partial<PrismaUser>;
