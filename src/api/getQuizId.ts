import { climateApi } from './apiHelper';

export type Response = {
  quizId: string;
};

export async function getQuizId(
  ): Promise<Response> {

    const REQUEST_URL = '/quizId';
  
    // Try and make the request
    try {
      const response = await climateApi.get(REQUEST_URL);
      const data = await response.data;
      return data;
    } catch (err) {
      throw err;
    }
  }

export default getQuizId;