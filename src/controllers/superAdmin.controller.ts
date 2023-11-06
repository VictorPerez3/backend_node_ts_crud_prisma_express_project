import * as userRepository from "../repositories/user.repository";
import * as clientRepository from "../repositories/client.repository";
import * as agencyRepository from "../repositories/agency.repository";
import { Request, Response } from "express";
import * as superAdminServices from "../services/superAdmin.services";
import * as userServices from "../services/user.services";

//Retorna todos as agencias
export const getAllAgencies = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      const allAgencies = await agencyRepository.getAllAgencies();
      return res.json({
        success: true,
        payload: allAgencies,
      });
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to Get all Agencies",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Retorna agencia por ID
export const getAgencyById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      const agenciesById = await agencyRepository.getAgencyById(
        parseInt(req.params.id)
      );
      return res.json({
        success: true,
        payload: agenciesById,
      });
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to Get Agency by Id",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Criação de Agencia
export const createAgency = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      const agencyCreate = await agencyRepository.createAgency(req.body);
      return res.json({
        success: true,
        message: "Cadaster type <Agency> created",
        payload: agencyCreate,
      });
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to create Agency",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Criação de Usuario
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      //encripitação da senha
      req.body.password = await userServices.passwordEncrypt(req.body.password);
      const userCreate = await userRepository.createUser(req.body);
      return res.json({
        success: true,
        message: "Cadaster type <User> created",
        payload: userCreate,
      });
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to create User",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Criação de cliente
export const createClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      const clientCreate = await clientRepository.createClient(req.body);
      return res.json({
        success: true,
        message: "Cadaster type <Client> created",
        payload: clientCreate,
      });
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to create Client",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Atualizar agencia por id
export const updateAgencyById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      //Repository: Busca a agencia com o id fornecido
      const agencyById = await agencyRepository.getAgencyById(
        parseInt(req.params.id)
      );

      //Verifica se a agencia solicitada existe
      if (!agencyById) {
        return res.status(402).send({
          message: "No agency found with this id",
        });
      } else {
        const agencyUpdateById = await agencyRepository.updateAgencyById(
          parseInt(req.params.id),
          req.body
        );
        return res.json({
          success: true,
          message: "Updated agency",
          payload: agencyUpdateById,
        });
      }
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to Update agency",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Atualizar usuario por id
export const updateUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      //Repository: Busca o usuario com o id fornecido
      const userById = await userRepository.getUserById(
        parseInt(req.params.id)
      );

      //Verifica se o usuario solicitado existe
      if (!userById) {
        return res.status(402).send({
          message: "No User found with this id",
        });
      } else {
        const userUpdateById = await userRepository.updateUserById(
          parseInt(req.params.id),
          req.body
        );
        return res.json({
          success: true,
          message: "Updated User",
          payload: userUpdateById,
        });
      }
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to Update User",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Atualizar cliente por id
export const updateClientById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      //Repository: Busca o cliente com o id fornecido
      const clientById = await clientRepository.getClientById(
        parseInt(req.params.id)
      );

      //Verifica se o cliente solicitado existe
      if (!clientById) {
        return res.status(402).send({
          message: "No Client found with this id",
        });
      } else {
        const clientUpdateById = await clientRepository.updateClientById(
          parseInt(req.params.id),
          req.body
        );
        return res.json({
          success: true,
          message: "Updated User",
          payload: clientUpdateById,
        });
      }
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to Update Client",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Deletar Agencia por id
export const destroyAgencyById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      //Repository: Busca a agencia com o id fornecido
      const agencyById = await agencyRepository.getAgencyById(
        parseInt(req.params.id)
      );

      //Verifica se a agencia solicitada existe
      if (!agencyById) {
        return res.status(402).send({
          message: "No agency found with this id",
        });
      } else {
        const agencyDeleteById = await agencyRepository.destroyAgencyById(
          parseInt(req.params.id)
        );
        return res.json({
          success: true,
          message: "Deleted Agency",
          payload: agencyDeleteById,
        });
      }
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to Delete Agency by Id",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Deletar Usuarios por id
export const destroyUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin

    if (!req.params.id) {
      return res.status(401).send({
        message: "Id not provided",
      });
    }

    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      //Repository: Busca o usuario com o id fornecido
      const userById = await userRepository.getUserById(
        parseInt(req.params.id)
      );

      //Verifica se o usuario solicitado existe
      if (!userById) {
        return res.status(401).send({
          message: "No user found with this id",
        });
      } else {
        const userDeleteById = await userRepository.destroyUserById(
          parseInt(req.params.id)
        );
        return res.json({
          success: true,
          message: "Deleted User",
          payload: userDeleteById,
        });
      }
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to Delete User by Id",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Deletar Clientes por id
export const destroyClientById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o usuario é Super Admin
    if (
      (await superAdminServices.isSuperAdmin(req.headers.authorization)) ===
      true
    ) {
      //Repository: Busca o cliente com o id fornecido
      const clientById = await clientRepository.getClientById(
        parseInt(req.params.id)
      );

      //Verifica se o cliente solicitado existe
      if (!clientById) {
        return res.status(401).send({
          message: "No client found with this id",
        });
      } else {
        const clientDeleteById = await clientRepository.destroyClientById(
          parseInt(req.params.id)
        );
        return res.json({
          success: true,
          message: "Deleted Client",
          payload: clientDeleteById,
        });
      }
    } else {
      return res.status(403).send({
        message:
          "User account does not have Super Admin permission to Delete Client by Id",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};
