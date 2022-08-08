import { TSharedImpactDetails } from '../types/SharedImpactDetails';
import { climateApi } from './apiHelper';

const getImpactDetails = async (
  impactIri: string
): Promise<TSharedImpactDetails> => {
  // Set up the call to /alignment/shared-impact/:impactIri
  const ALIGNMENT_BASE = '/alignment';
  const SHARED_IMPACT_ENDPOINT = 'shared-impact';
  const REQUEST_URL = `${ALIGNMENT_BASE}/${SHARED_IMPACT_ENDPOINT}/${impactIri}`;
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

export default getImpactDetails;
