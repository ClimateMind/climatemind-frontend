import { climateApi } from './apiHelper';

export type PostAlignmentResponse = {
  alignmentId: string;
};

export type PostAlignmentRequest = {
  conversationId: string;
  quizId: string;
};

export const postAlignment = async (
  payload: PostAlignmentRequest
): Promise<PostAlignmentResponse> => {
  // Set up the call
  const ALIGMENT_ENDPOINT = '/alignment';
  try {
    // Call the api
    const response = await climateApi.post(ALIGMENT_ENDPOINT, payload);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};

export default postAlignment;
