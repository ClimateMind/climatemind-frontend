import axios from 'axios';
import { pushQuizFinishToDataLayer } from '../analytics';
import { TResponse } from '../types/types';
import { buildUrl } from './apiHelper';

// TODO: Update to use and set the new scores/quiz id
type TScoreSubmitResponse = {
  quizId: string;
};

type Scores = {
  SetOne: TResponse[];
  SetTwo: TResponse[];
};

export async function submitScores(
  scores: Scores,
  jwt?: string
): Promise<TScoreSubmitResponse> {
  // Request body for Submission
  const REQUEST_BODY = {
    questionResponses: {
      SetOne: [...scores.SetOne],
      SetTwo: [...scores.SetTwo],
    },
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
    // TODO: Push to data layer when quiz is submitted.
    // if (quizId) {
    //   pushQuizFinishToDataLayer(quizId);
    // }
    return data;
  } catch (err) {
    throw err;
  }
}
