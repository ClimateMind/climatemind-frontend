import axios from 'axios';
import { buildUrl } from './apiHelper';
import { TSolutions } from '../types/Solutions';

type Response = {
  solutions: TSolutions;
};

// TODO: Update to use new scoresID
export async function getSolutions(quizId: string): Promise<Response> {
  const REQUEST_URL = buildUrl('/solutions');
  const REQUEST_URL_WITH_QUIZID = `${REQUEST_URL}?quizId=${quizId}`;

  // Try and make the request
  try {
    const response = await axios.get(REQUEST_URL_WITH_QUIZID);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
