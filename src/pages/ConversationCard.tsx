import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  // TODO: Remove any type
  conversation: any;
};

const ConversationCard: React.FC<Props> = () => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Invited to talk
        </Typography>
        <Typography variant="h6" component="h6">
          Placeholder for user
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
