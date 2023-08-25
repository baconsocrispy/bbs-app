// types
import { AuthFormData } from "../components/auth-form/auth-form.component";

// send authenticated backend request
export const backendAuthRequest = async (
  method: string,
  url: string,
  data: AuthFormData | null = null
) => {
  const response = await fetch(url, {
    credentials: 'include',
    method: method,
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formatFormData(data)
  });
  return response;
};

// convert form data into URLSearchParams format
const formatFormData = (data: AuthFormData | null) => {
  if (!data) return;

  // url encode form data
  const params = new URLSearchParams();

  // doorkeeper config
  params.append('grant_type', process.env.NEXT_PUBLIC_DOORKEEPER_GRANT_TYPE as string);

  // user auth config
  params.append('email', data.user.email);
  params.append('password', data.user.password);

  if (data.user.firstName) { 
    params.append('firstName', data.user.firstName) 
  }

  if (data.user.lastName) { 
    params.append('lastName', data.user.lastName) 
  }

  if (data.user.passwordConfirmation) { 
    params.append('passwordConfirmation', data.user.passwordConfirmation) 
  }

  return params;
};

// encode doorkeeper credentials in base64 format
const doorkeeperCredentials = () => {
  // doorkeeper credentials
  const clientId = process.env.NEXT_PUBLIC_DOORKEEPER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_DOORKEEPER_SECRET;

  // encodes credentials in base64 format
  const credentials = btoa(`${ clientId }:${ clientSecret }`);

  return credentials;
};