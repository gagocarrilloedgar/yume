import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const favoriteSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  favoriteUserId: z.string().uuid()
});

export const favoriteRouter = createTRPCRouter({
  createFavorite: protectedProcedure
    .input(favoriteSchema.omit({ id: true }))
    .mutation(({ input, ctx }) => {
      return ctx.db.favorite.create({
        data: input
      });
    }),

  deleteFavorite: protectedProcedure
    .input(favoriteSchema.pick({ id: true }))
    .mutation(({ input, ctx }) => {
      return ctx.db.favorite.delete({
        where: {
          id: input.id
        }
      });
    }),

  findUserFavorites: protectedProcedure
    .input(favoriteSchema.pick({ userId: true }))
    .query(({ input, ctx }) => {
      return ctx.db.favorite.findMany({
        where: {
          userId: input.userId
        },
        include: {
          favoriteUser: {
            select: {
              id: true,
              username: true,
              image: true
            }
          }
        }
      });
    })
});
