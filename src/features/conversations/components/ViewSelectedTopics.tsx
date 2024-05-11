import { useLocation, useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { TConversationState } from 'types/Conversation';
import { CmButton } from 'shared/components';
import { useUpdateConversation } from '../hooks';

interface Props {
  conversationState: TConversationState;
  conversationId: string;
  style?: React.CSSProperties;
}

function ViewSelectedTopics({ conversationState, conversationId, style }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { updateConversation } = useUpdateConversation();

  const handleViewSelectedTopics = () => {
    if (conversationState < TConversationState.TopicsViewed) {
      updateConversation(conversationId, { state: 3 });
    }

    navigate(`${ROUTES.USERA_SHARED_FEED_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  return (
    <CmButton
      text='VIEW SELECTED TOPICS'
      onClick={handleViewSelectedTopics}
      disabled={conversationState < TConversationState.AlignmentViewed}
      style={style}
    />
  );
}

export default ViewSelectedTopics;
