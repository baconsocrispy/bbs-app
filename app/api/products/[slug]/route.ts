// library
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// helpers
import { baseApiUrl, doorkeeperCredentials } from "../../api-helpers";

// types
import { NextResponse } from "next/server";
import { Product } from "../../api-types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const DELETE = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  // get slug from params
  const slug = params.slug;

  // send to /v1/products#destroy endpoint
  const response = await deleteProduct(slug, token);

  // refresh data & router cache
  revalidatePath('/');

  return response;
};

export const PUT = async (
  request: Request,
  { params }: { params: { slug: string } } 
) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  // get slug from params
  const slug = params.slug;

  // get form data from request
  const formData = await request.formData();

  // send to /v1/products#update endpoint
  const product = await updateProduct(slug, formData, token);

  // configure response
  const response = NextResponse.json(
    { product: product },
    { status: 200 }
  );

  // refresh data & router cache
  revalidatePath('/');

  return response;
};

// DELETE /v1/products#destroy
const deleteProduct = async (
  slug: string,
  token?: RequestCookie
): Promise<Response> => {
  const url = `${ baseApiUrl() }/v1/products/${ slug }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token?.value }`
    },
  });

  return response;
};

// PUT /v1/products#update
const updateProduct = async (
  slug: string,
  data: FormData,
  token?: RequestCookie
): Promise<Product> => {
  const url = `${ baseApiUrl() }/v1/products/${ slug }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token?.value }`
    },
    body: data
  });

  const product: Product = await response.json();

  return product;
};