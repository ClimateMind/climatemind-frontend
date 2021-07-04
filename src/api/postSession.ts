import axios from 'axios';

export interface SessionResponse {
  sessionId: string;
}

export const postSession = async (): Promise<SessionResponse> => {
  // const REQUEST_URL = buildUrl('/questions');

  try {
    // Call the api
    // TODO: Update to call the real API
    const response = await axios.post('/session');
    const data = response.data;
    console.log({ data });
    return data;
  } catch (err) {
    throw err;
  }
};

export default postSession;
