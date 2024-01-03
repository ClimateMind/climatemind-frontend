import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Dialog } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ROUTES from '../../router/RouteConfig';
import PageContent from '../../components/PageContent';
import TextInput from '../../components/TextInput';
import Wrapper from '../../components/Wrapper';
import { registerSchema } from '../../helpers/validationSchemas';
import { useRegister } from '../../hooks/auth/useRegister';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useAlignment } from '../../hooks/useAlignment';
import { RegistrationPageOpenEvent, analyticsService } from 'services';
import { CmButton, CmCard, CmTypography } from 'shared/components';

export type FormikProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function UserBSignUpPage() {
  const { register, isSuccess } = useRegister();
  const navigate = useNavigate();
  const { sessionId, quizId, setQuizId } = useSession();
  const { isLoggedIn } = useAuth();
  const signUpId = uuidv4();
  const { conversationId } = useAlignment();
  const { conversation, isLoading } = useGetOneConversation(conversationId);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (sessionId) analyticsService.postEvent(RegistrationPageOpenEvent, signUpId);
    if (!isLoading && conversation?.userB?.quizId && !quizId) {
      setQuizId(conversation.userB.quizId);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleshowSuccessModal = () => {
      setShowSuccessModal(true);
    };
    if (isSuccess) {
      handleshowSuccessModal();
    }
  }, [isSuccess]);

  // if a logged in user is doing the quiz again they should be redirected away from this page
  if (isLoggedIn) {
    navigate(ROUTES.CLIMATE_FEED_PAGE);
  }

  // Formik used for form validation and submission
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    } as FormikProps,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      register({
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
        quizId,
      });
    },
  });

  const passwordsMatch =
    formik.values.password === formik.values.confirmPassword;

  const confirmPasswordCheck = () => {
    if (!passwordsMatch) {
      return 'Passwords must match!';
    } else {
      return formik.touched.confirmPassword && formik.errors.confirmPassword;
    }
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleCloseSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
  }, [setShowSuccessModal]);

  return (
    <>
      <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight={true}>
        <PageContent>
          <CmTypography variant="h1">Create a Climate Mind account</CmTypography>

          <form
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10em',
            }}
            onSubmit={formik.handleSubmit}
          >
            <Box py={4}>
              <TextInput
                id="firstname"
                name="firstname"
                label="First Name"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="John Smith"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />

              <TextInput
                id="lastname"
                name="lastname"
                label="Last Name"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="John Smith"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />

              <TextInput
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="hello@climatemind.org"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextInput
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Super Secret Password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <VisibilityIcon
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={handleShowPassword}
                    />
                  ),
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
                InputProps={{
                  endAdornment: <VisibilityOffIcon />,
                }}
                error={
                  formik.touched.confirmPassword &&
                  (Boolean(formik.errors.confirmPassword) || !passwordsMatch)
                }
                helperText={
                  formik.touched.confirmPassword && confirmPasswordCheck()
                }
              />

              <Box pt={4} pb={2} display="flex" justifyContent="space-between">
                <CmButton
                  text='Cancel'
                  onClick={() => navigate(-1)}
                  style={{ backgroundColor: 'transparent', borderColor: 'black' }}
                />
                <CmButton
                  text='Create Account'
                  disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
                  onClick={() => formik.handleSubmit()}
                />
              </Box>

              <Box>
                <CmTypography variant="body" style={{ textAlign: 'center', marginTop: 20 }}>
                  By creating an account you can access your core values and
                  Climate Feed on any computer. You can share the core values
                  quiz with other friends and see how you relate.
                </CmTypography>
              </Box>
            </Box>
          </form>
        </PageContent>
      </Wrapper>
      {showSuccessModal && (
        <Dialog open={showSuccessModal} onClose={handleCloseSuccessModal}>
          <CmCard>
            <CmTypography variant="h1">Success!</CmTypography>
            <CmTypography variant="body">Account created.</CmTypography>
            <CmButton
              variant="text"
              text='Home'
              onClick={() => navigate(ROUTES.HOME_PAGE)}
            />
          </CmCard>
        </Dialog>
      )}
    </>
  );
}

export default UserBSignUpPage;
