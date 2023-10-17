// library
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// api
import { 
  deleteCategory, 
  getCategoryWithGroups, 
  updateCategory 
} from "../rails-api";

// types
import { NextRequest, NextResponse } from "next/server";

// DELETE /v1/categories#destroy
export const DELETE = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get slug from params
  const slug = params.slug;

  // send to /v1/categories#destroy endpoint
  const response = await deleteCategory(slug, token);

  // refresh data & router cache
  revalidatePath('/');

  return response;
};

// GET /v1/categories#show
export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  // send request to /v1/products#show endpoint
  const category = await getCategoryWithGroups(params.slug);

  const response = NextResponse.json({ 
      status: 200,
      category: category 
  });

  return response;
};

// PUT /v1/categories#update
export const PUT = async (
  request: NextRequest,
  { params }: { params: { slug: string } } 
) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get form data from request
  const formData = await request.formData();

  // send to /v1/categories#update endpoint
  const category = await updateCategory(params.slug, formData, token);

  // configure response
  const response = NextResponse.json(
    { category: category },
    { status: 200 }
  );

  // refresh data cache
  revalidatePath('/');

  return response;
};