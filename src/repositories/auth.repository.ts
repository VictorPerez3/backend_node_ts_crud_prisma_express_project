import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const moveTokenToBlacklist = async (tokenReplace: string) => {
  return await prisma.blackListToken.create({
    data: {
      token: tokenReplace,
    },
  });
};

export const getTokenInBlacklist = async (tokenReplace: string) => {
  return await prisma.blackListToken.findUnique({
    where: { token: tokenReplace },
  });
};


