// library
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// api
import { 
  deleteGroup, 
  getGroupWithProducts, 
  updateGroup 
} from "../rails-api";

// types
import { NextRequest, NextResponse } from "next/server";

// DELETE /v1/groups#destroy
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
  const response = await deleteGroup(slug, token);

  // refresh data cache
  revalidatePath('/');

  return response;
};

// GET /v1/groups#show
export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  // send request to /v1/groups#show endpoint
  const group = await getGroupWithProducts(params.slug);

  const response = NextResponse.json({ 
      status: 200,
      group: group
  });

  return response;
};

// PUT /v1/groups#update
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
  const group = await updateGroup(params.slug, formData, token);

  // configure response
  const response = NextResponse.json(
    { group: group },
    { status: 200 }
  );

  // refresh data cache
  revalidatePath('/');

  return response;
};