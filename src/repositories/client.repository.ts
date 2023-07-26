import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findClientByIdRepository = async (reqParamsId: any) => {
  return await prisma.client.findUnique({
    where: { id: reqParamsId },
    include: { agency: true },
  });
};

export const getClientByAgencyId = async (tokenAgencyId: any) => {
  return await prisma.client.findMany({
    where: { agencyId: tokenAgencyId },
    include: { agency: true },
  });
};

export const create = async (reqBody: any) => {
  return await prisma.client.create({
    data: { ...reqBody },
    include: { agency: true },
  });
};

export const destroy = async (reqParamsId: any) => {
  return await prisma.client.delete({
    where: { id: reqParamsId },
    include: { agency: true },
  });
};

export const update = async (reqParamsId: any, reqBody: any) => {
  return await prisma.client.update({
    where: { id: reqParamsId },
    data: { ...reqBody },
    include: { agency: true },
  });
};
