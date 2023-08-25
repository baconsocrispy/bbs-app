// helpers
import { backendAuthRequest } from "./api-helpers";

// types
import { AuthFormData } from "../components/auth-form/auth-form.component";

// sign up a new user
export const newUserFromCredentials = async (formData: AuthFormData) => {
  const response= await backendAuthRequest(
    'POST', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/admin/signup`, formData
  );
  return response;
};

// retrieve HttpOnly cookie w/doorkeeper access token via email/password grant
export const accessTokenFromCredentials = async (formData: AuthFormData) => {
  const response = await backendAuthRequest(
    'POST', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/oauth/token`, formData
  );
  return response;
};

// revoke doorkeeper access token stored in current access_token cookie
export const revokeAccessToken = async () => {
  const response = await backendAuthRequest(
    'POST', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/oauth/revoke`
  );
  return response;
};

// get current user from doorkeeper access token stored in cookie
export const getUserFromAccessToken = async () => {
  const response = await backendAuthRequest(
    'GET', `${ process.env.NEXT_PUBLIC_BASE_API_URL }/current_user`,
  );
  return response;
};