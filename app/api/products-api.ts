// helpers
import { revalidate } from "./server-actions";
import { 
  backendUrlEncodedRequest,
  baseApiUrl
} from "./api-helpers"

export const getAllProducts = async () => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/products`
  );
  return response;
};

export const getProduct = async (id: number) => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl( )}/v1/products/${ id }`
  );
  return response;
};

export const createProduct = async (data: FormData) => {
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

  return response.json();
};

const configureData = (data: FormData) => {
  data.append('grant_type', 'password')
  return data
}

// encode doorkeeper credentials in base64 format
const doorkeeperCredentials = () => {
  // doorkeeper credentials
  const clientId = process.env.NEXT_PUBLIC_DOORKEEPER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_DOORKEEPER_SECRET;

  // encodes credentials in base64 format
  const credentials = btoa(`${ clientId }:${ clientSecret }`);

  return credentials;
};