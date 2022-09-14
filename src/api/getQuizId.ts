import { climateApi } from './apiHelper';

export type Response = {
  quizId: string;
};

export async function getQuizId(
    jwt?: string
  ): Promise<Response> {

    const HEADERS = { Authorization: jwt ? `Brearer ${jwt}` : '' };
    const REQUEST_URL = '/quizId';
  
    // Try and make the request
    try {
      const response = await climateApi.get(REQUEST_URL, {
        headers: HEADERS,
      });
      const data = await response.data;
      return data;
    } catch (err) {
      throw err;
    }
  }

export default getQuizId;