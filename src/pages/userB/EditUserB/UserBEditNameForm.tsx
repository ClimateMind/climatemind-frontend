import React from 'react';
import { useContext  } from 'react'
import { userBEditContext } from '../../../contexts/userBEdit';

import { Box, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import TextInput from '../../../components/TextInput';
import EditIcon  from '@material-ui/icons/Edit';
// import {TConversationState} from ../../



type UserBEditNameFormProps = {
  conversationId: string;
  invitedUserName: string;

}

export const UserBEditNameForm: React.FC<UserBEditNameFormProps> = ({conversationId, invitedUserName}) => {

    const formik = useFormik({
      initialValues: {
        newUserBName: invitedUserName 
      },
    //   validationSchema: updateEmailSchema,
      // REVERT TO values : any if causes issues.
      onSubmit: (updateUserEmailFormikData : object) => {
        //   onConfirm(updateUserEmailFormikData);
      },
    })

    const { toggleEdit } = useContext(userBEditContext)
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                id="newUserBName"
                name="newUserBName"
                value={formik.values.newUserBName}
                onChange={formik.handleChange}
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
            />
            <EditIcon onClick = {() => toggleEdit() } />
        </form>
    )
}

