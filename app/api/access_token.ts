'use server'
import { cookies } from "next/headers";

export const getAccessToken = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  return token;
};