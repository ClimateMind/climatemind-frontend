// The properties marked as optional are not present on get many conversations but are on get one.
export type TConversation = {
  invitedUserName: string;
  createdByUserId: string;
  createdDateTime: string;
  conversationId: string;
  conversationStatus: TConversationStatus;
  consent?: boolean;
  userA?: {
    id: string;
    name: string;
    sessionId: string;
  };
  userB?: {
    name: string;
  };
};

export enum TConversationStatus {
  Invited = 0,
  Visited = 1,
  QuizCompleted = 2,
  ConversationCompleted = 3,
}

export type TConversationList = {
  conversations: TConversation[];
};
