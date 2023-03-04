import { TConversation } from "../types/Conversation"
import { TMyth, TMyths } from "../types/Myths";
import { TSharedImpact } from "../types/SharedImpacts";
import { TSharedSolution } from "../types/SharedSolutions";
import { TSolutions } from "../types/Solutions";
import { TClimateEffects } from "../types/types";
import { TUser } from "../types/User";

export type DeleteConversationResponse = {
  conversationId: string;
  message: string;
};

export type GetConversationsResponse = {
  conversations: TConversation[];
}

export type GetFeedResponse = {
  climateEffects: TClimateEffects;
}

export type GetOneMyth = {
  myth: TMyth;
}

export type GetMythsResponse = {
  myths: TMyths;
}

export type GetPasswordResetLinkResponse = {
  message?: string;
  error?: string;
}

export type GetQuizIdResponse = {
  quizId: string;
}

export type GetSharedImpactsResponse = {
  climateEffects: TSharedImpact[];
  userAName: string;
  userBName: string;
};

export type GetSharedSolutionsResponse = {
  climateSolutions: TSharedSolution[];
  userAName: string;
  userBName: string;
};

export type GetSolutionsResponse = {
  solutions: TSolutions;
}

export type PostAlignmentResponse = {
  alignmentScoresId: string;
  message: string;
};

export type PostConversationResponse = {
  conversationId: string;
  message: string;
};

export type PostLoginResponse = {
  access_token: string;
  message: string;
  user: TUser;
};

export type PostRefreshResponse = {
  access_token: string;
  message: string;
  user: TUser;
};

export type PostRegisterResponse = {
  access_token: string;
  message: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    user_uuid: string;
  };
};

export type PostScoresResponse = {
  quizId: string;
};

export type PostSessionResponse = {
  sessionId: string;
}

export type PostSubscriberResponse = {
  datetime: string;
  email: string;
  sessionId: string;
  status: string;
}

export type PostZipcodeResponse = {
  message: string;
  postCode: string;
  quizId: string;
}

export type PutPasswordResponse = {
  message: string;
  anyFieldName?: string[];
  anyFieldName1?: string[];
};

export type PutPasswordResetLinkResponse = {
  message?: string;
  error?: string | { field: string[] };
};
