import axios from 'axios';
import { buildUrl } from './apiHelper';
import { TQuestions } from '../types/types';
import { TError } from '../types/Error';

const getQuestions = async (): Promise<TQuestions | TError> => {
  const REQUEST_URL = buildUrl('/questions');

  try {
    // Call the api
    const response = await axios.get(REQUEST_URL);
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
