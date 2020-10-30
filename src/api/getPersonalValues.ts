import axios from 'axios';
import { TPersonalValues } from '../types/types';
import { TError } from '../types/Error';

const getPersonalValues = async (
  sessionId: string
): Promise<TPersonalValues | TError> => {
  // Set up the call
  const API_HOST =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;
  const PERSONAL_VALUES_ENDPOINT = '/personal_values';
  const REQUEST_URL = `${API_HOST}${PERSONAL_VALUES_ENDPOINT}?session-id=${sessionId}`;
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
