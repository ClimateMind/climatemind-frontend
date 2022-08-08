import { TSharedSolutionDetails } from '../types/SharedSolutionDetails';
import { climateApi } from './apiHelper';

const getSolutionDetails = async (
  solutionIri: string
): Promise<TSharedSolutionDetails> => {
  // Set up the call to alignment/shared-solution/:solutionIri
  const ALIGNMENT_BASE = '/alignment';
  const SHARED_SOLUTION_ENDPOINT = 'shared-solution';
  const REQUEST_URL = `${ALIGNMENT_BASE}/${SHARED_SOLUTION_ENDPOINT}/${solutionIri}`;
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

export default getSolutionDetails;
