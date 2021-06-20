import axios from 'axios';
import { buildUrl } from './apiHelper';
import { TQuestions } from '../types/types';

export const getQuestions = async (): Promise<TQuestions> => {
  const REQUEST_URL = buildUrl('/questions');

  try {
    // Call the api
    console.log('REQEST', REQUEST_URL);
    const response = await axios.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export default getQuestions;
