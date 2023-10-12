// library
import { cookies } from "next/headers";

// api
import { getUserFromAccessToken } from "./rails-api";

// GET /current_user
export const GET = async (request: Request) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  const response = await getUserFromAccessToken(token);

  return response;
};