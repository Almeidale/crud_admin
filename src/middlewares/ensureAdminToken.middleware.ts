import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const isAdmin = res.locals.decodedAdmin;

  if (isAdmin === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureAdminToken;
