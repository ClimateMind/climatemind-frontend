import React from 'react';
import { useContext  } from 'react'
import { userBEditContext } from '../../../contexts/userBEdit';
import {IconButton} from '@material-ui/core';
import { Box, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import TextInput from '../../../components/TextInput';
import EditIcon  from '@material-ui/icons/Edit';




type UserBEditNameFormProps = {
  conversationId: string;
  invitedUserName: string;

}

export const UserBEditNameForm: React.FC<UserBEditNameFormProps> = ({conversationId, invitedUserName}) => {
  const { setIsEdit } = useContext(userBEditContext)

    const formik = useFormik({
      initialValues: {
        newUserBName: invitedUserName 
      },
    //   validationSchema: updateEmailSchema,
      // REVERT TO values : any if causes issues.
      onSubmit: (values:any) => {
        setIsEdit(false)
      },
    })

    
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                id="newUserBName"
                name="newUserBName"
                value={formik.values.newUserBName}
                onChange={formik.handleChange}
                fullWidth={false}
                variant="filled"
                color="secondary"
                margin="none"
            />
            <IconButton type='submit'>
              <EditIcon  />
            </IconButton>
        </form>
    )
}

