// helpers
import { 
  backendUrlEncodedRequest,
  baseApiUrl,
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
  id: number
): Promise<Product> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl( )}/v1/products/${ id }`
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

// add doorkeeper grant_type to formData
const configureData = (data: FormData) => {
  data.append('grant_type', 'password');
  return data;
};