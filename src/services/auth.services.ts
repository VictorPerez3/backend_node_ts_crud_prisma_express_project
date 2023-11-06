import jwt, { JwtPayload } from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository";
import * as authRepository from "../repositories/auth.repository";
import { IUserWithAgencyOrSuperAdmin } from "../utils/interface";

//Verifica e valide o token (valid;invalid;blacklist)
export const validateTokenService = async (tokenHeaders: string): Promise<string> => {
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
export const tokenGenerated = async (userAuth: IUserWithAgencyOrSuperAdmin): Promise<string> => {
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
export const decodedTokenWithAgency = async (reqHeaderAuthorization: string | undefined): Promise<IUserWithAgencyOrSuperAdmin | null> => {
  if (reqHeaderAuthorization) {
    const replace = reqHeaderAuthorization.replace("Bearer ", "");
    const userInfo: string | JwtPayload = jwt.verify(replace, String(process.env.TOKEN_KEY));
    if (typeof userInfo === 'string') {
      return null;
    } else {
      const userInfoWithAgency = await userRepository.getUserByEmail(
        userInfo.email
      );
      if (userInfoWithAgency) {
        return userInfoWithAgency;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};

//Decodificar token de SuperAdmin
export const decodedTokenSuperAdmin = async (reqHeaderAuthorization: string | null): Promise<string | JwtPayload | null> => {
  if (reqHeaderAuthorization) {
    const replace = reqHeaderAuthorization.replace("Bearer ", "");
    try {
      const userInfo: string | JwtPayload = jwt.verify(replace, String(process.env.TOKEN_KEY));
      return userInfo;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

// Função para verificar se o token JWT está expirado
export const isTokenExpired = (reqHeaderAuthorization: string): boolean => {
  try {
    const replace = reqHeaderAuthorization.replace("Bearer ", "");
    const solvedToken: string | JwtPayload = jwt.verify(replace, String(process.env.TOKEN_KEY));

    // Obtém o timestamp atual em segundos
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Verifica se a variável é do tipo JwtPayload e se não é indefinida
    if (typeof solvedToken === 'object' && 'exp' in solvedToken && solvedToken.exp) {
      if (solvedToken.exp < currentTimestamp) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return true;
  }
};
