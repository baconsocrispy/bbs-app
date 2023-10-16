import { baseApiUrl, doorkeeperCredentials } from "../api-helpers";

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
};

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