import { climateApi } from './apiHelper';

export type TChoosenSharedSolution = {
  solutionId: string;
};

interface payload {
  solutionIds: TChoosenSharedSolution[];
  alignmentScoresId: string;
}

type TPostSharedSolutionsResponse = {
  message: string;
};

export async function postSharedSolutions(
  data: payload
): Promise<TPostSharedSolutionsResponse> {
  // Request body for Submission
  const { solutionIds, alignmentScoresId } = data;
  const REQUEST_BODY = {
    sharedSolutions: solutionIds,
  };
  // const REQUEST_URL = `/user-b/${conversationId}`; // alignment/:alignmentScoresId/shared-impacts
  const ALIGNMENT_BASE = '/alignment';
  const SHARED_SOLUTIONS_ENDPOINT = 'shared-solutions';
  const REQUEST_URL = `${ALIGNMENT_BASE}/${alignmentScoresId}/${SHARED_SOLUTIONS_ENDPOINT}`;

  // Try and make the request
  try {
    const response = await climateApi.post(REQUEST_URL, REQUEST_BODY);
    const data = await response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
