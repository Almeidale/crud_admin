import { QueryConfig } from "pg";
import { client } from "../../database";

const deleteUsersService = async (userId: number): Promise<number> => {
  const queryString: string = `
  UPDATE 
      users
  SET
      active = false
  WHERE 
      id = $1;
`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };
  await client.query(queryConfig);

  return userId;
};

export default deleteUsersService;
