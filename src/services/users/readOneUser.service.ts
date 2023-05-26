import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import { client } from "../../database";

const readOneUserService = async (
  decodedId: number
): Promise<TUserResponse> => {
  const queryString: string = `
  SELECT 
      "id",
      "name",
      "email",
      "admin",
      "active"
  FROM
      users
  WHERE 
      id = $1;
`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [decodedId],
  };
  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  const userResponse = responseUserSchema.parse(queryResult.rows[0]);

  return userResponse;
};

export default readOneUserService;
