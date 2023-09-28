// helpers
import { 
  backendUrlEncodedRequest,
  baseApiUrl,
  configureData,
  doorkeeperCredentials 
} from "./api-helpers";

// api
import { revalidate } from "./server-actions";

// types
import { Group } from "./api-types";

export const getGroupWithProducts = async (slug: string): Promise<Group> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/groups/${ slug }`
  );
  const group: Group = await response.json();
  return group;
};

export const getAllGroups = async (): Promise<Group[]> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/groups`
  );
  const { groups } = await response.json();
  return groups;
};

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

  revalidate('/');

  return group;
};

export const updateGroup = async (
  slug: string,
  data: FormData
): Promise<Group> => {
  const url = `${ baseApiUrl() }/v1/groups/${ slug }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: configureData(data)
  });

  const group = await response.json();

  revalidate('/');

  return group;
};

export const deleteGroup = async (
  slug: string
): Promise<Group> => {
  const response = await backendUrlEncodedRequest(
    'DELETE', `${ baseApiUrl( )}/v1/groups/${ slug }`
  );
  
  revalidate('/');

  return response.json();
};