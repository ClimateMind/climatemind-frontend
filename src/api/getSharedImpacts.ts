import { TSharedImpact } from '../types/SharedImpacts';
import { climateApi } from './apiHelper';

export type TSharedImpactsResponse = {
  climateEffects: TSharedImpact[];
  userAName: string;
  userBName: string;
};

const getSharedImpacts = async (
  alignmentId: string
): Promise<TSharedImpactsResponse> => {
  // Set up the call
  const ALIGNMENT_BASE = '/alignment';
  const SHARED_IMPACTS_ENDPOINT = 'shared-impacts';
  const REQUEST_URL = `${ALIGNMENT_BASE}/${alignmentId}/${SHARED_IMPACTS_ENDPOINT}`;
  try {
    // Call the api
    const response = await climateApi.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};

export default getSharedImpacts;
