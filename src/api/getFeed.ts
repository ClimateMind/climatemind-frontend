import { TClimateEffects } from '../types/types';
import { climateApi } from './apiHelper';

export type Response = {
  climateEffects: TClimateEffects;
};

export const getFeed = async (quizId: string): Promise<Response> => {
  // Set up the call
  const FEED_ENDPOINT = '/feed';
  const REQUEST_URL = `${FEED_ENDPOINT}?quizId=${quizId}`;
  try {
    // Call the api
    const response = await climateApi.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};

export default getFeed;
