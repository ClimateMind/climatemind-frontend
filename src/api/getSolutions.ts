/* eslint-disable no-useless-catch */
import { TSolutions } from '../types/Solutions';
import { climateApi } from './apiHelper';

type Response = {
  solutions: TSolutions;
};

export async function getSolutions(quizId: string): Promise<Response> {
  const REQUEST_URL = '/solutions';
  const REQUEST_URL_WITH_QUIZID = `${REQUEST_URL}?quizId=${quizId}`;

  // Try and make the request
  try {
    const response = await climateApi.get(REQUEST_URL_WITH_QUIZID);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
