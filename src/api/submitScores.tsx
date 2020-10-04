import axios from 'axios';
import { TResponse } from '../types/types';

type TScoreSubmitResponse = {
  sessionId: string;
};

type TErrorResponse = {
  error: string;
  sessionId: null;
};

export async function submitScores(
  SetOne: TResponse[]
): Promise<TScoreSubmitResponse | TErrorResponse> {
  // Request body for Submission
  const REQUEST_BODY = {
    questionResponses: {
      SetOne: [...SetOne],
    },
  };

  // Build the correct url
  const API_HOST =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;
  const SCORE_ENDPOINT = '/scores';
  const REQUEST_URL = `${API_HOST}${SCORE_ENDPOINT}`;

  // Try and make the request
  try {
    const response = await axios.post(REQUEST_URL, REQUEST_BODY);
    const data = response.data;
    console.log(`Scores Submitted`, data);
    return data;
  } catch (err) {
    console.error(err);
    return {
      error: err.message,
      sessionId: null,
    };
  }
}
