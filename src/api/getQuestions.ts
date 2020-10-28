import axio from 'axios';
import { TQuestions } from '../types/types';
import { TError } from '../types/Error';

const getQuestions = async (): Promise<TQuestions | TError> => {
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
    // Return the response object
    return data;
  } catch (err) {
    const error = {
      error: err.error,
      isError: true,
    };
    return error;
  }
};

export default getQuestions;
