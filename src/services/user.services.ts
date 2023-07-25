import bcrypt from "bcryptjs";

  //encripitação da senha
  export const passwordEncrypt = async (passwordBody: string) => {
    const hashPassword = bcrypt.hash(passwordBody, 10);
    return await hashPassword;
  };

  //caso atualize a senha -> encripitação da senha
  export const verifyPasswordEncryptUpdate = async (passwordBody: string) => {
    if (passwordBody) {
      return await passwordEncrypt(passwordBody);
    } else {
      return null;
    }
  };

