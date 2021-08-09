import { TMyth } from '../types/Myths';
import { climateApi } from './apiHelper';

type Response = {
  myth: TMyth;
};

export async function getOneMyth(iri: string): Promise<Response> {
  const MYTHS_ENDPOINT = '/myths';
  const REQUEST_URL = `${MYTHS_ENDPOINT}/${iri}`;

  // Try and make the request
  try {
    const response = await climateApi.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
