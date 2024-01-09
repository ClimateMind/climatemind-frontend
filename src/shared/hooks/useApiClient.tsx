import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout, setAccessToken } from 'features/auth';
import { useToastMessage } from 'shared/hooks';
import * as requests from 'api/requests';
import * as responses from 'api/responses';
import { ClimateEffect, Solution, Myth } from 'shared/types';
import { getAppSetting } from 'getAppSetting';

const baseUrl = getAppSetting('REACT_APP_API_URL');

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
  const { showErrorToast } = useToastMessage()
  // const { logout } = useLogout();
  
  const sessionId = useAppSelector((state) => state.auth.sessionId);
  const quizId = useAppSelector((state) => state.auth.user.quizId);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  async function apiCall<T>(method: string, endpoint: string, headers: { [key: string]: string }, data?: any) {
    if (headers['Authorization']) {
      const token = headers['Authorization'].split(' ')[1];
      if (!validateToken(token)) {
        const response = await postRefresh();
        headers['Authorization'] = 'Bearer ' + response.access_token;
      }
    }

    const response = await axios.request<T>({
      url: baseUrl + endpoint,
      method,
      headers,
      data,
    });

    return response;
  }

  async function postSession() {
    try {
      const response = await apiCall<responses.PostSession>('post', '/session', {});
      return response.data;
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

    const response = await apiCall<responses.PostScores>(
      'post',
      '/scores',
      {
        'X-Session-Id': sessionId,
      },
      { questionResponses: quizAnswers }
    );

    return response.data;
  }

  async function postFeedback(text: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    await apiCall(
      'post',
      '/feedback',
      {
        'X-Session-Id': sessionId,
      },
      { text }
    );
  }

  async function getPersonalValues(quizId: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (quizId === '') {
      throw new Error('Missing quizId');
    }

    const response = await apiCall<responses.GetPersonalValues>(
      'get',
      '/personal_values?quizId=' + quizId,
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data;
  }

  async function postRegister({ firstName, lastName, email, password, quizId }: requests.PostRegister) {
    const response = await apiCall<responses.PostRegister>(
      'post',
      '/register',
      {},
      { firstName, lastName, email, password, quizId }
    );

    return response.data;
  }

  async function deleteAccount(password: string) {
    const response = await apiCall(
      'delete',
      '/user-account',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
      { currentPassword: password }
    );

    return response.data;
  }

  async function postLogin(email: string, password: string, recaptchaToken?: string) {
    const body = {
      email,
      password,
      // Use the recaptcha token if it exists, otherwise skip the captcha
      ...(recaptchaToken ? { recaptchaToken } : { skipCaptcha: true }),
    };

    const response = await apiCall<responses.Login>('post', '/login', {}, body);

    // Store the refresh token in AsyncStorage
    const cookieHeader = response.headers['set-cookie'];
    if (cookieHeader) {
      const refreshToken = cookieHeader[0].split(';')[0].split('=')[1];
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  }

  async function postLogout() {
    await apiCall('post', '/logout', {
      'X-Session-Id': sessionId,
    });
  }

  async function postRefresh() {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await apiCall<{ access_token: string }>(
        'post',
        '/refresh',
        {
          'X-Session-Id': sessionId,
          'Cookie': 'refreshToken=' + refreshToken,
        },
      );

      // Update the auth token in the store
      dispatch(setAccessToken(response.data.access_token));

      // Store the refresh token in AsyncStorage
      const cookieHeader = response.headers['set-cookie'];
      if (cookieHeader) {
        const refreshToken = cookieHeader[0].split(';')[0].split('=')[1];
        localStorage.setItem('refreshToken', refreshToken);
      }

      return response.data;
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logout());
          // logout();
          showErrorToast('Your session has expired. Please login again.');
        }
      }

      return { access_token: '' };
    }
  }

  async function checkPasswordResetLink(passwordResetLinkUuid: string) {
    await apiCall(
      'get',
      '/password-reset/' + passwordResetLinkUuid,
      {}
    );
  }

  async function resetPassword(passwordResetLinkUuid: string, newPassword: string, confirmPassword: string) {
    await apiCall(
      'put',
      '/password-reset/' + passwordResetLinkUuid,
      {},
      { newPassword, confirmPassword }
    );
  }

  async function postPasswordResetLink(email: string) {
    await apiCall(
      'post',
      '/password-reset',
      {
        'X-Session-Id': sessionId,
      },
      { email }
    );
  }

  async function getClimateFeed(): Promise<ClimateEffect[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (quizId === '') {
      throw new Error('Missing quizId');
    }

    const response = await apiCall<{ climateEffects: ClimateEffect[] }>(
      'get',
      '/feed?quizId=' + quizId,
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data.climateEffects;
  }

  async function getSolutionsFeed(): Promise<Solution[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (quizId === '') {
      throw new Error('Missing quizId');
    }

    const response = await apiCall<{ solutions: Solution[] }>(
      'get',
      '/solutions?quizId=' + quizId,
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data.solutions;
  }

  async function getMythsFeed(): Promise<Myth[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    const response = await apiCall<{ myths: Myth[] }>(
      'get',
      '/myths',
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data.myths;
  }

  async function getMyth(mythIri: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    const response = await apiCall<{ myth: Myth }>(
      'get',
      '/myths/' + mythIri,
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data.myth;
  }

  async function putPassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    await apiCall(
      'put',
      '/user-account',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
      { currentPassword, newPassword, confirmPassword }
    );
  }

  async function putEmail(newEmail: string, confirmEmail: string, password: string) {
    await apiCall(
      'put',
      '/email',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
      { newEmail, confirmEmail, password }
    );
  }

  async function createConversationInvite(invitedUserName: string) {
    const response = await apiCall<responses.CreateConversation>(
      'post',
      '/conversation',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
      { invitedUserName }
    );

    return response.data;
  }

  async function getAllConversations() {
    const response = await apiCall<{ conversations: responses.GetAllConversations[] }>(
      'get',
      '/conversations',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
    );

    return response.data;
  }

  async function getConversation(conversationId: string) {
    const response = await apiCall<responses.GetAllConversations>(
      'get',
      '/conversation/' + conversationId,
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
    )

    return response.data;
  }

  async function deleteConversation(conversationId: string) {
    await apiCall(
      'delete',
      '/conversation/' + conversationId,
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
    );    
  }

  async function putSingleConversation(data: requests.PutSingleConversation) {
    try {
      await apiCall(
        'put',
        '/conversation/' + data.conversationId,
        {
          'X-Session-Id': sessionId,
          'Authorization': 'Bearer ' + user.accessToken,
        },
        data.updatedConversation
      );
    } catch {}
  }

  async function getAlignmentScores(alignmentScoresId: string): Promise<responses.GetAlignmentScores> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId');
    }

    const response = await apiCall<responses.GetAlignmentScores>(
      'get',
      '/alignment/' + alignmentScoresId,
      {
        'X-Session-Id': sessionId,
      }
    );

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

    const response = await apiCall<{ alignmentScoresId: string }>(
      'post',
      '/alignment',
      {
        'X-Session-Id': sessionId,
      },
      { conversationId, quizId }
    );

    return response.data;
  }

  async function getSelectedTopics(conversationId: string): Promise<responses.GetSelectedTopics> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!conversationId) {
      throw new Error('Missing conversationId');
    }

    const response = await apiCall<responses.GetSelectedTopics>(
      'get',
      '/conversation/' + conversationId + '/topics',
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data;
  }

  async function getSharedImpacts(alignmentId: string): Promise<responses.GetSharedImpacts> {
    const response = await apiCall<responses.GetSharedImpacts>(
      'get',
      '/alignment/' + alignmentId + '/shared-impacts',
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data;
  }

  async function getSharedImpactDetails(impactId: string): Promise<responses.GetSharedImpactDetails> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!impactId) {
      throw new Error('Missing impactId');
    }

    const response = await apiCall<responses.GetSharedImpactDetails>(
      'get',
      '/alignment/shared-impact/' + impactId,
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data;
  }

  async function postSharedImpacts(alignmentScoresId: string, sharedImpacts: { effectId: string }[]) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId');
    }

    await apiCall(
      'post',
      '/alignment/' + alignmentScoresId + '/shared-impacts',
      {
        'X-Session-Id': sessionId,
      },
      { sharedImpacts }
    );
  }

  async function getSharedSolutions(alignmentId: string): Promise<responses.GetSharedSolutions> {
    const response = await apiCall<responses.GetSharedSolutions>(
      'get',
      '/alignment/' + alignmentId + '/shared-solutions',
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data;
  }

  async function getSharedSolutionDetails(solutionId: string): Promise<responses.GetSharedSolutionDetails> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!solutionId) {
      throw new Error('Missing solutionId');
    }

    const response = await apiCall<responses.GetSharedSolutionDetails>(
      'get',
      '/alignment/shared-solution/' + solutionId,
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data;
  }

  async function postSharedSolutions(alignmentScoresId: string, sharedSolutions: { solutionId: string }[]) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId');
    }

    await apiCall(
      'post',
      '/alignment/' + alignmentScoresId + '/shared-solutions',
      {
        'X-Session-Id': sessionId,
      },
      { sharedSolutions }
    );
  }

  async function getAlignmentSummary(alignmentScoresId: string): Promise<responses.GetAlignmentSummary> {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId');
    }

    const response = await apiCall<responses.GetAlignmentSummary>(
      'get',
      '/alignment/' + alignmentScoresId + '/summary',
      {
        'X-Session-Id': sessionId,
      }
    );

    return response.data;
  }

  async function postConversationConsent(conversationId: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!conversationId) {
      throw new Error('Missing conversationId');
    }

    await apiCall(
      'post',
      '/conversation/' + conversationId + '/consent',
      {
        'X-Session-Id': sessionId,
      },
      { consent: true },
    );
  }

  async function postUserBVisit(conversationId: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId');
    }

    if (!conversationId) {
      throw new Error('Missing conversationId');
    }

    apiCall( 'post', '/user-b/' + conversationId, { 'X-Session-Id': sessionId, });
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

    postUserBVisit,
  };
}

export default useApiClient;
