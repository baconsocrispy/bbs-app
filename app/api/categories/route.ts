// library
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// api
import { createCategory, getAllCategories } from './rails-api';

// types
import { NextRequest, NextResponse } from 'next/server';

// GET /v1/categories#index
export const GET = async () => {
  const categories = await getAllCategories();

  const response = NextResponse.json({
    status: 200,
    categories: categories
  });
  
  return response;
};

// POST /v1/categories#create
export const POST = async (request: NextRequest) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get form data from request
  const formData = await request.formData();

  // send request to /v1/categories#create endpoint
  const category = await createCategory(formData, token);

  // configure response
  const response = NextResponse.json(
    { category: category },
    { status: 200 }
  );

  // refresh data cache
  const path = request.nextUrl.searchParams.get('path') ?? '/';
  console.log(path);
  revalidatePath(path);

  return response;
};