// api
import { revokeAccessToken } from "../rails-api";

export const POST = async (request: Request) => {
  const response = await revokeAccessToken();
  return response;
};


