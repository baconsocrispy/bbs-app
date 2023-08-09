// send a JWT-encrypted request to backend
export const backendJWTRequest = async (
  method: string,
  url: string | URL,
  jwt: string | null,
  data?: string
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Authorization': `Bearer ${ jwt }`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};