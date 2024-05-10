import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Drawer } from '@mui/material';

import ConversationCard from './ConversationCard';
import { CmTypography } from 'shared/components';
import ConversationIntroCard from './ConversationIntroCard';
import { useDeleteConversation, useConversations } from '../hooks';
import DeleteConversationModal from './DeleteConversationModal';
import { useLocation } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

function BottomToTopDrawer({ open, onClose }: Props) {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { isLoading: isLoadingConversations, conversations } = useConversations();
  const { deleteConversation } = useDeleteConversation();

  const [hoverCloseButton, setHoverCloseButton] = useState(false);
  const [showDeleteConversationModal, setShowDeleteConversationModal] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  console.log(scrollPosition);
  function getUserBName(conversationId: string | null) {
    if (!conversations) return 'your friend';

    const conversation = conversations?.find((conversation) => conversation.conversationId === conversationId);
    return conversation?.userB?.name ?? 'your friend';
  }

  function handleDeleteConversation() {
    deleteConversation(showDeleteConversationModal!);
    setShowDeleteConversationModal(null);
  }
  const handleScroll = (event: any) => {
    console.log(event.target.scrollTop);
    setScrollPosition(event.target.scrollTop);
  };

  useEffect(() => {
    setHoverCloseButton(false);
  }, [open]);

  useEffect(() => {
    console.log('Location state:', location.state); // Debug to see the full state
    console.log(open);
    if (open && location.state?.scrollPosition && scrollableRef.current) {
      setTimeout(() => {
        scrollableRef.current.scrollTop = location.state.scrollPosition;
      }, 100); // Delay to ensure the component is fully rendered
    }
  }, [location.state, open]);

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} PaperProps={{ style: styles.drawerPaper }}>
      <Box
        component="div" // Specify the underlying HTML element
        sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '0.5em',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        onScroll={handleScroll} // Ensure the event handler has the correct type
      >
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
                scrollPosition={scrollPosition}
              />
            </div>
          ))}
        </div>

        <DeleteConversationModal isOpen={showDeleteConversationModal !== null} onClose={() => setShowDeleteConversationModal(null)} onConfirm={handleDeleteConversation} userBName={getUserBName(showDeleteConversationModal)} />
      </Box>
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
