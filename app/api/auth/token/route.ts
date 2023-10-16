// api
import { accessTokenFromCredentials } from "../rails-api";

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const response = await accessTokenFromCredentials(formData);
  return response;
};



