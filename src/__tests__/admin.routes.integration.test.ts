import request from "supertest";
import * as authServices from "../services/auth.services";
import * as userServices from "../services/user.services";
import * as userRepository from "../repositories/user.repository";
import { startServer } from "../../src/app";
import { IncomingMessage, Server, ServerResponse } from "http";
import { ITestUserWithAgency, ITestUserWithAgencyWithoutName, RoleEnumType } from "../utils/interface";

//Teste integrado I1 - Admin Routes

const exampleUsersWithAgency: ITestUserWithAgency[] = [{
  id: 1,
  name: "example1",
  email: "example1@gmail.com",
  password: "example1123",
  createdAt: new Date("2023-07-28T21:25:43.013Z"),
  updatedAt: new Date("2023-07-28T21:25:43.013Z"),
  role: RoleEnumType.ADMIN,
  agencyId: 1,
  agency: {
    id: 1,
    name: "example",
    image: null,
    enabled: true,
    createdAt: new Date("2023-07-28T21:20:15.592Z"),
    updatedAt: new Date("2023-07-28T21:20:15.592Z"),
  },
},
{
  id: 2,
  name: "example2",
  email: "example2@gmail.com",
  password: "example2123",
  createdAt: new Date("2023-07-28T21:25:43.013Z"),
  updatedAt: new Date("2023-07-28T21:25:43.013Z"),
  role: RoleEnumType.ADMIN,
  agencyId: 1,
  agency: {
    id: 1,
    name: "example",
    image: null,
    enabled: true,
    createdAt: new Date("2023-07-28T21:20:15.592Z"),
    updatedAt: new Date("2023-07-28T21:20:15.592Z"),
  },
}];

const exampleUserWithAgency: ITestUserWithAgency = {
  id: 1,
  name: "example",
  email: "example@gmail.com",
  password: "example123",
  createdAt: new Date("2023-07-28T21:25:43.013Z"),
  updatedAt: new Date("2023-07-28T21:25:43.013Z"),
  role: RoleEnumType.ADMIN,
  agencyId: 1,
  agency: {
    id: 1,
    name: "example",
    image: null,
    enabled: true,
    createdAt: new Date("2023-07-28T21:20:15.592Z"),
    updatedAt: new Date("2023-07-28T21:20:15.592Z"),
  },
};
const exampleUserWithAgencyWithoutName: ITestUserWithAgencyWithoutName = {
  id: 1,
  email: "example@gmail.com",
  password: "example123",
  createdAt: new Date("2023-07-28T21:25:43.013Z"),
  updatedAt: new Date("2023-07-28T21:25:43.013Z"),
  role: RoleEnumType.ADMIN,
  agencyId: 1,
  agency: {
    id: 1,
    name: "example",
    image: null,
    enabled: true,
    createdAt: new Date("2023-07-28T21:20:15.592Z"),
    updatedAt: new Date("2023-07-28T21:20:15.592Z"),
  },
};
const exampleUserWithAgencyHash: ITestUserWithAgency = {
  id: 1,
  name: "example",
  email: "example@gmail.com",
  password: "hashpassword",
  createdAt: new Date("2023-07-28T21:25:43.013Z"),
  updatedAt: new Date("2023-07-28T21:25:43.013Z"),
  role: RoleEnumType.ADMIN,
  agencyId: 1,
  agency: {
    id: 1,
    name: "example",
    image: null,
    enabled: true,
    createdAt: new Date("2023-07-28T21:20:15.592Z"),
    updatedAt: new Date("2023-07-28T21:20:15.592Z"),
  },
};

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

jest.mock("../services/auth.services", () => ({
  validateTokenService: jest.fn(),
  decodedTokenWithAgency: jest.fn(),
}));

jest.mock("../services/user.services", () => ({
  passwordEncrypt: jest.fn(),
}));

jest.mock("../repositories/user.repository", () => ({
  createUser: jest.fn(),
  getUserById: jest.fn(),
  getAllUsers: jest.fn(),
}));

