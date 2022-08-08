import { TSummary } from '../types/Summary';
import { climateApi } from './apiHelper';

// export type TSharedSolutionsResponse = {
//     climateSolutions: TSharedSolution[];
//     userAName: string;
//     userBName: string;
// };

const getSummary = async (alignmentScoresId: string): Promise<TSummary> => {
  // Set up the call
  const ALIGNMENT_BASE = '/alignment';
  const SUMMARY_ENDPOINT = 'summary';
  const REQUEST_URL = `${ALIGNMENT_BASE}/${alignmentScoresId}/${SUMMARY_ENDPOINT}`;
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

export default getSummary;
