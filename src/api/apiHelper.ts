import { getAppSetting } from '../getAppSetting';
import axios from 'axios';

const API_HOST = getAppSetting('REACT_APP_API_URL');

const IN_DEV = process.env.NODE_ENV === 'development';

export const climateApi = axios.create({
  baseURL: API_HOST,
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

// Takes an api endpoint and optional query pramam then retruns the correct url to call on Climate Mind API
export const buildUrl = (endpoint: string) => {
  const API_HOST = getAppSetting('REACT_APP_API_URL');
  const URL = `${API_HOST}${endpoint}`;
  return URL;
};

export const buildReactUrl = (endpoint: string) => {
  const currentUrl = new URL(window.location.href);
  const url = `${currentUrl.protocol}//${currentUrl.host}/`;

  return url + endpoint;
};
