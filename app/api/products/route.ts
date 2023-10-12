// library
import { cookies } from 'next/headers';

// helpers
import { 
  baseApiUrl, 
  doorkeeperCredentials 
} from "../api-helpers";

// types
import { Product } from "../api-types";
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const POST = async (request: Request) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  // get form data from request
  const formData = await request.formData();

  // send to products#create endpoint
  const product = await createProduct(formData, token);

  // configure response
  const response = NextResponse.json(
    { product: product },
    { status: 200 }
  );

  // refresh data & router cache
  revalidatePath('/');

  return response;
};

// POST /v1/products#create
const createProduct = async (
  data: FormData,
  token?: RequestCookie
): Promise<Product> => {
  const productsURL = `${ baseApiUrl() }/v1/products`;

  const response = await fetch(productsURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token?.value }`
    },
    body: data
  });

  const product: Product = await response.json();

  return product;
};