import React from 'react';
import { TConversationState } from '../../types/Conversation';
import { Typography } from '@material-ui/core';

export type ConversationStatusProps = {
  state: TConversationState;
  userBName: string | undefined;
  isExpanded: boolean;
};

export const ConversationState: React.FC<ConversationStatusProps> = ({
  state,
  userBName = 'unkown user',
  isExpanded,
}) => {
  const stateTextMap: { [key in TConversationState]: string } = {
    0: `Invited ${userBName} to talk`,
    1: `Prepare to talk with ${userBName}`,
    2: `Prepare to talk with ${userBName}`,
    3: `Ready to talk with ${userBName}`,
    4: `Talked with ${userBName}`,
    5: `Talked with ${userBName}`,
  };

  if (!isExpanded && state === 5) return null;

  return (
    <Typography color="textSecondary" gutterBottom>
      {stateTextMap[state] || 'Conversation Status Unknown'}
    </Typography>
  );
};
