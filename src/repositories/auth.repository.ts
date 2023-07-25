import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserAuthRepository = async (email: string) => {
  return await prisma.users.findFirst({
    where: { email },
  });
};
