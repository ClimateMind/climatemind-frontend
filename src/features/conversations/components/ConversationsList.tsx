import { useState } from 'react';
import { Grid } from '@mui/material';
import { useConversations } from '../../../hooks/useConversations';
import Loader from '../../../components/Loader';
import { ItsBrokenIcon } from '../../../components/ItsBrokenIcon';
import CMModal from '../../../components/Modal';
import { CmTypography } from 'shared/components';
import { ConversationCard, ConversationIntroCard } from 'features/conversations/components';

export function ConversationsList() {
  const { conversations, isLoading, isError, removeConversation } =
    useConversations();
  const [conversationId, setConversationId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onConfirmDelete = () => {
    if (conversationId) {
      removeConversation(conversationId);
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  function deleteConversationHandler(id: string) {
    setConversationId(id);
    setIsModalOpen(true);
    console.log(id);
  }

  if (isError) return <ItsBrokenIcon />;

  if (!isLoading && conversations.length === 0)
    return (
      <CmTypography variant="h1">
        Invite a friend to start having conversations...
      </CmTypography>
    );

  return (
    <>
      <CmTypography variant='h1'>Ongoing Conversations</CmTypography>

      <Grid
        container
        direction="column"
        alignItems="center"
        style={{
          width: '100%',
          maxWidth: '640px',
          marginBottom: '56px',
        }}
        spacing={3}
      >
        {isLoading && <Loader />}
        <div style={{ width: '100%', marginBottom: 20, marginTop: 20 }}>
          <ConversationIntroCard />
        </div>
        {conversations?.map((conversation) => (
          <div
            style={{ width: '100%', marginBottom: 20 }}
            key={conversation.conversationId}
          >
            <ConversationCard
              conversationId={conversation.conversationId}
              userBName={conversation?.userB?.name!}
              conversationState={conversation.state!}
              onDeleteConversation={deleteConversationHandler}
            />
          </div>
        ))}
        {isModalOpen && (
          <CMModal
            handleClose={handleModalClose}
            onConfirm={onConfirmDelete}
            isOpen={isModalOpen}
          >
            <CmTypography variant="h4" style={{ textAlign: 'left' }}>
              Delete Conversation?
            </CmTypography>
            <CmTypography variant="body">
              Are you sure you want to delete your conversation with{' '}
              <strong>
                {
                  conversations?.find(
                    (x) => x.conversationId === conversationId
                  )?.userB?.name
                }
              </strong>
              ?
            </CmTypography>
          </CMModal>
        )}
      </Grid>
    </>
  );
}

export default ConversationsList;
