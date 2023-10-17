// library
import { cookies } from 'next/headers';

// api
import { 
  createHeroContent, 
  getHeroContent
} from './rails-api';

// types
import { NextResponse } from 'next/server';

// GET /v1/hero_contents#index
export const GET = async () => {
  const heroContent = await getHeroContent();

  const response = NextResponse.json({
    status: 200,
    heroContent: heroContent
  });
  
  return response;
};

// POST /v1/hero_contents#create
export const POST = async (request: Request) => {
  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  // get form data from request
  const formData = await request.formData();

  // send request to /v1/hero_contents#create endpoint
  const heroContent = await createHeroContent(formData, token);

  // configure response
  const response = NextResponse.json(
    { heroContent: heroContent },
    { status: 200 }
  );

  return response;
};