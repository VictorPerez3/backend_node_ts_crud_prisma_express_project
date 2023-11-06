import { PrismaClient, SuperAdmin } from "@prisma/client";

const prisma = new PrismaClient();

export const returnSuperAdmin = async (emailToken: string): Promise<SuperAdmin | null> => {
  return await prisma.superAdmin.findUnique({
    where: { email: emailToken },
  });
};

export const getSuperAdminByEmail = async (email: string): Promise<SuperAdmin | null> => {
  return await prisma.superAdmin.findUnique({
    where: { email },
  });
};
