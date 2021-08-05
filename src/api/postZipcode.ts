import axios from 'axios';
import { buildUrl } from './apiHelper';

interface Response {
  message: string;
  postCode: string;
  quizId: string;
}
interface payload {
  postCode: string | null;
  quizId: string | null;
}

export async function postZipcode(data: payload): Promise<Response> {
  const { postCode, quizId } = data;
  // Request body for Submission
  const REQUEST_BODY = {
    postCode: postCode,
    quizId: quizId,
  };

  // Build the correct url
  const ZIPCODE_ENDPOINT = '/post-code';
  const REQUEST_URL = buildUrl(ZIPCODE_ENDPOINT);

  // Try and make the request
  try {
    const response = await axios.post(REQUEST_URL, REQUEST_BODY);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
