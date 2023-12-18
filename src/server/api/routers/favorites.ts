import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const favoriteSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  favoriteUserId: z.string().uuid()
});

export const favoriteRouter = createTRPCRouter({
  createFavorite: protectedProcedure
    .input(z.object({ userId: z.string(), favoriteUserId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.favorite.create({
        data: input
      });
    }),

  deleteFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.favorite.delete({
        where: {
          id: input.id
        }
      });
    }),

  findUserFavorites: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.favorite.findMany({
        where: {
          userId: input.userId
        }
      });
    })
});
