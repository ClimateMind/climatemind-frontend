import axio from 'axios';
import { TClimateEffects } from '../types/types';

export type Response = {
  climateEffects: TClimateEffects;
};

const getFeed = async (sessionId: string): Promise<Response> => {
  // Set up the call
  const API_HOST = process.env.REACT_APP_API_URL;
  const FEED_ENDPOINT = '/feed';
  const REQUEST_URL = `${API_HOST}${FEED_ENDPOINT}?session-id=${sessionId}`;
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
