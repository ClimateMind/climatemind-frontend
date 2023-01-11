/* eslint-disable no-useless-catch */
import { climateApi } from './apiHelper';

interface Response {
  datetime: string;
  email: string;
  sessionId: string;
  status: string;
}
interface payload {
  email: string;
  sessionId: string | null;
}

export async function postSubscriber(data: payload): Promise<Response> {
  const { email, sessionId } = data;
  // Request body for Submission
  const REQUEST_BODY = {
    email: email,
    sessionId: sessionId,
  };

  // Build the correct url
  const REQUEST_URL = '/subscribe';

  // Try and make the request
  try {
    const response = await climateApi.post(REQUEST_URL, REQUEST_BODY);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
