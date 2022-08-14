import { climateApi } from './apiHelper';

type TConversationSubmitResponse = {
  conversationId: string;
  message: string;
};

type InvitedUser = {
  invitedUser: string;
};

export async function submitConversation(
  // invitedUser: InvitedUser,
  invitedUserName: string,
  jwt?: string
): Promise<TConversationSubmitResponse> {
  // Request body for Submission
  const REQUEST_BODY = {
    invitedUserName: invitedUserName,
  };
  console.log('jwt: ', jwt);
  console.log('invitedUserName: ', invitedUserName);
  // Auth token added for logged in user so that the session id can be assigned to the user
  const HEADERS = { Authorization: jwt ? `Brearer ${jwt}` : '' };
  const REQUEST_URL = '/conversation';

  // Try and make the request
  try {
    const response = await climateApi.post(REQUEST_URL, REQUEST_BODY, {
      headers: HEADERS,
    });
    const data = await response.data;
    console.log('postConversations: ', data);
    return data;
  } catch (err) {
    throw err;
  }
}
