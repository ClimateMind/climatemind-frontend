import { Http, HttpResponse } from "@capacitor-community/http"
import { TAlignment } from "../types/Aligment";
import { TConversation } from "../types/Conversation";
import { TPersonalValues } from "../types/PersonalValues";
import { TSelectedTopics } from "../types/SelectedTopics";
import { TSharedImpactDetails } from "../types/SharedImpactDetails";
import { TSharedSolutionDetails } from "../types/SharedSolutionDetails";
import { TSummary } from "../types/Summary";
import { TQuestions } from "../types/types";
import * as requests from "./requests";
import * as responses from "./responses";
import { getAppSetting } from "../getAppSetting";

export const buildUrl = (endpoint: string) => {
  const API_HOST = getAppSetting('REACT_APP_API_URL');
  const URL = `${API_HOST}${endpoint}`;
  return URL;
};

export const buildReactUrl = (endpoint: string) => {
  const currentUrl = new URL(window.location.href);
  const url = `${currentUrl.protocol}//${currentUrl.host}/`;

  return url + endpoint;
};

const apiCall = async (
  method: string,
  endpoint: string,
  headers: {[k: string]: string},
  data?: any,
): Promise<HttpResponse> => {
  let response: HttpResponse;
  
  if (data) {
      response = await Http.request({
        method,
        url: buildUrl(endpoint),
        headers,
        data
      });
  } else {
    response = await Http.request({
      method,
      url: buildUrl(endpoint),
      headers
    });
  }

  return response;
}

export class ClimateApi {
  private headers: {[k: string]: string} = {};

  constructor(private sessionId: string | null, private accessToken: string) {
    if (this.accessToken) {
      this.headers.Authorization = `Bearer ${this.accessToken}`;
    }

    if (this.sessionId) {
      this.headers['X-Session-Id'] = this.sessionId;
    }

    this.headers['Content-Type'] = 'application/json';
  }

  //#region User Endpoints

  public async postRegister(data: requests.PostRegisterRequest): Promise<responses.PostRegisterResponse> {
    const response = await apiCall('POST', '/register', this.headers, data);
    return response.data;
  }
  
  public async postLogin(data: requests.PostLoginRequest): Promise<responses.PostLoginResponse> {
    const response = await apiCall('POST', '/login', this.headers, data);
    return response.data;
  }

  public async postLogout(): Promise<{ message: string }> {
    const response = await apiCall('POST', '/logout', this.headers);
    return response.data;
  }
  
  public async postRefresh(): Promise<responses.PostRefreshResponse> {
    const response = await apiCall('POST', '/refresh', this.headers);
    return response.data;
  }
  
  public async getPasswordResetLink(passwordResetLinkUuid: string): Promise<responses.GetPasswordResetLinkResponse> {
    const response = await apiCall('GET', `/password-reset/${passwordResetLinkUuid}`, this.headers);
    return response.data;
  }

  public async postPasswordResetLink(email: string): Promise<{ message: string }> {
    const response = await apiCall('POST', '/password-reset', this.headers, { email });
    return response.data;
  }

  public async putPasswordResetLink(data: requests.PutPasswordResetLinkRequest): Promise<responses.PutPasswordResetLinkResponse> {
    const body = {
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    }
    
    const response = await apiCall('PUT', `/password-reset/${data.passwordResetLinkUuid}`, this.headers, body);
    return response.data;
  }

  public async putPassword(data: requests.PutPasswordRequest): Promise<responses.PutPasswordResponse> {
    const response = await apiCall('PUT', '/user-account', this.headers, data);
    return response.data;
  }

  public async postZipcode(data: requests.PostZipcodeRequest): Promise<responses.PostZipcodeResponse> {
    const response = await apiCall('POST', 'post-code', this.headers, data);
    return response.data;
  }

  //#endregion
  
  //#region Conversation Endpoints

  public async getOneConversation(conversationId: string): Promise<TConversation> {
    const response = await apiCall('GET', `/conversation/${conversationId}`, this.headers);
    return response.data;
  }
  
  public async getConversations(): Promise<responses.GetConversationsResponse> {
    const response = await apiCall('GET', '/conversations', this.headers);
    return response.data;
  }
  
  public async postConversation(invitedUserName: string): Promise<responses.PostConversationResponse> {
    const response = await apiCall('POST', '/conversation', this.headers, { invitedUserName });
    return response.data;
  }
  
  public async postConversationConsent(conversationId: string): Promise<{ message: string }> {
    const response = await apiCall('POST', `/conversation/${conversationId}/consent`, this.headers);
    return response.data;
  }
  
  public async putOneConversation(data: requests.PutOneConversationRequest): Promise<TConversation> {    
    const response = await apiCall('PUT', `/conversation/${data.conversationId}`, this.headers, data.updatedConversation);
    return response.data;
  }
  
  public async deleteConversation(conversationId: string): Promise<responses.DeleteConversationResponse> {
    const response = await apiCall('DELETE', `/conversation/${conversationId}`, this.headers);
    return response.data;
  }

