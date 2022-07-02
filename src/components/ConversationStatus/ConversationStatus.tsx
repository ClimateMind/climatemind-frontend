import React from 'react';
import { TConversationStatus } from '../../types/Conversation';
import { Typography } from '@material-ui/core';

export type ConversationStatusProps = {
  status: TConversationStatus;
};

export const ConversationStatus: React.FC<ConversationStatusProps> = ({
  status,
}) => {
  const statusTextMap: { [key in TConversationStatus]: string } = {
    0: 'Invited to talk',
    1: 'Ready to talk',
    2: 'Ready to talk',
    3: 'Ready to talk',
    4: 'Conversation Completed, You Rock!',
    5: 'Conversation Completed, You Rock!',
  };

  return (
    <Typography color="textSecondary" gutterBottom>
      {statusTextMap[status] || 'Conversation Status Unknown'}
    </Typography>
  );
};
