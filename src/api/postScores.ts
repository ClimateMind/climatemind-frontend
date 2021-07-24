import axios from 'axios';
import { pushQuizFinishToDataLayer } from '../analytics';
import { TResponse } from '../types/types';
import { buildUrl } from './apiHelper';

type TScoreSubmitResponse = {
  sessionId: string;
};

type Scores = {
  SetOne: TResponse[];
  SetTwo: TResponse[];
  zipCode: string | null;
};

export async function submitScores(
  scores: Scores,
  quizSessionId: string | null,
  jwt?: string
): Promise<TScoreSubmitResponse> {
  // Request body for Submission
  const REQUEST_BODY = {
    questionResponses: {
      SetOne: [...scores.SetOne],
      SetTwo: [...scores.SetTwo],
    },
    zipCode: scores.zipCode,
  };

  // Auth token added for logged in user so that the session id can be assigned to the user
  const HEADERS = { Authorization: jwt ? `Brearer ${jwt}` : '' };

  // Build the correct url
  const SCORE_ENDPOINT = '/scores';
  const REQUEST_URL = buildUrl(SCORE_ENDPOINT);

  // Try and make the request
  try {
    const response = await axios.post(REQUEST_URL, REQUEST_BODY, {
      headers: HEADERS,
    });
    const data = await response.data;
    if (data.sessionId) {
      pushQuizFinishToDataLayer(data.sessionId);
    }
    return data;
  } catch (err) {
    throw err;
  }
}
