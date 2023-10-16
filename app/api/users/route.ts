// library
import { cookies } from "next/headers";

// api
import { 
  getUserFromAccessToken, 
  newUserFromCredentials 
} from "./rails-api";

// GET /users/current_user#current_user
export const GET = async (request: Request) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;
  const response = await getUserFromAccessToken(token);
  return response;
};

// POST /users/signup#create
export const POST = async (request: Request) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  const formData = await request.formData();
  const response = await newUserFromCredentials(formData, token)

  return response;
};