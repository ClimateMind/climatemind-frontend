/* eslint-disable no-useless-catch */
import { TMyths } from '../types/Myths';
import { climateApi } from '../api/apiHelper';

type Response = {
  myths: TMyths;
};

export async function getMyths(): Promise<Response> {
  // Try and make the request
  try {
    const response = await climateApi.get('/myths');
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
