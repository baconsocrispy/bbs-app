// helpers
import { 
  baseApiUrl,
  doorkeeperCredentials
} from "../api-helpers";

// types 
import { Summary } from "../api-types";

// POST /v1/summaries#create
export const createSummary = async (
  data: FormData,
  token?: string
): Promise<Summary> => {
  const url = `${ baseApiUrl() }/v1/summaries`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? ''}`
    },
    body: data
  });

  const summary: Summary = await response.json();

  return summary;
};

// GET /v1/summaries#index
export const getSummary = async (): Promise<Summary> => {
  const summaryURL = `${ baseApiUrl() }/v1/summaries`;
  const response = await fetch(summaryURL, { next: { revalidate: 5 }});
  const summary: Summary = await response.json();
  return summary;
};

// PUT /v1/summaries#update
export const updateSummary = async (
  id: number,
  data: FormData,
  token?: string
): Promise<Summary> => {
  const url = `${ baseApiUrl() }/v1/summaries/${ id }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? ''}`
    },
    body: data
  });

  const summary: Summary = await response.json();

  return summary;
};