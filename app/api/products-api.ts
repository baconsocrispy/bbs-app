// helpers
import { backendAuthRequest } from "./api-helpers"

export const getAllProducts = async () => {
  const response = await backendAuthRequest(
    'GET', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/v1/products`
  );
  return response;
};