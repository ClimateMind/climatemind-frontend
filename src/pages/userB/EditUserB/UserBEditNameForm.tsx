import React from 'react';
import { Box, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import TextInput from '../../../components/TextInput';

const UserBEditNameForm = () => {
    const formik = useFormik()
    
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

export default UserBEditNameForm