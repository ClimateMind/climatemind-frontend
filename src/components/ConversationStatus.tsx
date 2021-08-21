import React from 'react';
import { TConversationStatus } from '../types/Conversation';
import { Typography } from '@material-ui/core';

type ConversationStatusProps = {
  status: TConversationStatus;
};

export const ConversationStatus: React.FC<ConversationStatusProps> = ({
  status,
}) => {
  const getStatusText = () => {
    switch (status) {
      case TConversationStatus.Invited:
        return 'Invited to talk';
      case TConversationStatus.Visited:
        return 'Quiz Link Visited';
      case TConversationStatus.QuizCompleted:
        return 'Ready to talk';
      case TConversationStatus.ConversationCompleted:
        return 'Conversation Completed, You Rock!';
      default:
        return 'Conversation Status Unknow';
    }
  };

  return (
    <Typography color="textSecondary" gutterBottom>
      {getStatusText()}
    </Typography>
  );
};
