import axios from 'axios';
import { buildUrl } from './apiHelper';
import { TMyths } from '../types/Myths';
import { TError } from '../types/Error';

type Response = {
  myths: TMyths;
};

export async function getMyths(): Promise<Response | TError> {
  const REQUEST_URL = buildUrl('/myths');

  // Try and make the request
  try {
    const response = await axios.post(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    return {
      error: err.message,
      isError: true,
    };
  }
}
