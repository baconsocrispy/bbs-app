// library
import { cookies } from 'next/headers';

// api
import { createProduct, getAllProducts } from './rails-api';

// types
import { NextResponse } from 'next/server';

// GET /v1/products#index
export const GET = async () => {
  const products = await getAllProducts();
  return products;
};

// POST /v1/products#create
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

  return response;
};