import axios from 'axios';
import { TPersonalValues } from '../types/types';
import { TError } from '../types/Error';
import { getAppSetting } from '../getAppSetting';

// TODO: Update to use new scoresID
const getPersonalValues = async (
  quizId: string
): Promise<TPersonalValues | TError> => {
  // Set up the call
  const API_HOST = getAppSetting('REACT_APP_API_URL');
  const PERSONAL_VALUES_ENDPOINT = '/personal_values';
  const REQUEST_URL = `${API_HOST}${PERSONAL_VALUES_ENDPOINT}?quizId=${quizId}`;
  try {
    // Call the api
    const response = await axios.get(REQUEST_URL);
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
