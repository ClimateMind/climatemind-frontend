import axios from 'axios';
import { buildUrl } from './apiHelper';

export interface SessionResponse {
  sessionId: string;
}

export const postSession = async (): Promise<SessionResponse> => {
  const REQUEST_URL = buildUrl('/session');

  try {
    // Call the api
    const response = await axios.post(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export default postSession;
