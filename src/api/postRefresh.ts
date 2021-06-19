import axios from 'axios';
import { climateApi } from './apiHelper';

type refreshResponse = {
  access_token: string;
};

export const postRefresh = async (): Promise<refreshResponse> => {
  // const REQUEST_URL = buildUrl('/refresh');

  try {
    // Call the api
    const response = await climateApi('/refresh', {
      method: 'post',
      withCredentials: true,
    });
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export default postRefresh;
