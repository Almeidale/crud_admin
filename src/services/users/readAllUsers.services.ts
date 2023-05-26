import { QueryResult } from "pg";
import "dotenv/config";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";

const readAllUsersService = async (): Promise<Array<TUserResponse>> => {
  const queryString: string = `
    SELECT 
        "id",
        "name",
        "email",
        "admin",
        "active"
    FROM
        users;
    `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows;
};

export default readAllUsersService;
