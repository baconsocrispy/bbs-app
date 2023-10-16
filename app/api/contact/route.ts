// api
import { submitContactForm } from './rails-api';

// POST /v1/contact#create
export const POST = async (request: Request) => {
  // get form data from request
  const formData = await request.formData();

  // send request to /v1/contact#create endpoint
  const response = await submitContactForm(formData);

  return response;
};