import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { TConversationState } from '../../types/Conversation';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import ROUTES from '../Router/RouteConfig';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: '0 0 1.5em',
    },
  })
);

export interface ViewSelecteTopicsProps {
  conversationState: TConversationState;
  conversationId: string;
}

export const ViewSelecteTopics: React.FC<ViewSelecteTopicsProps> = ({
  conversationState: conversationStatus,
  conversationId,
}) => {
  const classes = useStyles();
  const { updateConversationState } = useUpdateConversation(conversationId);
  const { push } = useHistory();

  useEffect(() => {
    console.log('conversationStatus', conversationStatus);
    console.log('TConversationState.TopicsViewed', TConversationState.TopicsViewed);
    console.log('isBumpStatus', conversationStatus < TConversationState.TopicsViewed);
    console.log('isButtonEnabled', conversationStatus >= TConversationState.AlignmentViewed);
  },[conversationStatus]);

  // const isButtonDisabled =
  //   conversationStatus < TConversationState.AlignmentViewed;  
  const isBumpStatus = conversationStatus < TConversationState.TopicsViewed;
  const isButtonEnabled = conversationStatus >= TConversationState.AlignmentViewed; 

  // const isButtonShown = conversationStatus <= TConversationState.AlignmentViewed;

  const handleViewSelectedTopics = () => {
    // TODO: Update this to use new update mechanismn
    // if conversation state is below 3 (TConversationState.AlignmentViewed) we update state, 
    // otherwise not
    if(isBumpStatus){
      updateConversationState(3);  
    }
    push(`${ROUTES.USERA_SHARED_FEED}/${conversationId}`);
  };

  return (
    <div>
      {/* {isButtonShown && ( */}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!isButtonEnabled}
          onClick={handleViewSelectedTopics}
        >
          VIEW SELECTED TOPICS
        </Button>
      {/* )} */}

    </div>
  );
};
