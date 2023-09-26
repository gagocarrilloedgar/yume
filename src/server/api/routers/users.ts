import { hash } from "bcryptjs";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  emailVerified: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().optional()
});

const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  bio: z.string().nullable().optional()
});

export const userRouter = createTRPCRouter({
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id
        },
        include: {
          wishes: {
            select: {
              id: true,
              title: true,
              url: true,
              position: true,
              active: true,
              senderId: true
            }
          }
        }
      });
    }),
  findOnePublic: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: {
          username: input.username
        },
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
          bio: true,
          wishes: {
            select: {
              id: true,
              title: true,
              url: true,
              position: true,
              active: true,
              receiverId: true
            }
          }
        }
      });
    }),
  findMany: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email"),
        password: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const hashed_password = await hash(password, 12);

      return ctx.db.user.create({
        data: {
          name: email.split("@")[0]!.replace(/[^a-zA-Z0-9]/g, ""),
          email: email,
          password: hashed_password
        }
      });
    }),
  update: protectedProcedure
    .input(z.object({ ...profileSchema.shape }))
    .mutation(({ input, ctx }) => {
      console.log(input);
      const { id, ...data } = input;

      const selectedData = userSchema
        .pick({ name: true, email: true, bio: true })
        .nullable()
        .parse(data);

      return ctx.db.user.update({
        where: {
          id: id
        },
        data: {
          ...selectedData
        }
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.user.delete({
        where: {
          id: input.id
        }
      });
    })
});
