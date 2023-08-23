// types
import { AuthFormData } from "../components/auth-form/auth-form.component";

// sign up a new user
export const signUpUser = async (formData: AuthFormData) => {
  const response= await backendAuthRequest(
    'POST', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/admin/signup`, formData
  );
  return response;
};

// sign in existing user via doorkeeper oauth/token endpoint
// response includes HttpOnly cookie with access_token
export const signInUser = async (formData: AuthFormData) => {
  const response = await backendAuthRequest(
    'POST', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/oauth/token`, formData
  );
  return response;
};

// sign out current user
export const signOutUser = async () => {
  const response = await backendAuthRequest(
    'POST', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/oauth/revoke`
  );
  return response;
};

// get currently signed-in user
export const getCurrentUser = async () => {
  const response = await backendAuthRequest(
    'GET', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/current_user`,
  );
  return response.json();
};

// HELPERS
// send auth form data in backend request
const backendAuthRequest = async (
  method: string,
  url: string,
  data: AuthFormData | null = null
) => {
  const response = await fetch(url, {
    credentials: process.env.NODE_ENV === 'development'  ? 
      'include' : 'same-origin',
    method: method,
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formatFormData(data)
  });

  return response;
};

// convert form data into URLSearchParams format
const formatFormData = (data: AuthFormData | null) => {
  if (!data) return;

  // url encode form data
  const params = new URLSearchParams();

  // doorkeeper config
  params.append('grant_type', process.env.NEXT_PUBLIC_DOORKEEPER_GRANT_TYPE as string);

  // user auth config
  params.append('email', data.user.email);
  params.append('password', data.user.password);

  if (data.user.firstName) { 
    params.append('firstName', data.user.firstName) 
  }

  if (data.user.lastName) { 
    params.append('lastName', data.user.lastName) 
  }

  if (data.user.passwordConfirmation) { 
    params.append('passwordConfirmation', data.user.passwordConfirmation) 
  }

  return params;
};

// encode doorkeeper credentials in base64 format
const doorkeeperCredentials = () => {
  // doorkeeper credentials
  const clientId = process.env.NEXT_PUBLIC_DOORKEEPER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_DOORKEEPER_SECRET;

  // encodes credentials in base64 format
  const credentials = btoa(`${ clientId }:${ clientSecret }`);

  return credentials;
};