// The properties marked as optional are not present on get many conversations but are on get one.
export type TConversation = {
  // createdByUserId: string;
  // createdDateTime: string;
  conversationId: string;
  state: TConversationState;
  consent?: boolean;
  userARating: number | null;
  userA?: {
    id: string;
    name: string;
    sessionId: string;
  };
  userB?: {
    name: string;
  };
  alignmentScoresId?: string;
};

export enum TConversationState {
  UserBInvited = 0,
  UserBConsented = 1,
  AlignmentViewed = 2,
  TopicsViewed = 3,
  Talked = 4,
  RatingDone = 5,
}

export type TConversationRating = 1 | 2 | 3 | 4 | 5 | null;

export type TConversationList = {
  conversations: TConversation[];
};
