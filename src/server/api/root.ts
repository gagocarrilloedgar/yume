import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/users";
import { wishRouter } from "./routers/whishes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: userRouter,
  wishes: wishRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
