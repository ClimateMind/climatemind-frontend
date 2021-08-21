import { Grid } from '@material-ui/core';
import React from 'react';
import { useConversations } from '../hooks/useConversations';
import { ConversationCard } from './ConversationCard';
import PageContent from './PageContent';
import PageTitle from './PageTitle';

export function ConversationsList() {
  const { conversations } = useConversations();

  return (
    <PageContent>
      <PageTitle>Conversations</PageTitle>

      <Grid
        container
        direction="column"
        // justifyContent="space-between"
        alignItems="center"
      >
        {conversations?.map((conversation) => (
          <Grid item style={{ width: '100%' }}>
            <ConversationCard conversation={conversation} />
          </Grid>
        ))}
      </Grid>
    </PageContent>
  );
}

export default ConversationsList;
