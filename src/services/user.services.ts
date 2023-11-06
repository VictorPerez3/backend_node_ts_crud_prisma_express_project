import bcrypt from "bcryptjs";

//caso atualize a senha -> encripitação da senha
export const verifyPasswordEncryptUpdate = async (passwordBody: string | null): Promise<string | null> => {
  if (passwordBody) {
    return await passwordEncrypt(passwordBody);
  } else {
    return null;
  }
};

//encripitação da senha
export const passwordEncrypt = async (passwordBody: string): Promise<string> => {
  const hashPassword = bcrypt.hash(passwordBody, 10);
  return await hashPassword;
};


