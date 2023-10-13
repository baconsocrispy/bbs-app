// library
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// api
import { createProduct, getAllProducts } from './rails-api';

// types
import { NextResponse } from 'next/server';


export const GET = async () => {
  // send request to /v1/products#index endpoint
  const products = await getAllProducts();
  return products;
};

export const POST = async (request: Request) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get form data from request
  const formData = await request.formData();

  // send request to /v1/products#create endpoint
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