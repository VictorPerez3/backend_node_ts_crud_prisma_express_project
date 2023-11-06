import { PrismaClient, Users } from "@prisma/client";
import { ICreateUser, IUpdateUser } from "../utils/interface";

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<Users[]> => {
  return await prisma.users.findMany({
    take: 20, //consulta retorna 20 users
    include: { agency: true },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getUserById = async (id: number): Promise<Users | null> => {
  return await prisma.users.findUnique({
    where: { id },
    include: { agency: true },
  });
};

export const getUserByEmail = async (email: string): Promise<Users | null> => {
  return await prisma.users.findUnique({
    where: { email },
    include: { agency: true },
  });
};

export const createUser = async (reqBody: ICreateUser): Promise<Users> => {
  return await prisma.users.create({
    data: { ...reqBody },
    include: { agency: true },
  });
};

export const updateUserById = async (reqParams: number, reqBody: IUpdateUser): Promise<Users> => {
  return await prisma.users.update({
    where: { id: reqParams },
    data: { ...reqBody },
    include: { agency: true },
  });
};

export const destroyUserById = async (reqParams: number): Promise<Users> => {
  return await prisma.users.delete({
    where: { id: reqParams },
  });
};
