import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";
import { handleDatabaseOperation } from "~/utils/api";

const wishSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  url: z.string().url(),
  position: z.number().int(),
  active: z.boolean(),
  available: z.boolean(),
  senderId: z.string().optional(),
  receiverId: z.string().uuid()
});

export const wishRouter = createTRPCRouter({
  findOne: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ input, ctx }) =>
      handleDatabaseOperation(
        ctx.db.wish.findUnique({
          where: {
            id: input.id
          }
        }),
        "Wish not found"
      )
    ),

  findMany: protectedProcedure.query(({ ctx }) =>
    handleDatabaseOperation(ctx.db.wish.findMany(), "Retrieve wishes")
  ),

  create: protectedProcedure
    .input(
      z.object({ ...wishSchema.shape }).refine((data) => data.receiverId, {
        message: "The receiverId must be provided"
      })
    )
    .mutation(({ input, ctx }) =>
      handleDatabaseOperation(
        ctx.db.wish.create({
          data: input
        }),
        "Create wish"
      )
    ),

  update: protectedProcedure
    .input(z.object({ ...wishSchema.shape }))
    .mutation(({ input, ctx }) =>
      handleDatabaseOperation(
        ctx.db.wish.update({
          where: {
            id: input.id
          },
          data: input
        }),
        "Update wish"
      )
    ),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ input, ctx }) =>
      handleDatabaseOperation(
        ctx.db.wish.delete({
          where: {
            id: input.id
          }
        }),
        "Delete wish"
      )
    )
});