describe("Admin Routes", () => {
  beforeAll(() => {
    server = startServer(process.env.TEST_PORT);
  });

  afterAll(() => {
    server.close();
  });

  // Teste I1.1 - get all
  describe("Admin Routes - getAll", () => {
    // Teste I1.1.1 - Verifica se retorna todos os usuarios caso sucesso
    it("should return all users when authenticated as admin", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("valid");

      // Espiona a função decodedTokenWithAgency para retornar "role:admin" do usuario do token informado
      jest
        .spyOn(authServices, "decodedTokenWithAgency")
        .mockResolvedValueOnce({ role: "admin" });

      // Espiona a função getAllUsers para retornar usuario do id informado
      jest
        .spyOn(userRepository, "getAllUsers")
        .mockResolvedValueOnce(exampleUsersWithAgency);

      // Faz a solicitação GET simulada para a rota getall
      const response = await request(server)
        .get("/admin/users")
        .set("Authorization", `Bearer ${validToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.payload).toBeDefined();
    });

    // Teste I1.1.2 - Verifica se retorna erro 403 caso caso "role=user"
    it("should return 403 when authenticated as role=user", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("valid");

      // Espiona a função decodedTokenWithAgency para retornar "role:admin" do usuario do token informado
      jest
        .spyOn(authServices, "decodedTokenWithAgency")
        .mockResolvedValueOnce({ role: "user" });

      // Faz a solicitação GET simulada para a rota getall
      const response = await request(server)
        .get("/admin/users")
        .set("Authorization", `Bearer ${validToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        "User account does not have Admin permission to Get all Accounts"
      );
    });

    // Teste I1.1.3 - Verifica se retorna 401 se token nao for informado
    it("should return 401 if token is not provided", async () => {
      // Faz a solicitação GET simulada para a rota getall
      const response = await request(server).get("/admin/users");

      // Verifica a resposta da rota
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Required Token");
    });

    //Teste I1.1.4 - Verifica se retorna 401 se token é invalido
    it("should return 401 if token is invalid", async () => {
      // Simula um token de autenticação inválido
      const invalidToken = "INVALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "invalid" quando chamada com o token inválido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("invalid");

      // Faz a solicitação GET simulada para a rota getall
      const response = await request(server)
        .get("/admin/users")
        .set("Authorization", `Bearer ${invalidToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid Credentials");
    });
  });

  // Teste I1.2 - get by id
  describe("Admin Routes - getById", () => {
    // Teste I1.2.1 - Verifica se retorna usuario por id caso sucesso
    it("should return users by id when authenticated as admin", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("valid");

      // Espiona a função decodedTokenWithAgency para retornar "role:admin" do usuario do token informado
      jest
        .spyOn(authServices, "decodedTokenWithAgency")
        .mockResolvedValueOnce({ role: "admin" });

      // Espiona a função getUserById para retornar usuario do id informado
      jest
        .spyOn(userRepository, "getUserById")
        .mockResolvedValueOnce(exampleUserWithAgency);

      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .get("/admin/users/1")
        .set("Authorization", `Bearer ${validToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.payload).toBeDefined();
    });

    // Teste I1.2.2 - Verifica se retorna 402 caso usuario do id seja invalido
    it("should return 402 when user of id is invalid", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("valid");

      // Espiona a função decodedTokenWithAgency para retornar "role:admin" do usuario do token informado
      jest
        .spyOn(authServices, "decodedTokenWithAgency")
        .mockResolvedValueOnce({ role: "admin" });

      // Espiona a função getUserById para retornar usuario do id informado
      jest.spyOn(userRepository, "getUserById").mockResolvedValueOnce(null);

      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .get("/admin/users/1")
        .set("Authorization", `Bearer ${validToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(402);
      expect(response.body.message).toBe("User not found");
    });

    // Teste I1.2.3 - Verifica se retorna erro 403 caso caso "role=user"
    it("should return 403 when authenticated as role=user", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("valid");

      // Espiona a função decodedTokenWithAgency para retornar "role:admin" do usuario do token informado
      jest
        .spyOn(authServices, "decodedTokenWithAgency")
        .mockResolvedValueOnce({ role: "user" });

      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .get("/admin/users/1")
        .set("Authorization", `Bearer ${validToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        "User account does not have Admin permission to Get Account by ID"
      );
    });

    // Teste I1.2.4 - Verifica se retorna 401 se token nao for informado
    it("should return 401 if token is not provided", async () => {
      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server).get("/admin/users/1");

      // Verifica a resposta da rota
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Required Token");
    });

    //Teste I1.2.5 - Verifica se retorna 401 se token é invalido
    it("should return 401 if token is invalid", async () => {
      // Simula um token de autenticação inválido
      const invalidToken = "INVALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "invalid" quando chamada com o token inválido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("invalid");

      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .get("/admin/users/1")
        .set("Authorization", `Bearer ${invalidToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid Credentials");
    });
  });

  // Teste I1.3 - createAdmin
  describe("Admin Routes - createAdmin", () => {
    // Teste I1.3.1 - Verifica se cria o usuario em caso de sucesso (valid ok)
    it("should create users when authenticated as admin and validate is ok", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("valid");

      // Espiona a função decodedTokenWithAgency para retornar "role:admin" do usuario do token informado
      jest
        .spyOn(authServices, "decodedTokenWithAgency")
        .mockResolvedValueOnce({ role: "admin" });

      // Espiona a função passwordEncrypt para retornar o hashpassword
      jest
        .spyOn(userServices, "passwordEncrypt")
        .mockResolvedValueOnce("hashpassword");

      // Espiona a função createUser para criar usuario
      jest
        .spyOn(userRepository, "createUser")
        .mockResolvedValueOnce(exampleUserWithAgencyHash);

      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .post("/admin/register")
        .send(exampleUserWithAgency)
        .set("Authorization", `Bearer ${validToken}`);

      //simulando createdAt e updatedAt
      response.body.payload.agency.createdAt =
        exampleUserWithAgencyHash.agency?.createdAt;
      response.body.payload.agency.updatedAt =
        exampleUserWithAgencyHash.agency?.updatedAt;
      response.body.payload.createdAt = exampleUserWithAgencyHash.createdAt;
      response.body.payload.updatedAt = exampleUserWithAgencyHash.updatedAt;

      // Verifica a resposta da rota
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Cadaster created");
      expect(response.body.payload).toEqual(exampleUserWithAgencyHash);
    });

    // Teste I1.3.2 - Verifica se retorna erro em caso de nao atender validate
    it("should returns error in case of not answering validate", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("valid");

      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .post("/admin/register")
        .send(exampleUserWithAgencyWithoutName)
        .set("Authorization", `Bearer ${validToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(400);
      expect(response.body.errors[0].message).toBe("Name is required");
    });

    // Teste I1.3.3 - Verifica se retorna erro 403 caso caso "role=user"
    it("should return 403 when authenticated as role=user", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("valid");

      // Espiona a função decodedTokenWithAgency para retornar "role:admin" do usuario do token informado
      jest
        .spyOn(authServices, "decodedTokenWithAgency")
        .mockResolvedValueOnce({ role: "user" });

      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .post("/admin/register")
        .send(exampleUserWithAgency)
        .set("Authorization", `Bearer ${validToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        "User account does not have Admin permission to Create Admin Account"
      );
    });

    // Teste I1.3.4 - Verifica se retorna 401 se token nao for informado
    it("should return 401 if token is not provided", async () => {
      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .post("/admin/register")
        .send(exampleUserWithAgency);

      // Verifica a resposta da rota
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Required Token");
    });

    //Teste I1.3.5 - Verifica se retorna 401 se token é invalido
    it("should return 401 if invalid token", async () => {
      // Simula o token de autenticação válido para um usuário com a role "admin"
      const validToken = "VALID_TOKEN_HERE";

      // Espiona a função validateTokenService para retornar "valid" quando chamada com o token válido
      jest
        .spyOn(authServices, "validateTokenService")
        .mockResolvedValueOnce("invalid");

      // Faz a solicitação GET simulada para a rota getbyid
      const response = await request(server)
        .post("/admin/register")
        .send(exampleUserWithAgency)
        .set("Authorization", `Bearer ${validToken}`);

      // Verifica a resposta da rota
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid Credentials");
    });
  });
});
