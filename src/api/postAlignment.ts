import { climateApi } from './apiHelper';

type TAlignmentResponse = {
  alignmentScoresId: string;
  message: string;
};

export type TPostAlignmentRequest = {
  conversationId: string;
  quizId: string | null;
  jwt?: string;
};

export async function postAlignment(
  payload: TPostAlignmentRequest
): Promise<TAlignmentResponse> {
  // Request body for Submission
  const { jwt, conversationId, quizId } = payload;
  const REQUEST_BODY = {
    conversationId: conversationId,
    quizId: quizId,
  };
  // Auth token added for logged in user so that the session id can be assigned to the user
  const HEADERS = { Authorization: jwt ? `Brearer ${jwt}` : '' };
  const REQUEST_URL = '/alignment';

  // Try and make the request
  try {
    const response = await climateApi.post(REQUEST_URL, REQUEST_BODY, {
      headers: HEADERS,
    });
    const data = await response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
