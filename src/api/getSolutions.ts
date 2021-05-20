import axios from 'axios';
import { buildUrl } from './apiHelper';
import { TSolutions } from '../types/Solutions';

type Response = {
  solutions: TSolutions;
};

export async function getSolutions(sessionId: string): Promise<Response> {
  const REQUEST_URL = buildUrl('/solutions');
  const REQUEST_URL_WITH_SESSIONID = `${REQUEST_URL}?session-id=${sessionId}`;
  console.log('in getSolutions: ', REQUEST_URL_WITH_SESSIONID);

  // Try and make the request
  try {
    const response = await axios.get(REQUEST_URL_WITH_SESSIONID);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
