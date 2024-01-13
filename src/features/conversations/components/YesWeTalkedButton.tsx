import { CmButton } from "shared/components";
import { TConversationState } from "types/Conversation";

interface Props {
  conversationState: TConversationState;
}

function YesWeTalkedButton({ conversationState }: Props) {
  return (
    <CmButton disabled={conversationState !== TConversationState.TopicsViewed} text='Yes, we talked!' />
  );
}

export default YesWeTalkedButton;
