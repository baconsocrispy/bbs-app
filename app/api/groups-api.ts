// helpers
import { baseApiUrl, doorkeeperCredentials, configureData } from "./api-helpers";

// api
import { revalidate } from "./server-actions";

// types
import { Category } from "./api-types";

export const createCategory = async (
  data: FormData
): Promise<Category> => {
  const url = `${ baseApiUrl() }/v1/categories`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: configureData(data)
  });

  const category = await response.json();

  revalidate('/');

  return category;
};