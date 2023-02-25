import { climateApi } from './apiHelper';

// No documentation on stoplight
type TFeedbackResponse = {
  message: string;
};

export type TFeedbackRequest = {
  text: string;
  jwt?: string;
};

export async function postFeedback(
  payload: TFeedbackRequest
): Promise<TFeedbackResponse> {
  // Request body for Submission
  const { jwt, text } = payload;
  const REQUEST_BODY = {
    text: text,
  };

  // Auth token added for logged in user so that the session id can be assigned to the user
  const HEADERS = { Authorization: jwt ? `Bearer ${jwt}` : '' };
  const REQUEST_URL = '/feedback';

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
