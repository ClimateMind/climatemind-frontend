import { Grid } from '@material-ui/core';
import React from 'react';
import { useConversations } from '../hooks/useConversations';
import { ConversationCard } from './ConversationCard';
import PageContent from './PageContent';
import PageTitle from './PageTitle';
import Loader from './Loader';
import Error500 from '../pages/Error500';

export function ConversationsList() {
  const { conversations, isLoading, isError } = useConversations();

  if (isError) return <Error500 />;

  return (
    <PageContent>
      <PageTitle>Conversations</PageTitle>
      <Grid
        container
        direction="column"
        // justifyContent="space-between"
        alignItems="center"
      >
        {isLoading && <Loader />}
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
