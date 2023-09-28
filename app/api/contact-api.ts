// helpers
import { baseApiUrl, doorkeeperCredentials, configureData } from "./api-helpers";

export const submitContactForm = async (
  data: FormData
) => {
  const url = `${ baseApiUrl() }/v1/contact`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: configureData(data)
  });

  return response;
};