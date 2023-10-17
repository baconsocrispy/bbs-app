// library
import { cookies } from 'next/headers';

// api
import { createGroup, getAllGroups } from './rails-api';

// types
import { NextRequest, NextResponse } from 'next/server';

// GET /v1/groups#index
export const GET = async () => {
  const groups = await getAllGroups();

  const response = NextResponse.json({
    status: 200,
    groups: groups
  });
  
  return response;
};

// POST /v1/groups
export const POST = async (request: NextRequest) => {
  const path = request.nextUrl.searchParams.get('path')
  console.log(request.nextUrl.searchParams.get('path'))
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get form data from request
  const formData = await request.formData();

  // send request to /v1/categories#create endpoint
  const group = await createGroup(formData, token);

  // configure response
  const response = NextResponse.json(
    { group: group },
    { status: 200 }
  );

  return response;
};