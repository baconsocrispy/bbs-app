// helpers
import { backendAuthRequest, baseApiUrl } from "./api-helpers"

export const getAllProducts = async () => {
  const response = await backendAuthRequest(
    'GET', `${ baseApiUrl() }/v1/products`
  );
  return response;
};