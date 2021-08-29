import { TPersonalValues } from '../types/types';
import { TError } from '../types/Error';
import { climateApi } from './apiHelper';

const getPersonalValues = async (
  quizId: string
): Promise<TPersonalValues | TError> => {
  // Set up the call
  const PERSONAL_VALUES_ENDPOINT = '/personal_values';
  const REQUEST_URL = `${PERSONAL_VALUES_ENDPOINT}?quizId=${quizId}`;
  try {
    // Call the api
    const response = await climateApi.get(REQUEST_URL);
    const data = response.data;
    return data;
    // Return the response object
  } catch (err) {
    // handle errors
    console.error(`Error`, err.message);
    return {
      error: err.message,
      isError: true,
    };
  }
};

export default getPersonalValues;
