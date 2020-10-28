import axio from 'axios';
import { TClimateFeed } from '../types/types';

type error = {
  error: string;
};

const getFeed = async (sessionId: string): Promise<TClimateFeed | error> => {
  // Set up the call
  const API_HOST =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;
  const FEED_ENDPOINT = '/feed';
  const REQUEST_URL = `${API_HOST}${FEED_ENDPOINT}?session-id=${sessionId}`;
  try {
    // Call the api
    const response = await axio.get(REQUEST_URL);
    const data = response.data.climateEffects;
    return data;
    // Return the response object
  } catch (err) {
    // handle errors
    console.error(`Error`, err.message);
    return {
      error: err.message,
    };
  }
};

export default getFeed;
