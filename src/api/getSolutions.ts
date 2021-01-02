import axios from 'axios';
import { buildUrl } from './apiHelper';
import { TSolutions } from '../types/Solutions';

type Response = {
  solutions: TSolutions;
};

export async function getSolutions(): Promise<Response> {
  const REQUEST_URL = buildUrl('/solutions');

  // Try and make the request
  try {
    const response = await axios.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
