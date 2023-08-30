// types
import { AuthFormData } from "../components/auth-form/auth-form.component";
import { ProductFormData } from "../admin/page";

// base api url
export const baseApiUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_API_URL
}

// send authenticated url-encoded backend request
export const backendUrlEncodedRequest = async (
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
    body: urlEncodeFormData(data)
  });
  return response;
};

// send authenticated form-encoded backend request
export const backendFormEncodedRequest = async (
  method: string,
  url: string,
  data: ProductFormData | null = null
) => {
  const response = await fetch(url, {
    credentials: 'include',
    method: method,
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: formEncodeFormData(data)
  });
  return response;
};

// convert form data into URLSearchParams format
const urlEncodeFormData = (
  data: AuthFormData | null
): URLSearchParams | null => {
  if (!data) return null;

  // url encode form data
  const params = new URLSearchParams();

  // doorkeeper config
  params.append('grant_type', process.env.NEXT_PUBLIC_DOORKEEPER_GRANT_TYPE as string);

  // user auth config
  if ('user' in data && data.user) {
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
  }

  return params;
};

const formEncodeFormData = (data: ProductFormData | null): FormData | null => {
  if (!data) return null;

  // form encode form data
  const formData = new FormData();

  // doorkeeper config
  formData.append('grant_type', process.env.NEXT_PUBLIC_DOORKEEPER_GRANT_TYPE as string);

  // product config
  if ('product' in data && data.product) {
    formData.append('product[name]', data.product.name);
    formData.append('product[short_description]', data.product.short_description);

    if (data.product.product_images) {
      for (let i = 0; i < data.product.product_images.length; i++) (
        formData.append('product[product_images][]', data.product.product_images[i])
      )
    }
  }

  return formData;
}

// encode doorkeeper credentials in base64 format
const doorkeeperCredentials = () => {
  // doorkeeper credentials
  const clientId = process.env.NEXT_PUBLIC_DOORKEEPER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_DOORKEEPER_SECRET;

  // encodes credentials in base64 format
  const credentials = btoa(`${ clientId }:${ clientSecret }`);

  return credentials;
};

