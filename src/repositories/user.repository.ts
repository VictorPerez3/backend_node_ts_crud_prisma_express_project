import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.users.findMany({
    take: 20, //consulta retorna 20 users
    include: { agency: true },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.users.findUnique({
    where: { id },
    include: { agency: true },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
    include: { agency: true },
  });
};

export const createUser = async (reqBody: any) => {
  return await prisma.users.create({
    data: { ...reqBody },
    include: { agency: true },
  });
};

export const updateUserById = async (reqParams: any, reqBody: any) => {
  return await prisma.users.update({
    where: { id: reqParams },
    data: { ...reqBody },
    include: { agency: true },
  });
};

export const destroyUserById = async (reqParams: any) => {
  return await prisma.users.delete({
    where: { id: reqParams },
  });
};
