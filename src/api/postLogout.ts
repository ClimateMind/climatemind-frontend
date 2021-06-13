import axios from 'axios';
import { buildUrl } from './apiHelper';

interface Response {
  message: string;
}

export const postLogout = async (): Promise<Response> => {
  const url = buildUrl('/logout');
  try {
    // Make request for token
    const request = await axios.post(url, { withCredentials: true });
    return request.data;
  } catch (err) {
    throw err;
  }
};
