// library
import { cookies } from 'next/headers';

// api
import { 
  createSummary, 
  getSummary
} from './rails-api';

// types
import { NextResponse } from 'next/server';

// GET /v1/summaries#index
export const GET = async () => {
  const summary = await getSummary();

  const response = NextResponse.json({
    status: 200,
    summary: summary
  });
  
  return response;
};

// POST /v1/summaries#create
export const POST = async (request: Request) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get form data from request
  const formData = await request.formData();

  // send request to /v1/hero_contents#create endpoint
  const summary = await createSummary(formData, token);

  // configure response
  const response = NextResponse.json(
    { summary: summary },
    { status: 200 }
  );

  return response;
};