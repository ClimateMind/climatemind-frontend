/* eslint-disable no-useless-catch */
import { TQuestions } from '../types/types';
import { climateApi } from './apiHelper';

export const getQuestions = async (): Promise<TQuestions> => {
  try {
    // Call the api
    const response = await climateApi.get('/questions');
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export default getQuestions;
