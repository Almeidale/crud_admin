import {
  TUserResponse,
  TUserUpdateRequest,
} from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const recoverUsersService = async (
  userId: number
): Promise<TUserUpdateRequest> => {
  const queryString: string = `
    UPDATE 
        users
    SET
        active = true
    WHERE
        id = $1
    RETURNING
        "id", "name", "email", "admin", "active";
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  return queryResult.rows[0];
};

export default recoverUsersService;
