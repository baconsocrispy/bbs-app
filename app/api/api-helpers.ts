// types
import { AuthFormData } from "../_forms/auth-form/auth-form.component";

import { ProductFormData } from "../_forms/product-form/product-form.component";

// base api url
export const baseApiUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_API_URL
};

// encode doorkeeper credentials in base64 format
export const doorkeeperCredentials = () => {
  // doorkeeper credentials
  const clientId = process.env.NEXT_PUBLIC_DOORKEEPER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_DOORKEEPER_SECRET;

  // encodes credentials in base64 format
  const credentials = btoa(`${ clientId }:${ clientSecret }`);

  return credentials;
};