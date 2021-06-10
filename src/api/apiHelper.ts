// Takes an api endpoint and optional query pramam then retruns the correct url to call on Climate Mind API
export const buildUrl = (endpoint: string) => {
  const API_HOST = process.env.REACT_APP_API_URL;
  console.log({ API_HOST });
  const URL = `${API_HOST}${endpoint}`;
  return URL;
};
