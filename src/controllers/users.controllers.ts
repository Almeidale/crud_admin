import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/users.interfaces";
import readOneUserService from "../services/users/readOneUser.service";
import updateUsersService from "../services/users/updateUsers.service";
import readAllUsersService from "../services/users/readAllUsers.services";
import deleteUsersService from "../services/users/deleteUsers.service";
import recoverUsersService from "../services/users/recoverUsers.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const newUser: TUserResponse = await createUsersService(userData);
  return res.status(201).json(newUser);
};

const readAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await readAllUsersService();
  return res.status(200).json(users);
};
const readOneUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const decodedId = res.locals.decodedId;
  const user = await readOneUserService(decodedId);
  return res.status(200).json(user);
};
const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: TUserUpdateRequest = req.body;
  const updatedUser = await updateUsersService(userId, userData);
  return res.status(200).json(updatedUser);
};
const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = res.locals.user.id;
  const deletedUser = await deleteUsersService(userId);
  return res.status(204).send();
};
const recoverUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const recoveredUser = await recoverUsersService(userId);
  return res.json(recoveredUser);
};

export {
  createUsersController,
  readAllUsersController,
  readOneUserController,
  updateUsersController,
  deleteUsersController,
  recoverUsersController,
};
