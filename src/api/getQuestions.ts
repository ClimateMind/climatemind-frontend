import axio from 'axios';
import { TQuestions } from '../types/types';

const getQuestions = async (): Promise<TQuestions> => {
  // Set up the call
  const API_HOST =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;
  const FEED_ENDPOINT = '/questions';
  const REQUEST_URL = `${API_HOST}${FEED_ENDPOINT}`;

  try {
    // Call the api
    const response = await axio.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err.message);
  }
  return {} as TQuestions;
};

export default getQuestions;
