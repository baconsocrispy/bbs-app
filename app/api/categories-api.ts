// helpers
import { 
  backendUrlEncodedRequest, 
  baseApiUrl, 
  doorkeeperCredentials,
} from "./api-helpers";

// api
import { revalidate } from "./server-actions";

// types
import { Category } from "./api-types";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/categories`
  );
  const { categories } = await response.json();
  return categories;
};

export const getCategoryWithGroups = async (
  slug: string
): Promise<Category> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/categories/${ slug }`
  );
  const category: Category = await response.json();
  return category;
};

export const createCategory = async (
  data: FormData
): Promise<Category> => {
  const url = `${ baseApiUrl() }/v1/categories`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: configureData(data)
  });

  const category = await response.json();

  revalidate('/');

  return category;
};

// add doorkeeper grant_type to formData
const configureData = (data: FormData) => {
  data.append('grant_type', 'password');
  return data;
};