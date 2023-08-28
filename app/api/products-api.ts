// helpers
import { backendAuthRequest, baseApiUrl } from "./api-helpers"

export const getAllProducts = async () => {
  const response = await backendAuthRequest(
    'GET', `${ baseApiUrl() }/v1/products`
  );
  return response;
};

export const getProduct = async (id: number) => {
  const response = await backendAuthRequest(
    'GET', `${ baseApiUrl( )}/v1/products/${ id }`
  );
  return response;
};