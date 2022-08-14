import { TSharedSolution } from '../types/SharedSolutions';
import { climateApi } from './apiHelper';

export type TSharedSolutionsResponse = {
  climateSolutions: TSharedSolution[];
  userAName: string;
  userBName: string;
};

const getSharedSolutions = async (
  alignmentId: string
): Promise<TSharedSolutionsResponse> => {
  // Set up the call
  const ALIGNMENT_BASE = '/alignment';
  const SHARED_SOLUTIONS_ENDPOINT = 'shared-solutions';
  const REQUEST_URL = `${ALIGNMENT_BASE}/${alignmentId}/${SHARED_SOLUTIONS_ENDPOINT}`;
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

export default getSharedSolutions;
