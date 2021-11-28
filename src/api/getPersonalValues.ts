import { TPersonalValues } from '../types/PersonalValues';
import { climateApi } from './apiHelper';

const getPersonalValues = async (quizId: string): Promise<TPersonalValues> => {
  // Set up the call
  const PERSONAL_VALUES_ENDPOINT = '/personal_values';
  const REQUEST_URL = `${PERSONAL_VALUES_ENDPOINT}?quizId=${quizId}`;
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

export default getPersonalValues;
