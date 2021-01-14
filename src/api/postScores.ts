import axios from 'axios';
import { TResponse } from '../types/types';
import { buildUrl } from './apiHelper';

type TScoreSubmitResponse = {
  sessionId: string;
};

type TErrorResponse = {
  error: string;
  sessionId: null;
};

export async function submitScores(
  SetOne: TResponse[],
  zipCode: string | null
): Promise<TScoreSubmitResponse | TErrorResponse> {
  // Request body for Submission
  const REQUEST_BODY = {
    questionResponses: {
      SetOne: [...SetOne],
    },
    zipCode,
  };

  // Build the correct url
  const SCORE_ENDPOINT = '/scores';
  const REQUEST_URL = buildUrl(SCORE_ENDPOINT);

  // Try and make the request
  try {
    const response = await axios.post(REQUEST_URL, REQUEST_BODY);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    return {
      error: err.message,
      sessionId: null,
    };
  }
}
