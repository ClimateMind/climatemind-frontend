import axios from 'axios';
import { TMyth } from '../types/Myths';
import { getAppSetting } from '../getAppSetting';

type Response = {
  myth: TMyth;
};

export async function getOneMyth(iri: string): Promise<Response> {
  const API_HOST = getAppSetting('REACT_APP_API_URL');
  const MYTHS_ENDPOINT = '/myths';
  const REQUEST_URL = `${API_HOST}${MYTHS_ENDPOINT}/${iri}`;

  // Try and make the request
  try {
    const response = await axios.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
