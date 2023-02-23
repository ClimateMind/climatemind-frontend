import { climateApi } from './apiHelper';

export type Response = {
  quizId: string;
};

export async function getQuizId(jwt: string
  ): Promise<Response> {

    if (!jwt || jwt === '') {
      throw new Error('Cannot fetch quizId for unknown user');
    }
    
    const REQUEST_URL = '/quizId';
    const HEADERS = { Authorization: jwt ? `Bearer ${jwt}` : '' }
  
    // Try and make the request
    try {
      const response = await climateApi.get(REQUEST_URL, { headers: HEADERS});
      const data = await response.data;
      return data;
    } catch (err) {
      throw err;
    }
  }

export default getQuizId;