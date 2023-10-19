// library
import { cookies } from 'next/headers';

// api
import { 
  updateSummary 
} from '../rails-api';

// types
import { NextResponse } from 'next/server';

// POST /v1/summaries#update
export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get form data from request
  const formData = await request.formData();

  // send request to /v1/summaries#update endpoint
  const summary = await updateSummary(params.id, formData, token);

  // configure response
  const response = NextResponse.json(
    { summary: summary },
    { status: 200 }
  );

  return response;
};