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

// sign in existing user
export const signInUser = async (formData: AuthFormData) => {
  const response: AuthAPIResponse = await backendAuthRequest(
    'POST', 'http://localhost:3001/oauth/token', formData
  );

  console.log(response)
  return response;
};

// sign out current user
export const signOutUser = async () => {
  const response = await backendAuthRequest(
    'DELETE', 'http://localhost:3001/admin/signout'
  );
  return response;
};

// get currently signed-in user
export const getCurrentUser = async (jwt: string) => {
  const user: User = await backendJWTRequest(
    'GET', 'http://localhost:3001/current_user', jwt
  );
  return user;
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formatFormData(data)
  });
  return response.json();  
};

const formatFormData = (data: AuthFormData | null) => {
  if (!data) return;

  const params = new URLSearchParams();

  // doorkeeper config
  params.append('grant_type', data.grant_type);
  params.append('client_id', data.client_id);
  params.append('client_secret', data.client_secret);

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