import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Common password for all users
    const commonPassword = await hash("password123", 12);

    // Array of user data
    const userData = [
      {
        email: "admin@admin.com",
        username: "admin",
        name: "Admin"
      },
      {
        email: "user1@example.com",
        username: "user1",
        name: "User 1"
      },
      {
        email: "user2@example.com",
        username: "user2",
        name: "User 2"
      }
      // Add more users as needed
    ];

    const users = await Promise.all(
      userData.map(async (data) => {
        return prisma.user.upsert({
          where: { email: data.email },
          update: {},
          create: {
            ...data,
            password: commonPassword
          }
        });
      })
    );

    await Promise.all(
      users.map(async (user) => {
        return prisma.wish.createMany({
          data: [
            {
              title: `Wish for ${user.name} 1`,
              url: `https://example.com/${user.username}/wish1`,
              position: 1,
              active: true,
              receiverId: user.id
            },
            {
              title: `Wish for ${user.name} 2`,
              url: `https://example.com/${user.username}/wish2`,
              position: 2,
              active: true,
              receiverId: user.id
            }
            // Add more wishes as needed
          ]
        });
      })
    );
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
