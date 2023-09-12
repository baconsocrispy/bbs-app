// helpers
import { 
  backendUrlEncodedRequest,
  baseApiUrl,
  configureData,
  doorkeeperCredentials
} from "./api-helpers";

import { revalidate } from "./server-actions";

// types 
import { HeroContent } from "./api-types";

export const createHeroContent = async (
  data: FormData
): Promise<HeroContent> => {
  const url = `${ baseApiUrl() }/v1/hero_contents`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: configureData(data)
  });

  revalidate('/');

  const heroContent: HeroContent = await response.json();

  return heroContent;
};

export const getHeroContent = async (): Promise<HeroContent> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/hero_contents`
  );
  const heroContent = await response.json();
  return heroContent;
};