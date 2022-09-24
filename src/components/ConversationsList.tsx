import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useConversations } from '../hooks/useConversations';
import { ConversationCard } from './ConversationCard/ConversationCard';
import PageTitle from './PageTitle';
import Loader from './Loader';
import { ItsBrokenIcon } from './ItsBrokenIcon';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CMModal from './Modal';
import ConversationIntroCard from './ConversationIntroCard';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '640px',
      marginBottom: '56px',
    },
    modalHeader: {
      marginBottom: '24px',
    },
  })
);

export function ConversationsList() {
  const { conversations, isLoading, isError, removeConversation } =
    useConversations();
  const [conversationId, setConversationId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const classes = useStyles();

  const onConfirmDelete = () => {
    if (conversationId) {
      removeConversation(conversationId);
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const displayModal = (id: string) => {
    setConversationId(id);
    setIsModalOpen(true);
  };

  if (isError) return <ItsBrokenIcon />;

  if (!isLoading && conversations.length === 0)
    return (
      <Typography variant="h3">
        Invite a friend to start having conversations...
      </Typography>
    );

  return (
    <>
      <PageTitle>Ongoing Conversations</PageTitle>

      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.root}
        spacing={3}
      >
        {isLoading && <Loader />}
        <Grid style={{ width: '100%' }}>
          <ConversationIntroCard></ConversationIntroCard>
        </Grid>
        {conversations?.map((conversation) => (
          <Grid
            item
            style={{ width: '100%' }}
            key={conversation.conversationId}
          >
            <ConversationCard
              conversation={conversation}
              displayModal={displayModal}
            />
          </Grid>
        ))}
        {isModalOpen && (
          <CMModal
            handleClose={handleModalClose}
            onConfirm={onConfirmDelete}
            isOpen={isModalOpen}
          >
            <Typography
              variant="body1"
              component="p"
              id="modal-title"
              className={classes.modalHeader}
            >
              Delete Conversation?
            </Typography>
            <Typography variant="body1" component="p" id="modal-description">
              Are you sure you want to delete your conversation with{' '}
              <strong>
                {
                  conversations?.find(
                    (x) => x.conversationId === conversationId
                  )?.userB?.name
                }
              </strong>
              ?
            </Typography>
          </CMModal>
        )}
      </Grid>
    </>
  );
}

export default ConversationsList;
