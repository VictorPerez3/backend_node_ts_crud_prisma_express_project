import { Client, PrismaClient } from "@prisma/client";
import { ICreateClient, IUpdateClient } from "../utils/interface";

const prisma = new PrismaClient();

export const getClientById = async (reqParamsId: number): Promise<Client | null> => {
  return await prisma.client.findUnique({
    where: { id: reqParamsId },
    include: { agency: true },
  });
};

export const getClientByAgencyId = async (tokenAgencyId: number): Promise<Client | null> => {
  return await prisma.client.findFirst({
    take: 20, //consulta retorna 20 clientes
    where: { agencyId: tokenAgencyId },
    include: { agency: true },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const createClient = async (reqBody: ICreateClient): Promise<Client> => {
  return await prisma.client.create({
    data: { ...reqBody },
    include: { agency: true },
  });
};

export const destroyClientById = async (reqParamsId: number): Promise<Client> => {
  return await prisma.client.delete({
    where: { id: reqParamsId },
    include: { agency: true },
  });
};

export const updateClientById = async (reqParamsId: number, reqBody: IUpdateClient): Promise<Client> => {
  return await prisma.client.update({
    where: { id: reqParamsId },
    data: { ...reqBody },
    include: { agency: true },
  });
};
