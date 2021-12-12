import { climateApi } from './apiHelper';

export type PostAlignmentResponse = {
  alignmentId: string;
};

export const getAlignment = async (
  alignmentId: string
): Promise<PostAlignmentResponse> => {
  // Set up the call
  const ALIGMENT_ENDPOINT = `/alignment/${1234}`;
  try {
    // Call the api
    const response = await climateApi.get(ALIGMENT_ENDPOINT);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};
