import axios from 'axios';
import { buildUrl } from './apiHelper';

type refreshResponse = {
  access_token: string;
};

export const postRefresh = async (): Promise<refreshResponse> => {
  const REQUEST_URL = buildUrl('/refresh');

  try {
    // Call the api
    const response = await axios(REQUEST_URL, {
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
