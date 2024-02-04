import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/users";
import { wishRouter } from "./routers/whishes";
import { favoriteRouter } from "./routers/favorites";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: userRouter,
  wishes: wishRouter,
  favorites: favoriteRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
