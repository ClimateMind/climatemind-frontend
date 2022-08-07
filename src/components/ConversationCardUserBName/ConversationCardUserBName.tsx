import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TextInput from '../TextInput';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import { capitalize } from '../../helpers/capitalize';

export type ConversationCardUserBNameProps = {
  conversationId: string;
  invitedUserName: string;
  isEditable: boolean;
};

export const ConversationCardUserBName: React.FC<
  ConversationCardUserBNameProps
> = ({ conversationId, invitedUserName, isEditable }) => {
  const [name, setName] = useState(invitedUserName);
  const [isEditing, setIsEditing] = useState(false);
  const { updateConversation } = useUpdateConversation(conversationId);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleCollapseWhileEditing = () => {
    if (isEditing) {
      console.log({ invitedUserName });
      setName(invitedUserName);
      setIsEditing(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isEditing) {
      updateConversation({ receiverName: name });
    }
    toggleEdit();
  };

  useEffect(() => {
    if (!isEditable) handleCollapseWhileEditing();
    //eslint-disable-next-line
  }, [isEditable]);

  // Return the name type when for not editable
  if (!isEditable)
    return (
      <Grid style={{ display: 'flex' }}>
        <Typography variant="h4" component="h4">
          {capitalize(name)}
        </Typography>
      </Grid>
    );

  // Return the form
  return (
    <form onSubmit={handleSubmit}>
      {isEditable && isEditing ? (
        <>
          <TextInput
            id="newUserBName"
            name="receiver_name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            fullWidth={false}
            variant="filled"
            color="secondary"
            margin="none"
            data-cy="update-name-textfield"
          />
          <Button type="submit" aria-label="update name">
            <EditIcon />
          </Button>
        </>
      ) : (
        <Grid style={{ display: 'flex' }}>
          <Typography variant="h4" component="h4">
            {capitalize(name)}
          </Typography>
          <Button type="submit" aria-label="edit name">
            <EditIcon />
          </Button>
        </Grid>
      )}
    </form>
  );
};
