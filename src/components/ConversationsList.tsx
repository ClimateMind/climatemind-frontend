import React from 'react';
import { ConversationCard } from './ConversationCard';
import { useConversations } from '../hooks/useConversations';

export function ConversationsList() {
  const { conversations } = useConversations();

  return (
    <>
      {conversations.map((conversation) => (
        <ConversationCard conversation={conversation} />
      ))}
    </>
  );
}

export default ConversationsList;
