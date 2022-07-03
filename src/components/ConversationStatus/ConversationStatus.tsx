import React from 'react';
import { TConversationState } from '../../types/Conversation';
import { Typography } from '@material-ui/core';

export type ConversationStatusProps = {
  status: TConversationState;
  userBName: string | undefined;
};

export const ConversationStatus: React.FC<ConversationStatusProps> = ({
  status,
  userBName = 'unkown user',
}) => {
  const statusTextMap: { [key in TConversationState]: string } = {
    0: `Invited ${userBName} to talk`,
    1: `Ready to talk with ${userBName}`,
    2: `Ready to talk with ${userBName}`,
    3: `Ready to talk with ${userBName}`,
    4: `Conversation Completed with ${userBName}, You Rock!`,
    5: `Conversation Completed with ${userBName}, You Rock!`,
  };

  return (
    <Typography color="textSecondary" gutterBottom>
      {statusTextMap[status] || 'Conversation Status Unknown'}
    </Typography>
  );
};
