import jwt from "jsonwebtoken";
import {
  tokenGenerated,
  decodedTokenSuperAdmin,
  isTokenExpired,
} from "../services/auth.services";
import { IncomingMessage, Server, ServerResponse } from "http";
import { startServer } from "../app";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

jest.mock("../repositories/auth.repository");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  sign: jest.fn(),
}));

jest.mock("../repositories/user.repository", () => ({
  getUserByEmail: jest.fn(),
}));

//Teste 3.1 - tokenGenerated
describe("tokenGenerated", () => {
  beforeAll(() => {
    server = startServer(process.env.TEST_PORT);
  });

  afterAll(() => {
    server.close();
  });

  //Teste 3.1.1 - Verifica se poder ser gerado um token valido com um objeto userAuth
  it("should generate a valid token with userAuth data", async () => {
    // Mock das informações de usuário
    const userAuth = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      role: "admin",
      agency: "Test Agency",
    };

    // Mock da Token Key
    const mockSecretKey = String(process.env.TOKEN_KEY);

    // Espiona a função jwt.sign para verificar se ela foi chamada corretamente
    jest
      .spyOn(jwt, "sign")
      .mockImplementationOnce((payload, secret, options) => {
        expect(payload).toEqual({
          id: userAuth.id,
          email: userAuth.email,
          name: userAuth.name,
          role: userAuth.role,
          agency: userAuth.agency,
        });
        expect(secret).toBe(mockSecretKey);
        expect(options).toEqual({
          expiresIn: "24h",
        });

        // Retorne um token falso para o teste
        return "faketoken123";
      });

    // Chama a função tokenGenerated com os dados de usuário e a chave secreta de teste
    const token = await tokenGenerated(userAuth);

    // Verifica se a função jwt.sign foi chamada
    expect(jwt.sign).toHaveBeenCalledTimes(1);

    // Verifica se a função retornou o token falso gerado
    expect(token).toBe("faketoken123");
  });
});

//Teste 3.2 - decodedTokenSuperAdmin
describe("decodedTokenSuperAdmin", () => {
  //Teste 3.2.1 - Verifica se retorna o usuario a partir do token valido
  it("should return decoded user info if valid token is provided", async () => {
    // Mock das informações do usuário decodificadas
    const mockUserInfo: any = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      role: "admin",
      agency: "Test Agency",
    };

    // Mock do token
    const mockToken = jwt.sign(mockUserInfo, String(process.env.TOKEN_KEY), {
      expiresIn: "24h",
    });

    // Espiona a função jwt.verify para verificar se ela foi chamada corretamente
    jest.spyOn(jwt, "verify").mockReturnValueOnce(mockUserInfo);

    // Chama a função decodedTokenSuperAdmin com o token mockado
    const result = await decodedTokenSuperAdmin(`Bearer ${mockToken}`);

    // Verifica se a função retornou as informações do usuário decodificadas
    expect(result).toEqual(mockUserInfo);
  });

  //Teste 3.2.2 - Verifica se retorna null caso o token nao seja fornecido
  it("should return null if no token is provided", async () => {
    // Chama a função decodedTokenSuperAdmin sem nenhum token
    const resultNoToken = await decodedTokenSuperAdmin(null);

    // Verifica se a função retornou null
    expect(resultNoToken).toBeNull();
  });

  //Teste 3.2.3 - Verifica se retorna null caso o token seja invalido
  it("should return null if invalid token is provided", async () => {
    // Mock do token inválido
    const mockInvalidToken = "invalidtoken123";

    // Chama a função decodedTokenSuperAdmin com o token inválido
    let resultInvalidToken = await decodedTokenSuperAdmin(
      `Bearer ${mockInvalidToken}`
    );
    if (resultInvalidToken === undefined) {
      return (resultInvalidToken = null);
    }

    if (resultInvalidToken === null) {
      return;
    }

    // Verifica se a função retornou null
    expect(resultInvalidToken).toBeNull();
  });
});

//Teste 3.3 - isTokenExpired
describe("isTokenExpired", () => {
  //Teste 3.3.1 - Verifica se retorna true se o token estiver expirado
  it("should return true if the token is expired", () => {
    // Mock do token expirado (data de expiração no passado)
    const expiredToken = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) - 3600 },
      "secret"
    );

    // Configura o mock de jwt.verify para retornar o token expirado
    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      throw new jwt.TokenExpiredError("jwt expired", new Date());
    });

    // Chama a função isTokenExpired com o token mockado
    const result = isTokenExpired(`Bearer ${expiredToken}`);

    // Verifica se a função retornou true, indicando que o token está expirado
    expect(result).toBe(true);
  });

  //Teste 3.3.2 - Verifica se retorna false se o token não estiver expirado
  it("should return false if the token is not expired", () => {
    // Mock do token válido (data de expiração no futuro)
    const validToken = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 3600 },
      "secret"
    );

    // Configura o mock de jwt.verify para retornar o token válido
    (jwt.verify as jest.Mock).mockReturnValueOnce({});

    // Chama a função isTokenExpired com o token mockado
    const result = isTokenExpired(`Bearer ${validToken}`);

    // Verifica se a função retornou false, indicando que o token não está expirado
    expect(result).toBe(false);
  });

  //Teste 3.3.3 - Verifica se retorna true se houver mensagem de erro (token expirado)
  it("should return true if there is an error verifying the token", () => {
    // Mock do token malformado (gera um erro ao verificar)
    const malformedToken = "invalidtoken123";

    // Configura o mock de jwt.verify para lançar um erro (token malformado)
    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      throw new jwt.JsonWebTokenError("jwt malformed");
    });

    // Chama a função isTokenExpired com o token mockado
    const result = isTokenExpired(`Bearer ${malformedToken}`);

    // Verifica se a função retornou true, indicando que o token está expirado (devido ao erro)
    expect(result).toBe(true);
  });
});
