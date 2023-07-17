import { PrismaClient } from "@prisma/client";

//responsável por realizar as operações de autenticação
//relacionadas ao banco de dados usando o Prisma.

const prisma = new PrismaClient();

export default class AuthService {
  static async authenticate(email: string) {
    return await prisma.users.findFirst({
      where: { email },
    });
  }
}
