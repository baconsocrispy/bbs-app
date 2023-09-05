// helpers
import { 
  baseApiUrl,
  configureData,
  doorkeeperCredentials 
} from "./api-helpers";

// api
import { revalidate } from "./server-actions";

// types
import { Group } from "./api-types";

export const createGroup = async (
  data: FormData
): Promise<Group> => {
  const url = `${ baseApiUrl() }/v1/groups`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: configureData(data)
  });

  const group = await response.json();

  console.log(group);

  revalidate('/');

  return group;
};