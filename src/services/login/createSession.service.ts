import { QueryConfig, QueryResult } from "pg";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";

const createSessionService = async (
  userData: TLoginRequest
): Promise<TLoginResponse> => {
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
    values: [userData.email],
  };
  const queryResult: QueryResult<TUser> = await client.query(queryConfig);

  const user = queryResult.rows[0];

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword: boolean = await bcrypt.compare(
    userData.password,
    user.password
  );

  if (comparePassword === false) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id.toString(),
    }
  );

  return { token: token };
};

export default createSessionService;
