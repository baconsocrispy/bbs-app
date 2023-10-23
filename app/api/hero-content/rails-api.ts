// helpers
import { 
  baseApiUrl,
  doorkeeperCredentials
} from "../api-helpers";

// types 
import { HeroContent } from "../api-types";

// POST /v1/hero_contents#create
export const createHeroContent = async (
  data: FormData,
  token?: string
): Promise<HeroContent> => {
  const url = `${ baseApiUrl() }/v1/hero_contents`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? ''}`
    },
    body: data
  });

  const heroContent: HeroContent = await response.json();

  return heroContent;
};

// GET /v1/hero_contents#index
export const getHeroContent = async (): Promise<HeroContent> => {
  const heroContentURL = `${ baseApiUrl() }/v1/hero_contents`;
  const response = await fetch(heroContentURL, { next: { revalidate: 5 }});
  const heroContent: HeroContent = await response.json();
  return heroContent;
};

// PUT /v1/hero_contents#update
export const updateHeroContent = async (
  id: number,
  data: FormData,
  token?: string
): Promise<HeroContent> => {
  const url = `${ baseApiUrl() }/v1/hero_contents/${ id }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    next: { revalidate: 0 },
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Cookie': `access_token=${ token ?? ''}`
    },
    body: data
  });

  const heroContent: HeroContent = await response.json();

  return heroContent;
};

