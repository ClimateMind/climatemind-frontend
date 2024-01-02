import { useNavigate, useLocation } from 'react-router-dom';

import { useAlignment } from '../../../hooks/useAlignment';
import { useGetOneConversation } from '../../../hooks/useGetOneConversation';
import { useUpdateConversation } from '../../../hooks/useUpdateConversation';
import { TConversationState } from '../../../types/Conversation';
import ROUTES from '../../../router/RouteConfig';
import { CmButton } from 'shared/components';

interface Props  {
  conversationId: string;
  conversationState: TConversationState;
  style?: React.CSSProperties;
}

function HowYouAlignButton({ conversationState, conversationId, style }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateConversationState } = useUpdateConversation(conversationId);
  const { conversation: data } = useGetOneConversation(conversationId);
  const { setAlignmentScoresId } = useAlignment();

  const handleClick = () => {
    if (conversationState < TConversationState.AlignmentViewed) {
      updateConversationState(2);
    }
    if (data?.alignmentScoresId) {
      setAlignmentScoresId(data.alignmentScoresId);
      navigate(`${ROUTES.SHARED_VALUES_PAGE}/${conversationId}`, {
        state: { from: location.pathname, id: conversationId },
      });
    }
  };

  return (
    <CmButton
      text='SEE HOW YOU ALIGN'
      onClick={handleClick}
      disabled={conversationState === 0}
      style={style}
    />
  );
}

export default HowYouAlignButton;
