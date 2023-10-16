// helpers
import {
  baseApiUrl, 
  doorkeeperCredentials,
} from "../api-helpers";

// types
import { Category } from "../api-types";

// POST /v1/categories#index
export const createCategory = async (
  data: FormData,
  token?: string
): Promise<Category> => {
  const categoriesURL = `${ baseApiUrl() }/v1/categories`;

  const response = await fetch(categoriesURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    },
    body: data
  });

  const category: Category = await response.json();

  return category;
};

// DELETE /v1/categories#destroy
export const deleteCategory = async (
  slug: string,
  token?: string
): Promise<Response> => {
  const url = `${ baseApiUrl() }/v1/categories/${ slug }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    },
  });

  return response;
};

// GET /v1/categories#index
export const getAllCategories = async (): Promise<Category[]> => {
  const categoriesURL = `${ baseApiUrl() }/v1/categories`
  const response = await fetch(categoriesURL);
  const { categories } = await response.json();
  return categories as Category[];
};

// GET /v1/categories#show
export const getCategoryWithGroups = async (
  slug: string
): Promise<Category> => {
  const categoryURL = `${ baseApiUrl() }/v1/categories/${ slug }`;
  const response = await fetch(categoryURL);  
  const category: Category = await response.json();
  return category;
};

// PUT /v1/categories#update
export const updateCategory = async (
  slug: string,
  data: FormData,
  token?: string
): Promise<Category> => {
  const categoryURL = `${ baseApiUrl() }/v1/categories/${ slug }`;

  const response = await fetch(categoryURL, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    },
    body: data
  });

  const category = await response.json();

  return category;
};