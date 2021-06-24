import { getAppSetting } from '../getAppSetting';
// Takes an api endpoint and optional query pramam then retruns the correct url to call on Climate Mind API
export const buildUrl = (endpoint: string) => {
  const API_HOST = getAppSetting('REACT_APP_API_URL');
  const URL = `${API_HOST}${endpoint}`;
  return URL;
};
