import { BlackListToken, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const moveTokenToBlacklist = async (tokenReplace: string): Promise<BlackListToken> => {
  return await prisma.blackListToken.create({
    data: {
      token: tokenReplace,
    },
  });
};

export const getTokenInBlacklist = async (tokenReplace: string): Promise<BlackListToken | null> => {
  return await prisma.blackListToken.findUnique({
    where: { token: tokenReplace },
  });
};


