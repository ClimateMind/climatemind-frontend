import { getAppSetting } from '../getAppSetting';
import axios from 'axios';
import { useSession } from './useSession';

const API_HOST = getAppSetting('REACT_APP_API_URL');

const IN_DEV = process.env.NODE_ENV === 'development';

export const useClimateApi = () => {
  const { sessionId } = useSession();
  const climateApi = axios.create({
    baseURL: API_HOST,
    headers: { 'X-Session-Id': sessionId },
  });

  // Intercept and log out request config in dev
  climateApi.interceptors.request.use((config) => {
    if (IN_DEV) {
      console.log(config);
    }
    return config;
  });

  // Intercept and log out responses in dev
  climateApi.interceptors.response.use((config) => {
    if (IN_DEV) {
      console.log(config);
    }
    return config;
  });

  return climateApi;
};
