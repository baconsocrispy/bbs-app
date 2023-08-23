// helpers
import { backendJWTRequest } from "./api-helpers";

// types
import { User } from "../contexts/user.context";
import { AuthFormData } from "../components/auth-form/auth-form.component";

type AuthAPIResponse = {
  expires_in: number;
  created_at: number;
  status: {
    code: number;
    message: string;
  };
};

// sign up a new user
export const signUpUser = async (formData: AuthFormData) => {
  const response: AuthAPIResponse = await backendAuthRequest(
    'POST', 'http://localhost:3001/admin/signup', formData
  );
  return response;
};

// sign in existing user via doorkeeper oauth/token endpoint
export const signInUser = async (formData: AuthFormData) => {
  const response: AuthAPIResponse = await backendAuthRequest(
    'POST', 'http://localhost:3001/oauth/token', formData
  );
  return response;
};

// sign out current user
export const signOutUser = async () => {
  const response = await backendAuthRequest(
    'POST', 'http://localhost:3001/oauth/revoke'
  );
  return response;
};

// get currently signed-in user
export const getCurrentUser = async () => {
  // const user: User = await backendJWTRequest(
  //   'GET', 'http://localhost:3001/current_user',
  // );
  // return user;
};

// helper to send auth form data to backend
const backendAuthRequest = async (
  method: string,
  url: string,
  data: AuthFormData | null = null
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formatFormData(data)
  });
  return response.json();  
};

// helper converts form data into URLSearchParams format
const formatFormData = (data: AuthFormData | null) => {
  if (!data) return;

  const params = new URLSearchParams();

  // user auth config
  params.append('email', data.user.email);
  params.append('password', data.user.password);

  // doorkeeper config
  params.append('grant_type', process.env.NEXT_PUBLIC_DOORKEEPER_GRANT_TYPE as string);

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

// format doorkeeper credentials
const doorkeeperCredentials = () => {
  const clientId = process.env.NEXT_PUBLIC_DOORKEEPER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_DOORKEEPER_SECRET;

  // encodes credentials in base64 format
  const credentials = btoa(`${ clientId }:${ clientSecret }`);

  return credentials;
};