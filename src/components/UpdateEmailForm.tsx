import { Box, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import React from 'react'
import { updateEmailSchema } from '../helpers/validationSchemas';
import { useAuth } from '../hooks/auth/useAuth';
import CMModal from './Modal';
import TextInput from './TextInput'

export default function UpdateEmailForm({isOpenModal, onConfirm, handleClose}:{isOpenModal:boolean, onConfirm:(values:any)=>void, handleClose:()=>void}) {

    const { auth } = useAuth();
    
    const formik = useFormik({
        initialValues: {
          newEmail: '',
          confirmNewEmail: '',
          password: '',
        },
        validationSchema: updateEmailSchema,
        onSubmit: (values:any) => {
            onConfirm(values)
        },
      });

      const emailsMatch =
      formik.values.newEmail === formik.values.confirmNewEmail;
  
    const confirmEmailCheck = () => {
      if (!emailsMatch) {
        return 'Emails must match!';
      } else {
        return formik.touched.confirmNewEmail && formik.errors.confirmNewEmail;
      }
    };

    return (
        <CMModal handleClose={handleClose} disabled={!(formik.dirty && formik.isValid && emailsMatch)} onConfirm={() => onConfirm(formik.values)} isOpen={isOpenModal}>
            
            <Typography variant="h6"> Update your email address </Typography>
            <Typography style={{marginTop:15}} variant="subtitle1">{auth?.email ? auth?.email:""}</Typography>
            <form onSubmit={formik.handleSubmit}>
            <Box py={4}>
            <TextInput
                id="newEmail"
                name="newEmail"
                value={formik.values.newEmail}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.newEmail && Boolean(formik.errors.newEmail)
                }
                helperText={formik.touched.newEmail && formik.errors.newEmail}
                placeholder="New Email"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
              />
             <TextInput
                id="confirmNewEmail"
                value={formik.values.confirmNewEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm new email"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={
                  formik.touched.confirmNewEmail &&
                  (Boolean(formik.errors.confirmNewEmail) || !emailsMatch)
                }
                helperText={
                  formik.touched.confirmNewEmail && confirmEmailCheck()
                }
              />

              <TextInput
                id="password"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                    formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                placeholder="Enter password to change"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
              />
            </Box>
            </form>
        </CMModal>
    )
}
