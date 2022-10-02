import { TResponse } from '../types/types';
import { climateApi } from './apiHelper';

type TScoreSubmitResponse = {
  quizId: string;
};

type Scores = {
  SetOne: TResponse[];
  SetTwo: TResponse[];
};

type TRequest = {
  questionResponses: {
    SetOne: TResponse[],
    SetTwo: TResponse[],
  },
  isUserB?: boolean,
}

export async function submitScores(
  scores: Scores,
  isUserB?: boolean
): Promise<TScoreSubmitResponse> {
  // Request body for Submission
  const REQUEST_BODY: TRequest = {
    questionResponses: {
      SetOne: [...scores.SetOne],
      SetTwo: [...scores.SetTwo],
    },
  };

  if (isUserB) {
    REQUEST_BODY.isUserB = true;
  }

  const REQUEST_URL = '/scores';

  // Try and make the request
  try {
    const response = await climateApi.post(REQUEST_URL, REQUEST_BODY);
    const data = await response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