  public async getSelectedTopics(conversationId: string): Promise<TSelectedTopics> {
    const response = await apiCall('GET', `/conversation/${conversationId}/topics`, this.headers);
    return response.data;
  }

  //#endregion

  //#region Alignment Endpoints

  public async getAlignment(alignmentScoresId: string): Promise<TAlignment> {
    const response = await apiCall('GET', `/alignment/${alignmentScoresId}`, this.headers);
    return response.data;
  }
  
  public async postAlignment(conversationId: string, quizId: string | null): Promise<responses.PostAlignmentResponse> {
    const response = await apiCall('POST', '/alignment', this.headers, { conversationId, quizId });
    return response.data;
  }
  
  public async getImpactDetails(impactIri: string): Promise<TSharedImpactDetails> {
    const response = await apiCall('GET', `/alignment/shared-impact/${impactIri}`, this.headers);
    return response.data;
  }

  public async getSharedImpacts(alignmentId: string): Promise<responses.GetSharedImpactsResponse> {
    const response = await apiCall('GET', `/alignment/${alignmentId}/shared-impacts`, this.headers);
    return response.data;
  }

  public async postSharedImpacts(data: requests.PostSharedImpactsRequest): Promise<{ message: string }> {
    const body = {
      sharedImpacts: [
        {
          effectId: data.effectId,
        },
      ],
    };

    const response = await apiCall('POST', `/alignment/${data.alignmentScoresId}/shared-impacts`, this.headers, body);
    return response.data;
  }

  public async getSharedSolutions(alignmentId: string): Promise<responses.GetSharedSolutionsResponse> {
    const response = await apiCall('GET', `/alignment/${alignmentId}/shared-solutions`, this.headers);
    return response.data;
  }

  public async postSharedSolutions(data: requests.PostSharedSolutionsRequest): Promise<{ message: string }> {
    const body = {
      sharedSolutions: data.solutionIds,
    };
    
    const response = await apiCall('POST', `/alignment/${data.alignmentScoresId}/shared-solutions`, this.headers, body);
    return response.data;
  }

  public async getSolutionDetails(solutionIri: string): Promise<TSharedSolutionDetails> {
    const response = await apiCall('GET', `/alignment/shared-solution/${solutionIri}`, this.headers);
    return response.data;
  }

  public async getSummary(alignmentScoresId: string): Promise<TSummary> {
    const response = await apiCall('GET', `/alignment/${alignmentScoresId}/summary`, this.headers);
    return response.data;
  }
  
  //#endregion

  //#region Myth Endpoints

  public async getOneMyth(iri: string): Promise<responses.GetOneMyth> {
    const response = await apiCall('GET', `/myths/${iri}`, this.headers);
    return response.data;
  }
  
  public async getMyths(): Promise<responses.GetMythsResponse> {
    const response = await apiCall('GET', '/myths', this.headers);
    return response.data;
  }

  //#endregion
  
  //#region Miscellaneous Endpoints

  public async postUserBVisit(conversationId: string): Promise<{ message: string }> {
    const response = await apiCall('POST', `/user-b/${conversationId}`, this.headers);
    return response.data;
  }
  
  public async postSubscriber(data: requests.PostSubscriberRequest): Promise<responses.PostSubscriberResponse> {   
    const response = await apiCall('POST', '/subscribe', this.headers, data);
    return response.data;
  }
  
  public async postSession(): Promise<responses.PostSessionResponse> {
    const response = await apiCall('POST', '/session', this.headers);
    return response.data;
  }
  
  public async postScores(data: requests.PostScoresRequest): Promise<responses.PostScoresResponse> {
    let body;
    if (data.isUserB) {
      body = data;
    } else {
      body = { questionResponses: data.questionResponses };
    }
    
    const response = await apiCall('POST', '/scores', this.headers, body);
    return response.data;
  }
  
  public async postFeedback(text: string): Promise<{ message: string }> {
    const response = await apiCall('POST', '/feedback', this.headers, { text });
    return response.data;
  }
  
  public async getSolutions(quizId: string): Promise<responses.GetSolutionsResponse> {
    const response = await apiCall('GET', `/solutions?quizId=${quizId}`, this.headers);
    return response.data;
  }
  
  public async getQuestions(): Promise<TQuestions> {
    const response = await apiCall('GET', '/questions', this.headers);
    return response.data;
  }

  public async getQuizId(): Promise<responses.GetQuizIdResponse> {
    const response = await apiCall('GET', '/quizId', this.headers);
    return response.data;
  }
  
  public async getPersonalValues(quizId: string): Promise<TPersonalValues> {
    const response = await apiCall('GET', `/personal_values?quizId=${quizId}`, this.headers);
    return response.data;
  }
  
  public async getFeed(quizId: string): Promise<responses.GetFeedResponse> {
    const response = await apiCall('GET', `/feed?quizId=${quizId}`, this.headers);
    return response.data;
  }
  
  //#endregion
}