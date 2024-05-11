import { useEffect, useState } from 'react';
import { CircularProgress, Drawer } from '@mui/material';

import ConversationCard from './ConversationCard';
import { CmTypography } from 'shared/components';
import ConversationIntroCard from './ConversationIntroCard';
import { useDeleteConversation, useConversations } from '../hooks';
import DeleteConversationModal from './DeleteConversationModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

function BottomToTopDrawer({ open, onClose }: Props) {
  const { isLoading: isLoadingConversations, conversations } = useConversations();
  const { deleteConversation } = useDeleteConversation();

  const [hoverCloseButton, setHoverCloseButton] = useState(false);
  const [showDeleteConversationModal, setShowDeleteConversationModal] = useState<string | null>(null);

  function getUserBName(conversationId: string | null) {
    if (!conversations) return 'your friend';

    const conversation = conversations?.find((conversation) => conversation.conversationId === conversationId);
    return conversation?.userB?.name ?? 'your friend';
  }

  function handleDeleteConversation() {
    deleteConversation(showDeleteConversationModal!);
    setShowDeleteConversationModal(null);
  }

  useEffect(() => {
    setHoverCloseButton(false);
  }, [open]);

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} PaperProps={{ style: styles.drawerPaper }}>
      <button onClick={onClose} style={{ ...styles.closeDrawerButton, backgroundColor: hoverCloseButton ? '#c0ede9' : '#D0EEEB' }} onMouseEnter={() => setHoverCloseButton(true)} onMouseLeave={() => setHoverCloseButton(false)}>
        <img src="/arrows/arrow-down-white.svg" alt="arrow-down" style={styles.closeDrawerArrow} />
      </button>

      <CmTypography variant="h1">Ongoing Conversations</CmTypography>

      <div style={styles.cardContainer}>
        <div style={{ marginBottom: 20 }}>
          <ConversationIntroCard />
        </div>

        {isLoadingConversations && <CircularProgress style={{ color: 'gray', margin: '0 auto' }} />}

        {conversations?.map((conversation) => (
          <div key={conversation.conversationId} style={{ marginBottom: 20 }}>
            <ConversationCard
              conversationId={conversation.conversationId}
              userBName={conversation?.userB?.name!}
              conversationState={conversation.state!}
              onDeleteConversation={(conversationId) => setShowDeleteConversationModal(conversationId)}
            />
          </div>
        ))}
      </div>

      <DeleteConversationModal isOpen={showDeleteConversationModal !== null} onClose={() => setShowDeleteConversationModal(null)} onConfirm={handleDeleteConversation} userBName={getUserBName(showDeleteConversationModal)} />
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
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 640,
    padding: 20,
    margin: '0 auto',
  },
};

export default BottomToTopDrawer;
