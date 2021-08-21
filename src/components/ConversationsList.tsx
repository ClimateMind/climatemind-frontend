import React from 'react';
import { Grid } from '@material-ui/core';
import { ConversationCard } from './ConversationCard';
import { useConversations } from '../hooks/useConversations';

export function ConversationsList() {
  const { conversations } = useConversations();

  return (
    <Grid
      container
      direction="column"
      // justifyContent="space-between"
      alignItems="center"
      style={{ border: '1px solid black' }}
    >
      {conversations.map((conversation) => (
        <Grid item xs={6} style={{ border: '1px solid red' }}>
          <ConversationCard conversation={conversation} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ConversationsList;
