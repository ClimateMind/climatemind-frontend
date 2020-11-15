import axio from 'axios';
import { TQuestions } from '../types/types';
import { TError } from '../types/Error';

const getQuestions = async (): Promise<TQuestions | TError> => {
  // Set up the call
  const API_HOST = process.env.REACT_APP_API_URL;
  const FEED_ENDPOINT = '/questions';
  const REQUEST_URL = `${API_HOST}${FEED_ENDPOINT}`;

  try {
    // Call the api
    const response = await axio.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err.message);
    return {
      error: err.message,
      isError: true,
    };
  }
};

export default getQuestions;
