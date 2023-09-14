// helpers
import { 
  backendUrlEncodedRequest,
  baseApiUrl,
  configureData,
  doorkeeperCredentials
} from "./api-helpers"

// api
import { revalidate } from "./server-actions";

// types
import { Product } from "./api-types";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/products`
  );
  const { products } = await response.json();
  return products;
};

export const getProduct = async (
  slug: string
): Promise<Product> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl( )}/v1/products/${ slug }`
  );
  const product: Product = await response.json();
  return product;
};

export const createProduct = async (
  data: FormData
): Promise<Product> => {
  const url = `${ baseApiUrl() }/v1/products`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: configureData(data)
  });

  revalidate('/');

  const product: Product = await response.json();

  return product;
};

export const updateProduct = async (
  slug: string,
  data: FormData
): Promise<Product> => {
  const url = `${ baseApiUrl() }/v1/products/${ slug }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: configureData(data)
  });

  revalidate('/');

  const product: Product = await response.json();

  return product;
};