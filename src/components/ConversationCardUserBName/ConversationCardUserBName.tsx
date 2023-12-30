import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TextInput from '../TextInput';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import { capitalize } from '../../helpers/capitalize';
import { CmButton, CmTypography } from 'shared/components';

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

  // Return the name type when component is not editable not editable - this is used to trigger collapse from the componsent above.
  if (!isEditable)
    return (
      <Grid style={{ display: 'flex' }}>
        <CmTypography variant="h2" style={{ fontWeight: 700, margin: 0 }}>
          {capitalize(name)}
        </CmTypography>
      </Grid>
    );

  // Return the form
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {isEditable && isEditing ? (
          <>
            <Grid item>
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
            </Grid>
            <Grid item style={{ marginTop: 'auto' }}>
              <CmButton text='' startIcon={<EditIcon />} style={{ border: 'none' }} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <CmTypography variant="h2" style={{ fontWeight: 700, margin: 0 }}>
                {capitalize(name)}
              </CmTypography>
            </Grid>
            <Grid item>
              <CmButton text='' startIcon={<EditIcon />} style={{ border: 'none' }} />
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};
