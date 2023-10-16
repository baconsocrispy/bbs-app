// helpers
import { backendUrlEncodedRequest, baseApiUrl, doorkeeperCredentials } from "../api-helpers";

//types
import { AuthFormData } from "@/app/components/auth-form/auth-form.component";

// GET /users/current_user#current_user
export const getUserFromAccessToken = async (token?: string) => {
  const url = `${ baseApiUrl() }/current_user`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token }`
    }
  });

  return response;
}

// sign up a new user
export const newUserFromCredentials = async (
  formData: FormData,
  token?: string
) => {
  const signUpURL = `${ baseApiUrl() }/users/signup`;
  
  const response = await fetch(signUpURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    },
    body: formData
  });
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