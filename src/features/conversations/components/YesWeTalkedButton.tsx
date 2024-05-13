import { CmButton } from 'shared/components';
import { TConversationState } from 'types/Conversation';
import { useUpdateConversation } from '../hooks';

interface Props {
  conversationState: TConversationState;
  conversationId: string;
}

function YesWeTalkedButton({ conversationState, conversationId }: Props) {
  const { updateConversation } = useUpdateConversation();
  function handleClick() {
    if (conversationState === TConversationState.TopicsViewed) {
      updateConversation(conversationId, { state: 4 });
    }
  }
  return <CmButton disabled={conversationState !== TConversationState.TopicsViewed} text="Yes, we talked!" onClick={handleClick} />;
}

export default YesWeTalkedButton;
