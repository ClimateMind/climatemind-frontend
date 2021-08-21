const dummyData = {
  conversations: [
    {
      invitedUserName: 'Sean',
      createdByUserId: 'be522407-31f9-4c27-af04-e5d9cace701f',
      createdDateTime: 'YYYY-DD-MM HH:MM:SS',
      conversationId: '91be0c17-0155-4a4d-9faf-f8b7dcd12b51',
    },
    {
      invitedUserName: 'Nick',
      createdByUserId: 'd0515ae7-36d4-4642-8949-d0c081ff40cf',
      createdDateTime: 'YYYY-DD-MM HH:MM:SS',
      conversationId: '91be0c17-0155-4a4d-9faf-f8b7dcd12b51',
    },
  ],
};

export function useConversations() {
  // TODO: Get the real conversations from the api
  const conversations = dummyData.conversations;

  const addConversation = () => {
    // TODO: Implement adding a conversation
  };

  return {
    conversations,
    addConversation,
  };
}
