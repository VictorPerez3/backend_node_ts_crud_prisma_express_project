import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository";
import * as authRepository from "../repositories/auth.repository";

//Verifica e valide o token (valid;invalid;blacklist)
export const validateTokenService = async (tokenHeaders: any) => {
  const replace = tokenHeaders.replace("Bearer ", "");
  const tokenBlacklist = await authRepository.getTokenInBlacklist(replace);
  if (!tokenBlacklist) {
    if (jwt.verify(replace, String(process.env.TOKEN_KEY)) === null) {
      return "invalid";
    } else {
      return "valid";
    }
  } else {
    return "black list token";
  }
};

//Gera um token de autenticação com jwt
export const tokenGenerated = async (userAuth: any) => {
  const tokenGener = jwt.sign(
    {
      id: userAuth.id,
      email: userAuth.email,
      name: userAuth.name,
      role: userAuth.role,
      agency: userAuth.agency,
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

//Decodificar token com agencia
export const decodedTokenWithAgency = async (reqHeaderAuthorization: any) => {
  if (reqHeaderAuthorization) {
    const replace = reqHeaderAuthorization.replace("Bearer ", "");
    const userInfo: any = jwt.verify(replace, String(process.env.TOKEN_KEY));
    const userInfoWithAgency: any = await userRepository.getUserByEmail(
      userInfo.email
    );
    if (userInfoWithAgency) {
      // Retorna objeto User do token
      return userInfoWithAgency;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

//Decodificar token de SuperAdmin
export const decodedTokenSuperAdmin = async (reqHeaderAuthorization: any) => {
  if (reqHeaderAuthorization) {
    const replace = reqHeaderAuthorization.replace("Bearer ", "");
    try {
      const userInfo: any = jwt.verify(replace, String(process.env.TOKEN_KEY));
      return userInfo;
    } catch (error) {
      // Caso ocorra um erro ao verificar o token, retorna null
      return null;
    }
  } else {
    return null;
  }
};

// Função para verificar se o token JWT está expirado
export const isTokenExpired = (reqHeaderAuthorization: any): boolean => {
  try {
    const replace = reqHeaderAuthorization.replace("Bearer ", "");
    const solvedToken: any = jwt.verify(replace, String(process.env.TOKEN_KEY));

    // Obtém o timestamp atual em segundos
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Verifica se a data de expiração (exp) está presente e é menor do que o timestamp atual
    if (solvedToken.exp && solvedToken.exp < currentTimestamp) {
      // O token está expirado
      return true;
    }
    // O token não está expirado
    return false;
  } catch (error) {
    return true; // Consideramos o token como expirado em caso de erro
  }
};
