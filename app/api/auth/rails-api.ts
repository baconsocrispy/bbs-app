// helpers
import { baseApiUrl, doorkeeperCredentials } from "../api-helpers";

//types
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getUserFromAccessToken = async (token?: RequestCookie) => {
  const url = `${ baseApiUrl() }/current_user`;

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