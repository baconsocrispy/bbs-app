// library
import { cookies } from "next/headers";

// helpers
import { backendUrlEncodedRequest, baseApiUrl, doorkeeperCredentials } from "./api-helpers";

// types
import { AuthFormData } from "../components/auth-form/auth-form.component";

// sign up a new user
export const newUserFromCredentials = async (formData: AuthFormData) => {
  const response= await backendUrlEncodedRequest(
    'POST', `${ baseApiUrl() }/users/signup`, formData
  );
  return response;
};

// retrieve HttpOnly cookie w/doorkeeper access token via email/password grant
export const accessTokenFromCredentials = async (formData: AuthFormData) => {
  const response = await backendUrlEncodedRequest(
    'POST', `${ baseApiUrl() }/oauth/token`, formData
  );
  return response;
};

// revoke doorkeeper access token stored in current access_token cookie
export const revokeAccessToken = async () => {
  const response = await backendUrlEncodedRequest(
    'POST', `${ baseApiUrl() }/oauth/revoke`
  );
  return response;
};

// get current user from doorkeeper access token stored in cookie
// export const getUserFromAccessToken = async () => {
//   const response = await backendUrlEncodedRequest(
//     'GET', `${ baseApiUrl() }/current_user`,
//   );
//   return response;
// };

export const getUserFromAccessToken = async () => {
  const url = `${ baseApiUrl() }/current_user`;

  // extract doorkeeper auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  console.log('TOKEN')
  console.log(cookieStore);
  console.log(token);

  const response = await fetch(url, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token?.value }`
    }
  });

  return response;
}