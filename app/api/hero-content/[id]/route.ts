// library
import { cookies } from 'next/headers';

// api
import { 
  updateHeroContent 
} from '../rails-api';

// types
import { NextResponse } from 'next/server';

// PUT /v1/hero_contents#update
export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get form data from request
  const formData = await request.formData();

  // send request to /v1/hero_contents#update endpoint
  const heroContent = await updateHeroContent(params.id, formData, token);

  // configure response
  const response = NextResponse.json(
    { heroContent: heroContent },
    { status: 200 }
  );

  return response;
};