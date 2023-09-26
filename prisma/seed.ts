import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    const password = await hash("password123", 12);

    // Create or update the user
    const user = await prisma.user.upsert({
      where: { email: "admin@admin.com" },
      update: {},
      create: {
        email: "admin@admin.com",
        username: "admin",
        name: "Admin",
        password
      }
    });

    // Add wishes for the user
    const wishes = await prisma.wish.createMany({
      data: [
        {
          title: "Wish 1",
          url: "https://example.com/wish1",
          position: 1,
          active: true,
          receiverId: user.id
        },
        {
          title: "Wish 2",
          url: "https://example.com/wish2",
          position: 2,
          active: true,
          receiverId: user.id
        }
        // Add more wishes as needed
      ]
    });

    console.log({ user, wishes });
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
