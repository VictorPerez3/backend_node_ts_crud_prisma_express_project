import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

  export const getAll = async () => {
    return await prisma.users.findMany();
  }

  export const getById = async (id: number) => {
    return await prisma.users.findUnique({
      where: { id },
    });
  }

  export const create = async (reqBody: any) => {
    return await prisma.users.create({
      data: { ...reqBody },
    });
  }

  export const update = async (reqParams: any, reqBody: any) => {
    return await prisma.users.update({
      where: { id: reqParams },
      data: { ...reqBody },
    });
  }

  export const destroy = async (reqParams: any) => {
    return await prisma.users.delete({
      where: { id: reqParams },
    });
  }

