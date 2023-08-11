// helpers
import { backendJWTRequest } from "./api-helpers";

// types
import { User } from "../contexts/user.context";
import { AuthFormData } from "../components/auth-form/auth-form.component";

type AuthAPIResponse = {
  jwt: string;
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
    'POST', 'http://localhost:3001/admin/signin', formData
  );
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();  
};