import React, { useState } from 'react';
import {
  Button,
  Box,
  Collapse,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { TConversationState } from '../../types/Conversation';

export interface ConversationCardActionsProps {
  state?: TConversationState;
}

export const ConversationCardActions: React.FC<
  ConversationCardActionsProps
> = ({ children, state }) => {
  const [isVisbile, setIsVisible] = useState(false);

  const handleToggleCollapse = () => setIsVisible(!isVisbile);

  return (
    <Box>
      <Collapse in={isVisbile} unmountOnExit>
        <Box>{children}</Box>
      </Collapse>
      <CardActions>
        <Box>
          <Button onClick={handleToggleCollapse}>
            {isVisbile ? 'LESS' : 'MORE'}
          </Button>
        </Box>
      </CardActions>
    </Box>
  );
};
