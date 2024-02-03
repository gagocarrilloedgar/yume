import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { handleDatabaseOperation } from "~/utils/api";

const wishSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(255),
  url: z.string().url().optional().nullable(),
  position: z.number().int(),
  active: z.boolean(),
  available: z.boolean(),
  senderId: z.string().optional().nullable(),
  receiverId: z.string().uuid()
});

const updateSchema = wishSchema
  .omit({ id: true })
  .partial()
  .merge(z.object({ id: z.string().cuid() }));

export const wishRouter = createTRPCRouter({
  findOne: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
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
      z
        .object({ ...wishSchema.omit({ id: true }).shape })
        .refine((data) => data.receiverId, {
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

  reoder: protectedProcedure
    .input(z.array(z.string().cuid()))
    .mutation(async ({ input, ctx }) => {
      // Update the position for all wishes
      await Promise.all(
        input.map(async (wishId, index) => {
          return ctx.db.wish.update({
            where: {
              id: wishId
            },
            data: {
              position: index + 1
            }
          });
        })
      );
    }),

  resolve: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        active: z.boolean()
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Check if the user has permission to toggle the 'active' value
      const wish = await ctx.db.wish.findUnique({
        where: {
          id: input.id
        }
      });

      if (!wish || wish.receiverId !== ctx.session.user.id)
        throw new Error(
          "You do not have permission to toggle the 'active' value for this wish."
        );

      return handleDatabaseOperation(
        ctx.db.wish.update({
          where: {
            id: input.id
          },
          data: {
            active: input.active
          }
        }),
        "Toggle wish status"
      );
    }),

  update: protectedProcedure
    .input(z.object({ ...updateSchema.shape }))
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
    .input(z.array(z.string().cuid()))
    .mutation(({ input, ctx }) =>
      handleDatabaseOperation(
        ctx.db.wish.deleteMany({
          where: {
            id: {
              in: input
            }
          }
        }),
        "Wishes deleted"
      )
    )
});
