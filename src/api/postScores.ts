import axios from 'axios';
import { pushQuizFinishToDataLayer } from '../analytics';
import { TResponse } from '../types/types';
import { buildUrl } from './apiHelper';

type TScoreSubmitResponse = {
  sessionId: string;
};

type TErrorResponse = {
  error: string;
  sessionId: null;
};

type Scores = {
  SetOne: TResponse[];
  SetTwo: TResponse[];
  zipCode: string | null;
};

export async function submitScores(
  scores: Scores,
  quizSessionId: string
): Promise<TScoreSubmitResponse | TErrorResponse> {
  // Request body for Submission
  const REQUEST_BODY = {
    questionResponses: {
      SetOne: [...scores.SetOne],
      SetTwo: [...scores.SetTwo]
    },
    zipCode: scores.zipCode,
  };

  // Build the correct url
  const SCORE_ENDPOINT = '/scores';
  const REQUEST_URL = buildUrl(SCORE_ENDPOINT);

  // Try and make the request
  try {
    const response = await axios.post(REQUEST_URL, REQUEST_BODY);
    const data = await response.data;
    pushQuizFinishToDataLayer(data.sessionId, quizSessionId);
    return data;
  } catch (err) {
    console.error(err);
    return {
      error: err.message,
      sessionId: null,
    };
  }
}
