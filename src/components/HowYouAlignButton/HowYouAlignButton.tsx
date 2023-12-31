import { useNavigate, useLocation } from 'react-router-dom';

import { useAlignment } from '../../hooks/useAlignment';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import { TConversationState } from '../../types/Conversation';
import ROUTES from '../../router/RouteConfig';
import { CmButton } from 'shared/components';

export interface HowYouAlignButtonProps {
  conversationId: string;
  conversationState: TConversationState;
}

export const HowYouAlignButton: React.FC<HowYouAlignButtonProps> = ({
  conversationState,
  conversationId,
}) => {
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
      style={{ marginBottom: 20 }}
    />
  );
};
