import bcrypt from "bcryptjs";

//Service: responsável pelas regras de negocio do controller, abrigando tambem o repositorio.

export default class UserServices {
  //encripitação da senha
  static passwordEncrypt = async (passwordBody: string) => {
    const hashPassword = bcrypt.hash(passwordBody, 10);
    return await hashPassword;
  };

  //caso atualize a senha -> encripitação da senha
  static verifyPasswordEncryptUpdate = async (passwordBody: string) => {
    if (passwordBody) {
      return await UserServices.passwordEncrypt(passwordBody);
    }
  };
}
