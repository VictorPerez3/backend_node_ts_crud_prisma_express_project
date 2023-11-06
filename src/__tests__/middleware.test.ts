import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { validate } from "../middlewares/validate";
import { createAgencySchema } from "../schemas/agency.schemas";
import { loginSuperAdminSchema } from "../schemas/superAdmin.schemas";
import { createClientSchema } from "../schemas/client.schemas";
import { createUserSchema, loginUserSchema } from "../schemas/user.schemas";
import { verifyToken } from "../middlewares/auth";
import * as authServices from "../services/auth.services";
import { IncomingMessage, Server, ServerResponse } from "http";
import { startServer } from "../app";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

jest.mock("../services/auth.services");

//Teste 1 - Middleware

//Teste 1.1 - Validate
describe("validate middleware", () => {
  beforeAll(() => {
    server = startServer(process.env.TEST_PORT);
  });

  afterAll(() => {
    server.close();
  });

  // Mock dos objetos Request, Response e NextFunction
  const mockRequest: Partial<Request> = {};
  const mockResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const mockNextFunction: NextFunction = jest.fn();

  //Teste 1.1.1 - createAgencySchema - Dado Valido
  it("createAgencySchema is valid", async () => {
    mockRequest.body = { nome: "teste" };

    await validate(createAgencySchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
  });

  //Teste 1.1.2 - createAgencySchema - Erro 400: Dado invalido
  it("createAgencySchema return 400 if data is invalid", async () => {
    mockRequest.body = { nome: "t" }; //erro

    // Forçar um erro para simular dados inválidos
    jest.spyOn(createAgencySchema, "parse").mockImplementation(() => {
      throw new ZodError([]);
    });

    await validate(createAgencySchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
    //Response em caso de erro
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Bad Request!",
      errors: expect.any(Array),
    });
  });

  //Teste 1.1.3 - loginSuperAdminSchema - Dado Valido
  it("loginSuperAdminSchema is valid", async () => {
    mockRequest.body = {
      email: "teste@gmail.com",
      password: "teste6789",
    };

    await validate(loginSuperAdminSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
  });

  //Teste 1.1.4 - loginSuperAdminSchema - Erro 400: Dado invalido
  it("loginSuperAdminSchema return 400 if data is invalid", async () => {
    mockRequest.body = {
      email: "teste@gmail.com",
      password: "teste", //erro
    };

    // Forçar um erro para simular dados inválidos
    jest.spyOn(loginSuperAdminSchema, "parse").mockImplementation(() => {
      throw new ZodError([]);
    });

    await validate(loginSuperAdminSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
    //Response em caso de erro
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Bad Request!",
      errors: expect.any(Array),
    });
  });

  //Teste 1.1.5 - createClientSchema - Dado Valido
  it("createClientSchema is valid", async () => {
    mockRequest.body = {
      nome: "teste",
      email: "teste@gmail.com",
      agencyId: "1",
    };

    await validate(createClientSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
  });

  //Teste 1.1.6 - createClientSchema - Erro 400: Dado invalido
  it("createClientSchema return 400 if data is invalid", async () => {
    mockRequest.body = {
      nome: "teste",
      email: "teste@gmail.com",
      agencyId: "teste", //erro
    };

    // Forçar um erro para simular dados inválidos
    jest.spyOn(createClientSchema, "parse").mockImplementation(() => {
      throw new ZodError([]);
    });

    await validate(createClientSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
    //Response em caso de erro
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Bad Request!",
      errors: expect.any(Array),
    });
  });

  //Teste 1.1.7 - createUserSchema - Dado Valido
  it("createUserSchema is valid", async () => {
    mockRequest.body = {
      nome: "teste",
      email: "teste@gmail.com",
      password: "senhateste",
      agencyId: "1",
    };

    await validate(createUserSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
  });

  //Teste 1.1.8 - createUserSchema - Erro 400: Dado invalido
  it("createUserSchema return 400 if data is invalid", async () => {
    mockRequest.body = {
      nome: "teste",
      email: "teste@gmail.com",
      password: "senhateste",
      agencyId: "teste", //erro
    };

    // Forçar um erro para simular dados inválidos
    jest.spyOn(createUserSchema, "parse").mockImplementation(() => {
      throw new ZodError([]);
    });

    await validate(createUserSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
    //Response em caso de erro
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Bad Request!",
      errors: expect.any(Array),
    });
  });

  //Teste 1.1.9 - loginUserSchema - Dado Valido
  it("loginUserSchema is valid", async () => {
    mockRequest.body = {
      email: "teste@gmail.com",
      password: "senhateste",
    };

    await validate(loginUserSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
  });

  //Teste 1.1.10 - loginUserSchema - Erro 400: Dado invalido
  it("loginUserSchema return 400 if data is invalid", async () => {
    mockRequest.body = {
      email: "teste@gmail.com",
      password: "teste", //erro
    };

    // Forçar um erro para simular dados inválidos
    jest.spyOn(loginUserSchema, "parse").mockImplementation(() => {
      throw new ZodError([]);
    });

    await validate(loginUserSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
    //Response em caso de erro
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Bad Request!",
      errors: expect.any(Array),
    });
  });
});

