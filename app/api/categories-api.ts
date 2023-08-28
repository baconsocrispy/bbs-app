// helpers
import { backendAuthRequest, baseApiUrl } from "./api-helpers";

export const getAllCategories = async () => {
  const response = await backendAuthRequest(
    'GET', `${ baseApiUrl() }/v1/categories`
  );
  return response;
};

export const getCategoryWithProducts = async (slug: string) => {
  const response = await backendAuthRequest(
    'GET', `${ baseApiUrl() }/v1/categories/${ slug }`
  );
  return response;
};