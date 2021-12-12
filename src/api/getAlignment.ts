import { climateApi } from './apiHelper';
import { TSharedValues } from '../types/SharedValues';

export const getAlignment = async (
  alignmentId: string
): Promise<TSharedValues> => {
  // Set up the call
  const ALIGMENT_ENDPOINT = `/alignment/${alignmentId}`;
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
