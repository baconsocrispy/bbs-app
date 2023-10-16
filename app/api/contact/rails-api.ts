// helpers
import { baseApiUrl } from "../api-helpers";

// POST /v1/contact#create
export const submitContactForm = async (
  data: FormData
) => {
  const contactURL = `${ baseApiUrl() }/v1/contact`;

  const response = await fetch(contactURL, {
    credentials: 'include',
    method: 'POST',
    body: data
  });

  return response;
};