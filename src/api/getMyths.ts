import axios from 'axios';
import { buildUrl } from './apiHelper';
import { TMyths } from '../types/Myths';

type Response = {
  myths: TMyths;
};

export async function getMyths(): Promise<Response> {
  const REQUEST_URL = buildUrl('/myths');

  // Try and make the request
  try {
    const response = await axios.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
