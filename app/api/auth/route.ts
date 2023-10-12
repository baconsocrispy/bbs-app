// library
import { cookies } from "next/headers";

// api
import { getUserFromAccessToken } from "./rails-api";

// GET /current_user
export const GET = async (request: Request) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  console.log('TESTING');
  console.log(cookieStore);
  console.log(token);

  const response = await getUserFromAccessToken(token);

  return response;
};