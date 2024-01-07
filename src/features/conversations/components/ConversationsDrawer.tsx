import { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';

import { useConversations } from 'hooks/useConversations';
import ConversationCard from './ConversationCard';
import { CmTypography } from 'shared/components';
import ConversationIntroCard from './ConversationIntroCard';

interface Props {
  open: boolean;
  onClose: () => void;
}

function BottomToTopDrawer({ open, onClose }: Props) {
  const [hoverClose, setHoverClose] = useState(false);
  const { conversations } = useConversations();

  useEffect(() => {
    setHoverClose(false);
  }, [open]);

  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      PaperProps={{ style: styles.drawerPaper }}
    >
      <button onClick={onClose} style={{...styles.closeDrawerButton, backgroundColor: hoverClose ? '#c0ede9' : '#D0EEEB' }} onMouseEnter={() => setHoverClose(true)} onMouseLeave={() => setHoverClose(false)}>
        <img src='/arrows/arrow-down-white.svg' alt='arrow-down' style={styles.closeDrawerArrow} />
      </button>
      <CmTypography variant='h1'>Ongoing Conversations</CmTypography>

      <div style={{ maxWidth: 640, padding: 20, display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
        <div style={{ paddingBottom: 20 }}>
          <ConversationIntroCard />
        </div>

        {conversations?.map((conversation) => (
          <div style={{ marginBottom: 20 }}>
            <ConversationCard
              key={conversation.conversationId}
              conversationId={conversation.conversationId}
              userBName={conversation?.userB?.name!}
              conversationState={conversation.state!}
              onDeleteConversation={() => {}}
            />
          </div>
        ))}
      </div>
    </Drawer>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  drawerPaper: {
    height: '90%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#D0EEEB',
    overflowY: 'scroll',
    display: 'flex',
  },
  closeDrawerButton: {
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  closeDrawerArrow: {
    width: 24,
  },
};

export default BottomToTopDrawer;
