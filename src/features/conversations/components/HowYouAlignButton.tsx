import { useNavigate, useLocation } from 'react-router-dom';

import { TConversationState } from 'types/Conversation';
import ROUTES from '../../../router/RouteConfig';
import { CmButton } from 'shared/components';
import { useConversation, useUpdateConversation } from '../hooks';

interface Props {
  conversationId: string;
  conversationState: TConversationState;
  style?: React.CSSProperties;
}

function HowYouAlignButton({ conversationState, conversationId, style }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateConversation } = useUpdateConversation();
  const { conversation } = useConversation(conversationId);

  const handleClick = () => {
    if (conversationState < TConversationState.AlignmentViewed) {
      updateConversation(conversationId, { state: 2 });
    }
    if (conversation?.alignmentScoresId) {
      navigate(`${ROUTES.SHARED_VALUES_PAGE}/${conversationId}`, {
        state: { from: location.pathname, id: conversationId, scrollPosition: window.scrollY },
      });
    }
  };

  return <CmButton text="SEE HOW YOU ALIGN" onClick={handleClick} disabled={conversationState === 0} style={style} />;
}

export default HowYouAlignButton;
