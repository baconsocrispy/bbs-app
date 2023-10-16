// helpers
import { 
  baseApiUrl, 
  doorkeeperCredentials 
} from "../api-helpers";

// types
import { Product } from "../api-types";

// POST /v1/products#create
export const createProduct = async (
  data: FormData,
  token?: string
): Promise<Product> => {
  const productsURL = `${ baseApiUrl() }/v1/products`;

  const response = await fetch(productsURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    },
    body: data
  });

  const product: Product = await response.json();

  return product;
};

// DELETE /v1/products#destroy
export const deleteProduct = async (
  slug: string,
  token?: string
): Promise<Response> => {
  const url = `${ baseApiUrl() }/v1/products/${ slug }`;

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

// GET /v1/products#index
export const getAllProducts = async (): Promise<Product[]> => {
  const productsURL = `${ baseApiUrl() }/v1/products`;
  const response = await fetch(productsURL);
  const { products } = await response.json();
  return products as Product[];
};

// GET /v1/products#show
export const getProduct = async (
  slug: string
): Promise<Product> => {
  const productsURL = `${ baseApiUrl() }/v1/products/${ slug }`;
  const response = await fetch(productsURL);
  const product: Product = await response.json();
  return product;
};

// PUT /v1/products#update
export const updateProduct = async (
  slug: string,
  data: FormData,
  token?: string
): Promise<Product> => {
  const url = `${ baseApiUrl() }/v1/products/${ slug }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    },
    body: data
  });

  const product: Product = await response.json();

  return product;
};