// types
import { AuthFormData } from "../components/auth-form/auth-form.component";

// base api url
export const baseApiUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_API_URL
};

// send authenticated url-encoded backend request
export const backendUrlEncodedRequest = async (
  method: string,
  url: string,
  data: AuthFormData | null = null
) => {
  const response = await fetch(url, {
    credentials: 'include',
    method: method,
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlEncodeFormData(data)
  });
  return response;
};

// convert form data into URLSearchParams format
const urlEncodeFormData = (
  data: AuthFormData | null
): URLSearchParams | null => {
  if (!data) return null;

  // url encode form data
  const params = new URLSearchParams();

  // doorkeeper config
  params.append('grant_type', process.env.NEXT_PUBLIC_DOORKEEPER_GRANT_TYPE as string);

  // user auth config
  if ('user' in data && data.user) {
    params.append('email', data.user.email);
    params.append('password', data.user.password);

    if (data.user.firstName) { 
      params.append('first_name', data.user.firstName) 
    }

    if (data.user.lastName) { 
      params.append('last_name', data.user.lastName) 
    }

    if (data.user.passwordConfirmation) { 
      params.append('password_confirmation', data.user.passwordConfirmation) 
    }
  }

  return params;
};


// encode doorkeeper credentials in base64 format
export const doorkeeperCredentials = () => {
  // doorkeeper credentials
  const clientId = process.env.NEXT_PUBLIC_DOORKEEPER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_DOORKEEPER_SECRET;

  // encodes credentials in base64 format
  const credentials = btoa(`${ clientId }:${ clientSecret }`);

  return credentials;
};

// add doorkeeper grant_type to formData
export const configureData = (data: FormData) => {
  data.append('grant_type', 'password');
  return data;
};
