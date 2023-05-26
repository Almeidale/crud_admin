import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const ensureAdminAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const decodedAdmin = res.locals.decodedAdmin;
  const decodedId = res.locals.decodedId;
  const localsUser = res.locals.user.id;

  const queryString: string = `
    SELECT 
        *
    FROM 
        users
    WHERE 
        id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [localsUser],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  const requestedUser = queryResult.rows[0].id;

  if (decodedAdmin === false && decodedId !== requestedUser) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureAdminAccess;
