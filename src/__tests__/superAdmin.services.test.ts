import { isSuperAdmin } from "../services/superAdmin.services";
import * as authServices from "../services/auth.services";
import * as superAdminRepository from "../repositories/superAdmin.repository";
import { IncomingMessage, Server, ServerResponse } from "http";
import { startServer } from "../app";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

jest.mock("../services/auth.services", () => ({
  decodedTokenSuperAdmin: jest.fn(),
}));

//Teste 4 - SuperAdmin Services Tests

//Teste 4.1 - isSuperAdmin
describe("isSuperAdmin", () => {
  beforeAll(() => {
    server = startServer(process.env.TEST_PORT);
  });

  afterAll(() => {
    server.close();
  });

  //Teste 4.1.1 - Verifica se retorna true se o usuario é superadmin
  it("should return true if the user is a super admin", async () => {
    // Mock do token válido (pode ser qualquer token válido, não estamos verificando a decodificação real aqui)
    const validToken = "validtoken123";
    // Mock das informações do usuário decodificadas a partir do token, onde o usuário é um super admin
    const mockUserToken = { email: "test@example.com", role: "superadmin" };
    // Configura o mock de decodedTokenSuperAdmin para retornar as informações do usuário
    (authServices.decodedTokenSuperAdmin as jest.Mock).mockResolvedValueOnce(
      mockUserToken
    );
    // Mock da função returnSuperAdmin para retornar o objeto do super admin
    const mockSuperAdmin = {
      id: 1,
      name: "Victor Tegrus",
      email: "victortegrus@gmail.com",
      password: "alecandrius@35",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(superAdminRepository, "returnSuperAdmin")
      .mockResolvedValueOnce(mockSuperAdmin);

    // Chama a função isSuperAdmin com o token mockado
    const result = await isSuperAdmin(validToken);

    // Verifica se a função retornou true, indicando que o usuário é um super admin
    expect(result).toBe(true);
  });

  //Teste 4.1.2 - Verifica se retorna false se o usuario nao é superadmin
  it("should return false if the user is not a super admin", async () => {
    // Mock do token válido (pode ser qualquer token válido, não estamos verificando a decodificação real aqui)
    const validToken = "validtoken123";
    // Mock das informações do usuário decodificadas a partir do token, onde o usuário não é um super admin
    const mockUserToken = { email: "test@example.com", role: "user" };
    // Configura o mock de decodedTokenSuperAdmin para retornar as informações do usuário
    (authServices.decodedTokenSuperAdmin as jest.Mock).mockResolvedValueOnce(
      mockUserToken
    );
    // Mock da função returnSuperAdmin para retornar null (usuário não é um super admin)
    jest
      .spyOn(superAdminRepository, "returnSuperAdmin")
      .mockResolvedValueOnce(null);

    // Chama a função isSuperAdmin com o token mockado
    const result = await isSuperAdmin(validToken);

    // Verifica se a função retornou false, indicando que o usuário não é um super admin
    expect(result).toBe(false);
  });

  //Teste 4.1.3 - Verifica se retorna false se o token é invalido
  it("should return false if the token is invalid or not provided", async () => {
    // Mock do token inválido (ou não fornecido)
    const invalidToken = "invalidtoken123";
    // Configura o mock de decodedTokenSuperAdmin para retornar null (token inválido ou não fornecido)
    (authServices.decodedTokenSuperAdmin as jest.Mock).mockResolvedValueOnce(
      null
    );

    // Chama a função isSuperAdmin com o token mockado
    const result = await isSuperAdmin(invalidToken);

    // Verifica se a função retornou false, indicando que o token é inválido ou não fornecido
    expect(result).toBe(false);
  });
});
