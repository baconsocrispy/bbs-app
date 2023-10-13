// helpers
import { baseApiUrl, doorkeeperCredentials } from "../api-helpers";

//types
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