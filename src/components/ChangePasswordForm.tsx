import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { updatePasswordSchema } from '../helpers/validationSchemas';
import CMModal from './Modal';
import { CmTextInput, CmTypography } from 'shared/components';

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
      return <CmTypography variant='label'>Passwords must match!</CmTypography>;
    } else {
      return <></>;
    }
  };

  return (
    <CMModal
      handleClose={handleClose}
      disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
      onConfirm={() => onConfirm(formik.values)}
      isOpen={isOpenModal}
    >
      <CmTypography variant="h4" style={{ textAlign: 'left', marginBottom: 0 }}>Change your password</CmTypography>

      <form onSubmit={formik.handleSubmit}>
        <Box py={4}>
          <CmTextInput
            id="currentPassword"
            name="currentPassword"
            value={formik.values.currentPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            placeholder="Current password"
            fullWidth={true}
            variant="filled"
            color="secondary"
            margin="none"
            type="password"
          />

          <CmTextInput
            id="newPassword"
            name="newPassword"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            placeholder="New password"
            fullWidth={true}
            variant="filled"
            color="secondary"
            margin="none"
            type="password"
          />

          <CmTextInput
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
            helperText={formik.touched.confirmPassword && confirmPasswordCheck()}
          />
        </Box>
      </form>
    </CMModal>
  );
}
