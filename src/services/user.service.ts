import { PrismaClient } from "@prisma/client";

//responsável por realizar as operações relacionadas ao banco de dados
//usando o Prisma

const prisma = new PrismaClient();

export default class UserService {
  static async getAll() {
    return await prisma.users.findMany();
  }

  static async getById(id: number) {
    return await prisma.users.findUnique({
      where: { id },
    });
  }

  static async create(reqBody: any) {
    return await prisma.users.create({
      data: { ...reqBody },
    });
  }

  static async update(reqParams: any, reqBody: any) {
    return await prisma.users.update({
      where: { id: reqParams },
      data: { ...reqBody },
    });
  }

  static async destroy(reqParams: any) {
    return await prisma.users.delete({
      where: { id: reqParams },
    });
  }
}
