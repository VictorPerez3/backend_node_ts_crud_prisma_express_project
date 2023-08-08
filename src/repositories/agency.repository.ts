import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAgencies = async () => {
  return await prisma.agency.findMany({
    take: 20, //consulta retorna 20 agencias
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getAgencyById = async (id: number) => {
  return await prisma.agency.findUnique({
    where: { id },
  });
};

export const createAgency = async (reqBody: any) => {
  return await prisma.agency.create({
    data: { ...reqBody },
  });
};

export const updateAgencyById = async (reqParamsId: any, reqBody: any) => {
  return await prisma.agency.update({
    where: { id: reqParamsId },
    data: { ...reqBody },
  });
};

export const destroyAgencyById = async (reqParamsId: any) => {
  return await prisma.agency.delete({
    where: { id: reqParamsId },
  });
};
