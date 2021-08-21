export type TConversation = {
  invitedUserName: string;
  createdByUserId: string;
  createdDateTime: string;
  conversationId: string;
  conversationStatus: TConversationStatus;
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