//Teste 1.2 - verifyToken
describe("verifyToken", () => {
  const mockRequest = {} as Request;
  const mockResponse = {} as Response;
  const mockNextFunction = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Teste 1.2.1 - Verifica se retorna 401 caso o token não seja fornecido
  it("should return 401 if no token is provided", async () => {
    // Configuração do mock para o cenário de token ausente
    mockRequest.headers = { authorization: undefined };
    const mockStatusFn = jest.fn().mockReturnThis();
    const mockSendFn = jest.fn();
    mockResponse.status = mockStatusFn;
    mockResponse.send = mockSendFn;

    await verifyToken(mockRequest, mockResponse, mockNextFunction);

    // Verifica se a função de status foi chamada com 401
    expect(mockStatusFn).toHaveBeenCalledWith(401);

    // Verifica se a função de send foi chamada com a mensagem de erro correta
    expect(mockSendFn).toHaveBeenCalledWith({ message: "Required Token" });

    // Verifica se a função next não foi chamada
    expect(mockNextFunction).not.toHaveBeenCalled();
  });

  //Teste 1.2.2 - Verifica se retorna 401 caso o token seja invalido
  it("should return 401 if token is invalid", async () => {
    // Configuração do mock para o cenário de token inválido
    const mockToken = "invalidtoken123";
    mockRequest.headers = { authorization: `Bearer ${mockToken}` };
    (authServices.validateTokenService as jest.Mock).mockResolvedValueOnce(
      "invalid"
    );
    const mockStatusFn = jest.fn().mockReturnThis();
    const mockSendFn = jest.fn();
    mockResponse.status = mockStatusFn;
    mockResponse.send = mockSendFn;

    await verifyToken(mockRequest, mockResponse, mockNextFunction);

    // Verifica se a função de status foi chamada com 401
    expect(mockStatusFn).toHaveBeenCalledWith(401);

    // Verifica se a função de send foi chamada com a mensagem de erro correta
    expect(mockSendFn).toHaveBeenCalledWith({ message: "Invalid Credentials" });

    // Verifica se a função next não foi chamada
    expect(mockNextFunction).not.toHaveBeenCalled();
  });

  //Teste 1.2.3 - Verifica se retorna 401 caso o token esta na blacklist
  it("should return 401 if token is in the blacklist", async () => {
    // Configuração do mock para o cenário de token na blacklist
    const mockToken = "blacklisttoken123";
    mockRequest.headers = { authorization: `Bearer ${mockToken}` };
    (authServices.validateTokenService as jest.Mock).mockResolvedValueOnce(
      "black list token"
    );
    const mockStatusFn = jest.fn().mockReturnThis();
    const mockSendFn = jest.fn();
    mockResponse.status = mockStatusFn;
    mockResponse.send = mockSendFn;

    await verifyToken(mockRequest, mockResponse, mockNextFunction);

    // Verifica se a função de status foi chamada com 401
    expect(mockStatusFn).toHaveBeenCalledWith(401);

    // Verifica se a função de send foi chamada com a mensagem de erro correta
    expect(mockSendFn).toHaveBeenCalledWith({ message: "Login required" });

    // Verifica se a função next não foi chamada
    expect(mockNextFunction).not.toHaveBeenCalled();
  });
});
