import React from 'react';
import { Box } from '@mui/material';
import { useFormik } from 'formik';

import CMModal from './Modal';
import TextInput from './TextInput';
import { CmTypography } from 'shared/components';

export default function RequestPasswordResetForm({
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
      email: '',
    },
    onSubmit: (values: any) => {
      onConfirm(values);
    },
  });

  return (
    <CMModal
      handleClose={handleClose}
      disabled={!(formik.dirty && formik.isValid)}
      onConfirm={() => onConfirm(formik.values)}
      isOpen={isOpenModal}
      confirmText="SUBMIT"
    >
      <CmTypography variant="h4" style={{ textAlign: 'left' }}> Reset your password </CmTypography>
      <CmTypography variant="body">
        Enter the email associated with your account and we will email you a
        link to reset your password.
      </CmTypography>

      <form onSubmit={formik.handleSubmit}>
        <Box py={4}>
          <TextInput
            id="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Email address"
            fullWidth={true}
            variant="filled"
            color="secondary"
            margin="none"
            type="email"
          />
        </Box>
      </form>
    </CMModal>
  );
}
