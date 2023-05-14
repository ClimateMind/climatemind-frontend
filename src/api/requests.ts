import { TConversationState } from "../types/Conversation";
import { TResponse } from "../types/types";

type TChoosenSharedSolution = {
  solutionId: string;
};

export type PostRegisterRequest = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  quizId: string | null;
};

export type PostScoresRequest = {
  questionResponses: {
    SetOne: TResponse[],
    SetTwo: TResponse[],
  },
  isUserB?: boolean,
}

export type PostSharedImpactsRequest = {
  effectId: string;
  alignmentScoresId: string;
}

export type PostSharedSolutionsRequest = {
  solutionIds: TChoosenSharedSolution[];
  alignmentScoresId: string;
}

export type PostSubscriberRequest = {
  email: string;
  sessionId: string | null;
}

export type PostZipcodeRequest = {
  postCode: string | null;
  quizId: string | null;
}

export type PutPasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type PutPasswordResetLinkRequest = {
  passwordResetLinkUuid: string;
  newPassword: string;
  confirmPassword: string;
};

export type PutOneConversationRequest = {
  conversationId: string;
  updatedConversation: {
    state?: TConversationState;
    receiverName?: string;
    userARating?: number;
  }
}

export type PostLoginRequest = {
  email: string;
  password: string;
  recaptchaToken: string;
}
