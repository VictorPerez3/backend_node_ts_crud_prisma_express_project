import jwt from "jsonwebtoken";

// Verifica e valide o token
export const validateTokenService = async (tokenHeaders: any) => {
  const replace = tokenHeaders.replace("Bearer ", "");
  return jwt.verify(replace, String(process.env.TOKEN_KEY));
};

//Gera um token de autenticação com jwt
export const tokenGenerated = async (userAuth: any) => {
  const tokenGener = jwt.sign(
    {
      id: userAuth.id,
      email: userAuth.email,
      name: userAuth.name,
      role: userAuth.role,
    },
    //O token é assinado usando uma chave secreta definida na variável de ambiente process.env.TOKEN_KEY.
    String(process.env.TOKEN_KEY),
    {
      //Token expira em 24h
      expiresIn: "24h",
    }
  );
  return tokenGener;
};

//Decodificar token
export const decodedToken = async (reqHeaderAuthorization: any) => {
  if (reqHeaderAuthorization) {
    const replace = reqHeaderAuthorization.replace("Bearer ", "");
    const userInfo: any = jwt.verify(replace, String(process.env.TOKEN_KEY));
    if (userInfo) {
      // Retorna objeto User do token
      return userInfo;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
