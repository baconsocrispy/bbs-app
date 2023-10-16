// helpers
import { baseApiUrl, doorkeeperCredentials } from "../api-helpers";

// retrieve HttpOnly cookie w/doorkeeper access token via email/password grant
export const accessTokenFromCredentials = async (formData: FormData) => {
  const tokenURL = `${ baseApiUrl() }/oauth/token`;
  const response = await fetch(tokenURL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: formData
  })
  return response;
};

// revoke doorkeeper access token stored in access_token cookie
export const revokeAccessToken = async () => {
  const revokeURL = `${ baseApiUrl() }/oauth/revoke`
  const response = await fetch(revokeURL, { 
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
   });
  return response;
};