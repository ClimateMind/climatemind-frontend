import React from 'react';
import { useState, useContext  } from 'react'
import { userBEditContext } from '../../../contexts/userBEdit';
// import {IconButton} from '@material-ui/core';
import { Box, Typography, Button } from '@material-ui/core'
import { useFormik } from 'formik';
import TextInput from '../../../components/TextInput';
import EditIcon  from '@material-ui/icons/Edit';
import { useNewName } from '../../../hooks/useNewName';



type UserBEditNameFormProps = {
  conversationId: string;
  invitedUserName: any;

}

export const UserBEditNameForm: React.FC<UserBEditNameFormProps> = ({conversationId, invitedUserName}) => {
  const { setIsEdit } = useContext(userBEditContext)


  const { mutate, isLoading } = useNewName()


    const formik = useFormik({
      initialValues: {
        receiver_name: invitedUserName 
      },
    //   validationSchema: updateEmailSchema,
      // REVERT TO values : any if causes issues.
      onSubmit: (values:any) => {
        setIsEdit(false)
        mutate(values)
      },
    })

    // const [name, setName] = useState<any>(invitedUserName);

    
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                id="newUserBName"
                name="newUserBName"
                value={formik.values.receiver_name}
                onChange={formik.handleChange}
                fullWidth={false}
                variant="filled"
                color="secondary"
                margin="none"
            />
            <Button type='submit'>
              <EditIcon />
            </Button>
        </form>
    )
}

