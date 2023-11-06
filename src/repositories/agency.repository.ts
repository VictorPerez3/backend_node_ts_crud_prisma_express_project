import { Agency, PrismaClient } from "@prisma/client";
import { ICreateAgency, IUpdateAgency } from "../utils/interface";

const prisma = new PrismaClient();

export const getAllAgencies = async (): Promise<Agency[]> => {
  return await prisma.agency.findMany({
    take: 20, //consulta retorna 20 agencias
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getAgencyById = async (id: number): Promise<Agency | null> => {
  return await prisma.agency.findUnique({
    where: { id },
  });
};

export const createAgency = async (reqBody: ICreateAgency): Promise<Agency | null> => {
  return await prisma.agency.create({
    data: { ...reqBody },
  });
};

export const updateAgencyById = async (reqParamsId: number, reqBody:IUpdateAgency): Promise<Agency | null> => {
  return await prisma.agency.update({
    where: { id: reqParamsId },
    data: { ...reqBody },
  });
};

export const destroyAgencyById = async (reqParamsId: number): Promise<Agency | null> => {
  return await prisma.agency.delete({
    where: { id: reqParamsId },
  });
};
