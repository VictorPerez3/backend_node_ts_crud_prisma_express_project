import { verifyPasswordEncryptUpdate } from "../services/user.services";
import { IncomingMessage, Server, ServerResponse } from "http";
import { startServer } from "../app";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

//Teste 2 - User Services Tests

//Teste 2.1 - verifyPasswordEncryptUpdate/passwordEncrypt
describe("verifyPasswordEncryptUpdate", () => {
  beforeAll(() => {
    server = startServer(process.env.TEST_PORT);
  });

  afterAll(() => {
    server.close();
  });
 
  //Teste 2.1 - Verifica se o password foi hasheado
  it("should hash the password if provided", async () => {
    const password = "password";
    const hashedPassword = await verifyPasswordEncryptUpdate(password);

    // Verifica se a senha encriptada é uma string
    expect(typeof hashedPassword).toBe("string");

    // Verifica se a senha encriptada não é igual à senha original
    expect(hashedPassword).not.toBe(password);
  });

  //Teste 2.2 - Verifica se retora null quando o password não é fornecido
  it("should return null if no password is provided", async () => {
    const hashedPassword = await verifyPasswordEncryptUpdate("");

    // Verifica se o resultado é null
    expect(hashedPassword).toBeNull();
  });
});

