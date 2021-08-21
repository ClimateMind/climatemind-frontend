export type TConversation = {
  invitedUserName: string;
  createdByUserId: string;
  createdDateTime: string;
  conversationId: string;
};

export type TConversationList = {
  conversations: TConversation[];
};
