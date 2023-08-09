// types
import { AuthFormData } from "../components/auth-form/auth-form.component";

type AuthAPI = {
  jwt: string;
  status: {
    code: number;
    message: string;
  };
}

// sign up a new user
export const signUpUser = async (formData: AuthFormData) => {
  const response: AuthAPI = await backendAuthRequest(
    'POST', 'http://localhost:3001/signup', formData
  );
  return response;
}

// sign in existing user
export const signInUser = async (formData: AuthFormData) => {
  const response: AuthAPI = await backendAuthRequest(
    'POST', 'http://localhost:3001/signin', formData
  );
  return response;
}

// sign out current user
export const signOutUser = async (formData: AuthFormData) => {
  const response = await backendAuthRequest(
    'DELETE', 'http://localhost:3001/signout'
  );
  return response;
}

// helpers
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
}