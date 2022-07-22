import { Box, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { updatePasswordSchema } from '../helpers/validationSchemas';
import CMModal from './Modal';
import TextInput from './TextInput';

export default function ChangePasswordForm({
  isOpenModal,
  onConfirm,
  handleClose,
}: {
  isOpenModal: boolean;
  onConfirm: (values: any) => void;
  handleClose: () => void;
}) {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: updatePasswordSchema,
    onSubmit: (values: any) => {
      onConfirm(values);
    },
  });

  const passwordsMatch =
    formik.values.newPassword === formik.values.confirmPassword;

  const confirmPasswordCheck = () => {
    if (!passwordsMatch) {
      return 'Passwords must match!';
    } else {
      return formik.touched.confirmPassword && formik.errors.confirmPassword;
    }
  };

  return (
    <CMModal
      handleClose={handleClose}
      disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
      onConfirm={() => onConfirm(formik.values)}
      isOpen={isOpenModal}
    >
      <Typography variant="h6"> Change your password </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box py={4}>
          <TextInput
            id="currentPassword"
            name="currentPassword"
            value={formik.values.currentPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
            placeholder="Current password"
            fullWidth={true}
            variant="filled"
            color="secondary"
            margin="none"
            type="password"
          />

          <TextInput
            id="newPassword"
            name="newPassword"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            placeholder="New password"
            fullWidth={true}
            variant="filled"
            color="secondary"
            margin="none"
            type="password"
          />

          <TextInput
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Confirm new password"
            fullWidth={true}
            variant="filled"
            color="secondary"
            margin="none"
            type="password"
            error={
              formik.touched.confirmPassword &&
              (Boolean(formik.errors.confirmPassword) || !passwordsMatch)
            }
            helperText={
              formik.touched.confirmPassword && confirmPasswordCheck()
            }
          />
        </Box>
      </form>
    </CMModal>
  );
}
