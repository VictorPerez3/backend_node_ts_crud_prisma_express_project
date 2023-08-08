import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClientById = async (reqParamsId: any) => {
  return await prisma.client.findUnique({
    where: { id: reqParamsId },
    include: { agency: true },
  });
};

export const getClientByAgencyId = async (tokenAgencyId: any) => {
  return await prisma.client.findMany({
    take: 20, //consulta retorna 20 clientes
    where: { agencyId: tokenAgencyId },
    include: { agency: true },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const createClient = async (reqBody: any) => {
  return await prisma.client.create({
    data: { ...reqBody },
    include: { agency: true },
  });
};

export const destroyClientById = async (reqParamsId: any) => {
  return await prisma.client.delete({
    where: { id: reqParamsId },
    include: { agency: true },
  });
};

export const updateClientById = async (reqParamsId: any, reqBody: any) => {
  return await prisma.client.update({
    where: { id: reqParamsId },
    data: { ...reqBody },
    include: { agency: true },
  });
};
