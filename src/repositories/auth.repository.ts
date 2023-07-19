import { PrismaClient } from "@prisma/client";

//responsável por realizar as operações de autenticação
//relacionadas ao banco de dados usando o Prisma.

const prisma = new PrismaClient();

export default class AuthRepository {
  static async findUserAuthRepository(email: string) {
    return await prisma.users.findFirst({
      where: { email },
    });
  }
}
