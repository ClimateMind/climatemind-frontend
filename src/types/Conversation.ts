export type Conversation = {
  invitedUserName: string;
  createdByUserId: string;
  createdDateTime: string;
  conversationId: string;
};

export type ConversationList = {
  conversations: Conversation[];
};
