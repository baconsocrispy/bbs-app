// library
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// api
import { deleteProduct, getProduct, updateProduct } from "../rails-api";

// types
import { NextRequest, NextResponse } from "next/server";

const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? '';
}

export const DELETE = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  // extract doorkeeper auth token from cookies
  // const cookieStore = cookies();
  // const token = cookieStore.get('access_token')?.value;
  const token = await getCookie('access_token');

  // get slug from params
  const slug = params.slug;

  // send to /v1/products#destroy endpoint
  const response = await deleteProduct(slug, token);

  // refresh data & router cache
  revalidatePath('/');

  return response;
};

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  // get slug from params
  const slug = params.slug;

  // send request to /v1/products#show endpoint
  const product = await getProduct(slug);

  const response = NextResponse.json(
    { product: product },
    { status: 200 }
  );

  return response;
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { slug: string } } 
) => {
  // extract doorkeeper auth token from cookies
  const token = await getCookie('access_token');
  console.log(token);
  console.log(request.headers);
  console.log(cookies());
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