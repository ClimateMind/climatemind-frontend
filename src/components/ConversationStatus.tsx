import React from 'react';
import { TConversationStatus } from '../types/Conversation';
import { Typography } from '@material-ui/core';

type ConversationStatusProps = {
  status: TConversationStatus;
};

// export enum TConversationStatus {
//   UserBInvited = 0,
//   UserBConsented = 1,
//   AlignmentViewed = 2,
//   TopicsViewed = 3,
//   Talked = 4,
//   RatingDone = 5,
// }

export const ConversationStatus: React.FC<ConversationStatusProps> = ({
  status,
}) => {
  const getStatusText = () => {
    switch (status) {
      case TConversationStatus.UserBInvited:
        return 'Invited to talk';
      case TConversationStatus.UserBConsented ||
        TConversationStatus.AlignmentViewed ||
        TConversationStatus.TopicsViewed:
        return 'Ready to talk';
      case TConversationStatus.Talked:
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
