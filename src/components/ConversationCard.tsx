import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { TConversation } from '../types/Conversation';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ConversationStatus } from './ConversationStatus';

export type ConversationCardProps = {
  conversation: TConversation;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: '0 0 2em',
      width: '100%',
    },
  })
);

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
}) => {
  const { invitedUserName, conversationStatus } = conversation;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.root}>
        <ConversationStatus status={conversationStatus} />
        <Typography variant="h6" component="h6">
          {invitedUserName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
