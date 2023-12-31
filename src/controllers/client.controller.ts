import * as clientRepository from "../repositories/client.repository";
import { Request, Response } from "express";
import * as authServices from "../services/auth.services";

//Retorna os clientes dentro da agencia do usuario logado
export const getAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Retorna o usuario pelo Token
    const clientToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization,
    );
    //Clientes na agencia do token
    if (!clientToken || clientToken === null || !clientToken.agencyId) {
      return res
        .status(401)
        .send({ message: "Authentication Token incorrect" });
    }
    const allClients = await clientRepository.getClientByAgencyId(clientToken.agencyId);
    if (!allClients) {
      return res.status(403).send({
        message: "There are no clients in this agency",
      });
    }
    return res.json({
      success: true,
      payload: allClients,
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Criação de clientes dentro da agencia do usuario logado
export const createClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Retorna o usuario pelo Token
    const clientToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization,
    );

    //Agencia do cliente criado é a mesma do token
    req.body.agencyId = clientToken?.agencyId;

    //Criado cliente
    const clientCreate = await clientRepository.createClient(req.body);

    return res.json({
      success: true,
      message: "Cadaster type <Client> created",
      payload: clientCreate,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Atualiza dados (nome e imagem) do cliente por id
export const updateByIdClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Retorna o usuario pelo Token
    const clientToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization,
    );

    //ID da requisição
    const { id } = req.params;

    //Repository: Busca o usuario com o email fornecido
    const clientById = await clientRepository.getClientById(
      parseInt(id),
    );

    //Verifica se o cliente solicitado esta na agencia de login
    if (clientById && clientById.agencyId === clientToken?.agencyId) {
      //Usuario do login (id do token) terá a conta atualizada
      const clientUpdateById = await clientRepository.updateClientById(
        parseInt(id),
        req.body,
      );
      return res.json({
        success: true,
        message: "Updated client",
        payload: clientUpdateById,
      });
    }
    return res.status(403).send({
      message: "In this agency there is no client with the informed id",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Delete clientes dentro da agencia por id (necessario token)
export const destroyClientById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Retorna o usuario pelo Token
    const clientToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization,
    );

    //ID da requisição
    const { id } = req.params;

    //Repository: Busca o usuario com o Id fornecido
    const clientById = await clientRepository.getClientById(
      parseInt(id),
    );

    //Verifica se o cliente solicitado esta na agencia de login
    if (clientById && clientById.agencyId === clientToken?.agencyId) {
      //Usuario do login (id do token) terá a conta excluida
      const clientDeleteById = await clientRepository.destroyClientById(parseInt(id));
      res.json({
        success: true,
        message: "Deleted client",
        payload: clientDeleteById,
      });
    }
    return res.status(402).send({
      message: "Forbidden to exclude clients outside the agency",
    });
  }
  catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};
