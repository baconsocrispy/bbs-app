// helpers
import { 
  baseApiUrl,
  doorkeeperCredentials 
} from "../api-helpers";

// types
import { Group } from "../api-types";

// POST /v1/groups#create
export const createGroup = async (
  data: FormData,
  token?: string
): Promise<Group> => {
  const url = `${ baseApiUrl() }/v1/groups`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    },
    body: data
  });

  const group: Group = await response.json();

  return group;
};

// DELETE /v1/groups#destroy
export const deleteGroup = async (
  slug: string,
  token?: string
) => {
  const groupUrl = `${ baseApiUrl( )}/v1/groups/${ slug }`
  const response = await fetch(groupUrl, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    }
  });

  return response.json();
};

// GET /v1/groups#index
export const getAllGroups = async (): Promise<Group[]> => {
  const groupsURL = `${ baseApiUrl() }/v1/groups`;
  const response = await fetch(groupsURL, { next: { revalidate: 5 }});
  const { groups } = await response.json();
  return groups as Group[];
};

// GET /v1/groups#show
export const getGroupWithProducts = async (slug: string): Promise<Group> => {
  const groupURL = `${ baseApiUrl() }/v1/groups/${ slug }`;
  const response = await fetch(groupURL, { next: { revalidate: 5 }})
  const group: Group = await response.json();
  return group;
};

// PUT /v1/groups#update
export const updateGroup = async (
  slug: string,
  data: FormData,
  token?: string
): Promise<Group> => {
  const url = `${ baseApiUrl() }/v1/groups/${ slug }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? '' }`
    },
    body: data
  });

  const group: Group = await response.json();

  return group;
};

