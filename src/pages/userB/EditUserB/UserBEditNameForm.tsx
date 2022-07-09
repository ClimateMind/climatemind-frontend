import React from 'react';
import { Box, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import TextInput from '../../../components/TextInput';
import { ConversationCardProps } from '../../../components/ConversationCard';


type UserBEditNameFormProps = {
  conversationId: string;
  invitedUserName: string;

}

export const UserBEditNameForm: React.FC<UserBEditNameFormProps> = ({conversationId, invitedUserName}) => {

    const formik = useFormik({
      initialValues: {
        newEmail: '',
        confirmNewEmail: '',
        password: '',
      },
    //   validationSchema: updateEmailSchema,
      // REVERT TO values : any if causes issues.
      onSubmit: (updateUserEmailFormikData : object) => {
        //   onConfirm(updateUserEmailFormikData);
      },
    })
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                id="newEmail"
                name="newEmail"
                value={formik.values.newEmail}
                onChange={formik.handleChange}
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
            />
        </form>
    )
}

