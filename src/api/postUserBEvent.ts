import { climateApi } from './apiHelper';

type TUserBEventResponse = {
  message: string;
};

export type TPostUserBEventRequest = {
  conversationId: string;
};

export async function postUserBEvent(
  payload: TPostUserBEventRequest
): Promise<TUserBEventResponse> {
  // Request body for Submission
  const { conversationId } = payload;
  // const REQUEST_BODY = {
  //   conversationId: conversationId,
  // };
  // TODO: should we use a request body to post conversationId instead of appending it to url? -> ask backend team
  const REQUEST_BODY = {};
  const REQUEST_URL = `/user-b/${conversationId}`;

  // Try and make the request
  try {
    const response = await climateApi.post(REQUEST_URL, REQUEST_BODY);
    const data = await response.data;
    return data;
  } catch (err) {
    throw err;
  }
}
