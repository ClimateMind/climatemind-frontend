import { CmButton } from 'shared/components';
import { TConversationState } from 'types/Conversation';
import { useUpdateConversation } from '../hooks';

interface Props {
  conversationId: string;
  conversationState: TConversationState;
}

function YesWeTalkedButton({ conversationId, conversationState }: Props) {
  const { updateConversation } = useUpdateConversation();

  function handleClick() {
    if (conversationState === TConversationState.TopicsViewed) {
      updateConversation(conversationId, { state: TConversationState.Talked });
    }
  }

  return (
    <CmButton
      disabled={conversationState !== TConversationState.TopicsViewed}
      text="Yes, we talked!"
      onClick={handleClick}
    />
  );
}

export default YesWeTalkedButton;
