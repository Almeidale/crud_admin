import { Request, Response } from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces";
import createSessionService from "../services/login/createSession.service";

const createSessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TLoginRequest = req.body;
  const token: TLoginResponse = await createSessionService(userData);
  return res.json(token);
};

export { createSessionController };
