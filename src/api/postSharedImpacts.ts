import { climateApi } from './apiHelper';

type TChoosenSharedImpact = {
  effectId: string;
  alignmentId: string;
};

interface payload {
  effectId: string;
  alignmentScoresId: string;
}

type TPostSharedImpactsResponse = {
  message: string;
};

export async function postSharedImpacts(
  data: payload
): Promise<TPostSharedImpactsResponse> {
  // Request body for Submission
  const { effectId, alignmentScoresId } = data;
  const REQUEST_BODY = {
    sharedImpacts: [
      {
        effectId: effectId,
      },
    ],
  };
  // const REQUEST_URL = `/user-b/${conversationId}`; // alignment/:alignmentScoresId/shared-impacts
  const ALIGNMENT_BASE = '/alignment';
  const SHARED_IMPACTS_ENDPOINT = 'shared-impacts';
  const REQUEST_URL = `${ALIGNMENT_BASE}/${alignmentScoresId}/${SHARED_IMPACTS_ENDPOINT}`;

  // Try and make the request
  try {
    const response = await climateApi.post(REQUEST_URL, REQUEST_BODY);
    const data = await response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
