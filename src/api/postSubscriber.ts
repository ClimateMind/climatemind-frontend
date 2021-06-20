import axios from 'axios';
import { buildUrl } from './apiHelper';

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
  const SCORE_ENDPOINT = '/subscribe';
  const REQUEST_URL = buildUrl(SCORE_ENDPOINT);

  // Try and make the request
  try {
    const response = await axios.post(REQUEST_URL, REQUEST_BODY);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
