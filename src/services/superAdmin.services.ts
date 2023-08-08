import * as superAdminRepository from "../repositories/superAdmin.repository";
import * as authServices from "../services/auth.services";

//Verifica se o usuario é Super Admin
export const isSuperAdmin = async (reqHeaderAuth: any) => {
  //Retorna o usuario pelo Token
  const userToken = await authServices.decodedTokenSuperAdmin(reqHeaderAuth);

  if (!userToken || !userToken.email) {
    return false;
  } else {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminRepository.returnSuperAdmin(userToken.email)) === null
    ) {
      return false;
    } else {
      return true;
    }
  }
};
