import { useNavigate } from 'react-router-dom';

import ROUTES from '../../../router/RouteConfig';
import { TConversationState } from '../../../types/Conversation';
import { useUpdateConversation } from '../../../hooks/useUpdateConversation';
import { CmButton } from 'shared/components';

interface Props {
  conversationState: TConversationState;
  conversationId: string;
  style?: React.CSSProperties;
}

function ViewSelectedTopics({ conversationState: conversationStatus, conversationId, style }: Props) {
  const { updateConversationState } = useUpdateConversation(conversationId);
  const navigate = useNavigate();

  const isBumpStatus = conversationStatus < TConversationState.TopicsViewed;
  const isButtonEnabled =
    conversationStatus >= TConversationState.AlignmentViewed;

  const handleViewSelectedTopics = () => {
    // if conversation state is below 3 (TConversationState.AlignmentViewed) we update state,
    // otherwise not
    if (isBumpStatus) {
      updateConversationState(3);
    }
    navigate(`${ROUTES.USERA_SHARED_FEED_PAGE}/${conversationId}`, {
      state: { from: `${ROUTES.CONVERSATIONS_PAGE}`, id: conversationId },
    });
  };

  return (
    <CmButton
      text='VIEW SELECTED TOPICS'
      onClick={handleViewSelectedTopics}
      disabled={!isButtonEnabled}
      style={style}
    />
  );
}

export default ViewSelectedTopics;
