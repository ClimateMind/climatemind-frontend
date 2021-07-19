import axio from 'axios';
import { TClimateEffects } from '../types/types';
import { getAppSetting } from '../getAppSetting';

export type Response = {
  climateEffects: TClimateEffects;
};

const getFeed = async (quizId: string): Promise<Response> => {
  // Set up the call
  const API_HOST = getAppSetting('REACT_APP_API_URL');
  const FEED_ENDPOINT = '/feed';
  const REQUEST_URL = `${API_HOST}${FEED_ENDPOINT}?quizId=${quizId}`;
  try {
    // Call the api
    const response = await axio.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};

export default getFeed;
