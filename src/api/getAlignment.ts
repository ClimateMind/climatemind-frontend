import { climateApi } from './apiHelper';
import { TAlignment } from '../types/Aligment';

export const getAlignment = async (
  alignmentScoresId: string
): Promise<TAlignment> => {
  // Set up the call
  const ALIGMENT_ENDPOINT = `/alignment/${alignmentScoresId}`;
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
