import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const returnSuperAdmin = async (emailToken: string) => {
  return await prisma.superAdmin.findUnique({
    where: { email: emailToken },
  });
};

export const getSuperAdminByEmail = async (email: string) => {
  return await prisma.superAdmin.findUnique({
    where: { email },
  });
};
