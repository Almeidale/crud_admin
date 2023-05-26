import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../error";
import { client } from "../database";
import { TUser } from "../interfaces/users.interfaces";

const ensureUserisActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (req.body) {
    const email = req.body.email;

    const queryString: string = `
      SELECT 
          *
      FROM
          users
      WHERE
          email = $1;
      `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [email],
    };

    const queryResult: QueryResult<TUser> = await client.query(queryConfig);

    if (queryResult.rowCount === 0) {
    }

    if (queryResult.rowCount === 1 && queryResult.rows[0].active === false) {
      throw new AppError("Wrong email/password", 401);
    }
  }

  if (req.method === "PUT") {
    if (res.locals.user.active === true) {
      throw new AppError("User already active", 400);
    }
  }

  return next();
};

export default ensureUserisActiveMiddleware;
