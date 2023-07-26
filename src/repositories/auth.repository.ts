import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserAuthRepository = async (email: string) => {
  return await prisma.users.findFirst({
    where: { email },
    include: { agency: true },
  });
};

export const moveTokenToBlacklist = async (tokenReplace: string) => {
  return await prisma.blackListToken.create({
    data: {
      token: tokenReplace,
    },
  });
};

export const findTokenInBlacklist = async (tokenReplace: string) => {
  return await prisma.blackListToken.findUnique({
    where: { token: tokenReplace },
  });
};
