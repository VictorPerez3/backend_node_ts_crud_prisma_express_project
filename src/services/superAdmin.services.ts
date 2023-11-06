import { JwtPayload } from "jsonwebtoken";
import * as superAdminRepository from "../repositories/superAdmin.repository";
import * as authServices from "../services/auth.services";

//Verifica se o usuario é Super Admin
export const isSuperAdmin = async (reqHeaderAuth: string | undefined): Promise<boolean> => {
  // Retorna o usuário pelo Token
  if (!reqHeaderAuth) {
    return false;
  }
  const userToken: string | JwtPayload | null = await authServices.decodedTokenSuperAdmin(reqHeaderAuth);

  if (typeof userToken === 'string' || userToken === null) {
    return false;
  }

  if (!userToken.email) {
    return false;
  } else {
    // Verifica se o usuário é Super Admin
    if ((await superAdminRepository.returnSuperAdmin(userToken.email)) === null) {
      return false;
    } else {
      return true;
    }
  }
};
