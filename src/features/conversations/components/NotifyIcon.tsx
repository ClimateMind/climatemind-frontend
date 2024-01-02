import { TConversationState } from '../../../types/Conversation';
import { CmTypography } from 'shared/components';

export interface Props {
  state: TConversationState;
}

function NotifyIcon({ state }: Props) {
  if (state == TConversationState.UserBInvited) return null;
  if (state == TConversationState.RatingDone) return null;

  return (
    <div style={{
      backgroundColor: '#B00020',
      borderRadius: '50%',
      height: '16px',
      width: '16px',
    }}>
      <CmTypography
        variant="label"
        style={{
          color: 'white',
          position: 'relative',
          left: 4,
        }}
      >
        1
      </CmTypography>
    </div>
  );
}

export default NotifyIcon;
