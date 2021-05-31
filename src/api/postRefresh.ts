import axios from 'axios';
import { buildUrl } from './apiHelper';
import { loginResponse } from './postLogin';

export const postRefresh = async (): Promise<loginResponse> => {
  const REQUEST_URL = buildUrl('/refresh');

  try {
    // Call the api
    const response = await axios.post(REQUEST_URL, { withCredentials: true });
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export default postRefresh;
