/* eslint-disable no-useless-catch */
import { climateApi } from './apiHelper';

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
  const REQUEST_URL = '/post-code';

  // Try and make the request
  try {
    const response = await climateApi.post(REQUEST_URL, REQUEST_BODY);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
