import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { useAppSelector } from 'store/hooks';
import { useToastMessage } from 'shared/hooks';
import * as requests from 'api/requests';
import * as responses from 'api/responses';
import { ClimateEffect, Solution, Myth } from 'shared/types';

const baseUrl = process.env.REACT_APP_API_URL;

const validateToken = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds

    const currentTimestamp = Date.now();
    return currentTimestamp < expirationTime; // Return true if the token is not expired
  } catch (error) {
    console.error('Error decoding or validating token:', error);
    return false; // Return false if there's an error in decoding or validating the token
  }
};

function useApiClient() {
  const { showErrorToast } = useToastMessage();
  const sessionId = useAppSelector((state) => state.auth.userA.sessionId);
  const quizId = useAppSelector((state) => state.auth.userA.quizId);

  async function apiCall<T>(method: string, endpoint: string, headers: { [key: string]: string }, data?: any, withCredentials?: boolean, customCookies?: { [key: string]: string }) {
    // Add sessionId to headers
    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }

    // customCookies is used to set cookies (In this instance it is the refresh token) for the request and remove them after the request is done.
    if (customCookies) {
      Object.entries(customCookies).forEach(([key, value]) => {
        Cookies.set(key, value, { secure: true });
      });
    }

    // Get access token from cookies
    let accessToken = Cookies.get('accessToken');
    if (accessToken) {
      // Check if the token is valid
      if (!validateToken(accessToken)) {
        // Attempt to refresh the access token
        const newAccessToken = await handleTokenRefresh();

        // If a new token is received, update it in the cookies and set the Authorization header
        if (newAccessToken) {
          accessToken = newAccessToken;
          Cookies.set('accessToken', accessToken, { secure: true });
        } else {
          showErrorToast('Your session has expired. Please login again.');
          setTimeout(async () => {
            window.location.reload();
          }, 2000); // Add a delay to allow the toast to show before redirecting
        }

        // Set the Authorization header with the valid (or refreshed) token
        headers['Authorization'] = 'Bearer ' + accessToken;
      }
    }

    const response = await axios.request<T>({
      url: baseUrl + endpoint,
      method,
      headers,
      data,
      withCredentials, // Always send credentials unless explicitly set to false
    });

    if (customCookies) {
      Object.keys(customCookies).forEach((key) => {
        Cookies.remove(key);
      });
    }

    return response;
  }

  async function postSession() {
    try {
      const response = await apiCall<responses.PostSession>('post', '/session', {});
      if (response) {
        return response.data;
      }
      throw new Error('Response is undefined');
    } catch (error) {
      console.log(error);
      return { sessionId: '' };
    }
  }

  async function getQuestions() {
    const response = await apiCall<responses.GetQuestions>('get', '/questions', {});
    return response.data;
  }

  async function postScores(quizAnswers: requests.PostScores) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    const response = await apiCall<responses.PostScores>('post', '/scores', {}, { questionResponses: quizAnswers });

    return response.data;
  }

  async function postFeedback(text: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    await apiCall('post', '/feedback', {}, { text });
  }

  async function getPersonalValues(quizId: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (quizId === '') {
      throw new Error('Missing quizId');
    }

    const response = await apiCall<responses.GetPersonalValues>('get', '/personal_values?quizId=' + quizId, {});

    return response.data;
  }

  async function postRegister({ firstName, lastName, email, password, quizId }: requests.PostRegister) {
    const response = await apiCall<responses.PostRegister>('post', '/register', {}, { firstName, lastName, email, password, quizId });
    const accessToken = response.data.access_token;

    // Store the access token for userA in cookies
    if (response) {
      if (!response) {
        throw new Error('Response is undefined');
      }

      Cookies.set('accessToken', accessToken, { secure: true });
    } else {
      throw new Error('Response is undefined');
    }
    Cookies.set('accessToken', accessToken, { secure: true });

    return response.data;
  }

  async function deleteAccount(password: string) {
    const response = await apiCall('delete', '/user-account', {}, { currentPassword: password });

    return response.data;
  }

  async function postLogin(email: string, password: string, isUserA = true) {
    const body = {
      email,
      password,
      skipCaptcha: true,
    };

    const response = await apiCall<responses.Login>('post', '/login', {}, body, true);

    // Store the access token for userA in cookies
    if (isUserA) {
      const accessToken = response.data.access_token;
      Cookies.set('accessToken', accessToken, { secure: true });
    }

    return response.data;
  }

  async function postGoogleLogin(credential: string, quizId: string) {
    const response = await apiCall<responses.googleLogin>('post', '/auth/google', {}, { credential, quizId }, true);
    const { access_token } = response.data;
    Cookies.set('accessToken', access_token, { secure: true });

    return response.data;
  }

  async function postLogout() {
    // Remove the tokens from cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    await apiCall('post', '/logout', {});
  }

  async function handleTokenRefresh(): Promise<string | undefined> {
    const newToken = await postRefresh();

    if (newToken) {
      Cookies.set('accessToken', newToken, { secure: true });
      return newToken;
    } else {
      showErrorToast('Your session has expired. Please login again.');
      setTimeout(async () => {
        window.location.reload();
      }, 2000); // Add a delay to allow the toast to show before redirecting
    }
  }

  async function postRefresh(): Promise<string> {
    // Get the refresh token from cookies
    Cookies.remove('accessToken');

    try {
      const response = await apiCall<{ access_token: string }>('post', '/refresh', {}, {}, true);

      // Update the access token in cookies
      const accessToken = response.data.access_token;
      Cookies.set('accessToken', accessToken, { secure: true });

      return accessToken;
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        if (error.response?.status === 401) {
          // logoutUserA();
          showErrorToast('Your session has expired. Please login again.');
        }
      }

      return '';
    }
  }

  async function checkPasswordResetLink(passwordResetLinkUuid: string) {
    await apiCall('get', '/password-reset/' + passwordResetLinkUuid, {});
  }

  async function resetPassword(passwordResetLinkUuid: string, newPassword: string, confirmPassword: string) {
    await apiCall('put', '/password-reset/' + passwordResetLinkUuid, {}, { newPassword, confirmPassword });
  }

  async function postPasswordResetLink(email: string) {
    await apiCall('post', '/password-reset', {}, { email });
  }

  async function getClimateFeed(): Promise<ClimateEffect[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (quizId === '') {
      throw new Error('Missing quizId');
    }

    const response = await apiCall<{ climateEffects: ClimateEffect[] }>('get', '/feed?quizId=' + quizId, {});

    return response.data.climateEffects;
  }

  async function getSolutionsFeed(): Promise<Solution[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (quizId === '') {
      throw new Error('Missing quizId');
    }

    const response = await apiCall<{ solutions: Solution[] }>('get', '/solutions?quizId=' + quizId, {});

    return response.data.solutions;
  }

  async function getMythsFeed(): Promise<Myth[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    const response = await apiCall<{ myths: Myth[] }>('get', '/myths', {});

    return response.data.myths;
  }

  async function getMyth(mythIri: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    const response = await apiCall<{ myth: Myth }>('get', '/myths/' + mythIri, {});

    return response.data.myth;
  }

  async function putPassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    await apiCall('put', '/user-account', {}, { currentPassword, newPassword, confirmPassword });
  }

  async function putEmail(newEmail: string, confirmEmail: string, password: string) {
    await apiCall('put', '/email', {}, { newEmail, confirmEmail, password });
  }

  async function createConversationInvite(invitedUserName: string) {
    const response = await apiCall<responses.CreateConversation>('post', '/conversation', { Authorization: `Bearer ${Cookies.get('accessToken')}` }, { invitedUserName });

    return response.data;
  }

  async function getAllConversations() {
    const response = await apiCall<{ conversations: responses.GetAllConversations[] }>('get', '/conversations', { Authorization: `Bearer ${Cookies.get('accessToken')}` }, {});

    return response.data;
  }

  async function getConversation(conversationId: string) {
    const response = await apiCall<responses.GetAllConversations>('get', '/conversation/' + conversationId, {});

    return response.data;
  }

  async function deleteConversation(conversationId: string) {
    await apiCall('delete', '/conversation/' + conversationId, { Authorization: `Bearer ${Cookies.get('accessToken')}` });
  }

  async function putSingleConversation(data: requests.PutSingleConversation) {
    try {
      await apiCall('put', '/conversation/' + data.conversationId, {}, data.updatedConversation);
    } catch {}
  }

  async function getAlignmentScores(alignmentScoresId: string): Promise<responses.GetAlignmentScores> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId');
    }

    const response = await apiCall<responses.GetAlignmentScores>('get', '/alignment/' + alignmentScoresId, {});

    return response.data;
  }

  async function postAlignment(conversationId: string, quizId: string): Promise<{ alignmentScoresId: string }> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!conversationId) {
      throw new Error('Missing conversationId');
    }

    if (!quizId) {
      throw new Error('Missing quizId');
    }

    const response = await apiCall<{ alignmentScoresId: string }>('post', '/alignment', {}, { conversationId, quizId });

    return response.data;
  }

  async function getSelectedTopics(conversationId: string): Promise<responses.GetSelectedTopics> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!conversationId) {
      throw new Error('Missing conversationId');
    }

    const response = await apiCall<responses.GetSelectedTopics>('get', '/conversation/' + conversationId + '/topics', {});

    return response.data;
  }

  async function getSharedImpacts(alignmentId: string): Promise<responses.GetSharedImpacts> {
    const response = await apiCall<responses.GetSharedImpacts>('get', '/alignment/' + alignmentId + '/shared-impacts', {});

    return response.data;
  }

  async function getSharedImpactDetails(impactId: string): Promise<responses.GetSharedImpactDetails> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!impactId) {
      throw new Error('Missing impactId');
    }

    const response = await apiCall<responses.GetSharedImpactDetails>('get', '/alignment/shared-impact/' + impactId, {});

    return response.data;
  }

  async function postSharedImpacts(alignmentScoresId: string, sharedImpacts: { effectId: string }[]) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId');
    }

    await apiCall('post', '/alignment/' + alignmentScoresId + '/shared-impacts', {}, { sharedImpacts });
  }

  async function getSharedSolutions(alignmentId: string): Promise<responses.GetSharedSolutions> {
    const response = await apiCall<responses.GetSharedSolutions>('get', '/alignment/' + alignmentId + '/shared-solutions', {});

    return response.data;
  }

  async function getSharedSolutionDetails(solutionId: string): Promise<responses.GetSharedSolutionDetails> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!solutionId) {
      throw new Error('Missing solutionId');
    }

    const response = await apiCall<responses.GetSharedSolutionDetails>('get', '/alignment/shared-solution/' + solutionId, {});

    return response.data;
  }

  async function postSharedSolutions(alignmentScoresId: string, sharedSolutions: { solutionId: string }[]) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId');
    }

    await apiCall('post', '/alignment/' + alignmentScoresId + '/shared-solutions', {}, { sharedSolutions });
  }

  async function getAlignmentSummary(alignmentScoresId: string): Promise<responses.GetAlignmentSummary> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId');
    }

    const response = await apiCall<responses.GetAlignmentSummary>('get', '/alignment/' + alignmentScoresId + '/summary', {});

    return response.data;
  }

  async function postConversationConsent(conversationId: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!conversationId) {
      throw new Error('Missing conversationId');
    }

    await apiCall('post', '/conversation/' + conversationId + '/consent', {}, { consent: true });
  }

  async function postUserBVisit(conversationId: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!conversationId) {
      throw new Error('Missing conversationId');
    }

    apiCall('post', '/user-b/' + conversationId, {});
  }

  return {
    postSession,
    getQuestions,
    postScores,
    postFeedback,
    getPersonalValues,

    postRegister,
    deleteAccount,
    postLogin,
    postGoogleLogin,
    postLogout,
    postRefresh,
    checkPasswordResetLink,
    resetPassword,
    postPasswordResetLink,

    getClimateFeed,
    getSolutionsFeed,
    getMythsFeed,
    getMyth,

    putPassword,
    putEmail,

    createConversationInvite,
    getAllConversations,
    getConversation,
    deleteConversation,
    putSingleConversation,

    getAlignmentScores,
    postAlignment,
    getSelectedTopics,
    getSharedImpacts,
    getSharedImpactDetails,
    postSharedImpacts,
    getSharedSolutions,
    getSharedSolutionDetails,
    postSharedSolutions,
    getAlignmentSummary,
    postConversationConsent,
    handleTokenRefresh,
    postUserBVisit,
  };
}

export default useApiClient;
