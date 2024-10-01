import { Alignment, ClimateEffect2, ClimateEffect3, Solution2, Solution3 } from 'shared/types';
import { TSharedImpact } from 'types/SharedImpacts';
import { TSharedSolution } from 'types/SharedSolutions';

export type PostSession = {
  sessionId: string;
};

export type GetQuestions = {
  SetOne: { id: number; value: string; question: string }[];
  SetTwo: { id: number; value: string; question: string }[];
};

export type PostScores = {
  quizId: string;
};

export type GetPersonalValues = {
  personalValues: {
    description: string;
    id: string;
    name: string;
    shortDescription: string;
  }[];
  valueScores: {
    personalValue: string;
    score: number;
  }[];
};

export type PostRegister = {
  access_token: string;
  message: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    quiz_id: string;
    user_uuid: string;
  };
};

export type Login = {
  refresh_token: any;
  access_token: string;
  message: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    quiz_id: string;
    user_uuid: string;
  };
};

export type googleLogin = {
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    quiz_id: string;
    user_uuid: string;
  };
};

export type CreateConversation = {
  conversationId: string;
  message: string;
};

export type GetAllConversations = {
  conversationId: string;
  userA: {
    name: string;
    id: string;
    sessionId: string;
  };
  userB: {
    name: string;
  };
  state: number;
  userARating: number;
  consent: boolean;
  conversationTimestamp: string;
  alignmentScoresId: string;
};

export type GetAlignmentScores = {
  userAName: string;
  userBName: string;
  overallSimilarityScore: number;
  topMatchPercent: number;
  valueAlignment: Alignment[];
};

export type GetSelectedTopics = {
  climateEffects: ClimateEffect2[];
  climateSolutions: Solution3[];
};

export type GetSharedImpactDetails = ClimateEffect3;

export type GetSharedSolutionDetails = Solution2;

export type GetSharedImpacts = {
  userAName: string;
  userBName: string;
  climateEffects: TSharedImpact[];
};

export type GetSharedSolutions = {
  userAName: string;
  userBName: string;
  climateSolutions: TSharedSolution[];
};

export type GetAlignmentSummary = {
  userAName: string;
  topMatchValue: string;
  topMatchPercent: string;
  sharedImpacts: string[];
  sharedSolutions: string[];
};
