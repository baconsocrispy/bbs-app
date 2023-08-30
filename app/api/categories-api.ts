// helpers
import { backendUrlEncodedRequest, baseApiUrl } from "./api-helpers";

export const getAllCategories = async () => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/categories`
  );
  return response;
};

export const getCategoryWithProducts = async (slug: string) => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/categories/${ slug }`
  );
  return response;
};