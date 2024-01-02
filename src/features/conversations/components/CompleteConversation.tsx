import { TConversationState } from '../../../types/Conversation';
import { useUpdateConversation } from '../../../hooks/useUpdateConversation';
import { ConversationRating } from '../../../components/ConversationRating';
import { CmButton, CmTypography } from 'shared/components';

interface Props {
  conversationState: TConversationState;
  conversationId: string;
  onClick: (state: number) => void;
}

function CompleteConversation({ conversationState, conversationId, onClick }: Props) {
  const { updateConversationState } = useUpdateConversation(conversationId);

  const isButtonDisabled =
    conversationState !== TConversationState.TopicsViewed;

  const isButtonShown = conversationState <= TConversationState.TopicsViewed;

  const showRating = conversationState >= TConversationState.Talked;

  return (
    <div>
      {isButtonShown && (
        <CmButton
          text='YES WE TALKED!'
          onClick={() => {
            updateConversationState(4);
            onClick(4);
          }}
          disabled={isButtonDisabled}
        />
      )}

      {!isButtonShown && <CmTypography variant="h2" style={{ textAlign: 'left' }}>Yay! Go you!</CmTypography>}

      {showRating && (
        <ConversationRating
          conversationState={conversationState}
          conversationId={conversationId}
        />
      )}
    </div>
  );
}

export default CompleteConversation;
