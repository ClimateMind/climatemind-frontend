import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, createStyles, makeStyles } from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ROUTES from '../../router/RouteConfig';
import { COLORS } from '../../common/styles/CMTheme';
import PageContent from '../../components/PageContent';
import PageTitle from '../../components/PageTitle';
import TextInput from '../../components/TextInput';
import Wrapper from '../../components/Wrapper';
import CMCard from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader';
import { ModalWrapper } from '../../components/ModalWrapper';
import { registerSchema } from '../../helpers/validationSchemas';
import { useRegister } from '../../hooks/auth/useRegister';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useAlignment } from '../../hooks/useAlignment';
import { RegistrationPageOpenEvent, analyticsService } from 'services';
import { CmButton, CmTypography } from 'shared/components';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
    },
    skipButton: {
      color: COLORS.DK_TEXT,
      marginTop: '16px',
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10em',
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
    },
    homeButton: {
      float: 'right',
      margin: '16px 0px',
    },
    eyeIcon: {
      zIndex: 1000,
      cursor: 'pointer',
    },
  })
);

export type FormikProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function UserBSignUpPage() {
  const classes = useStyles();
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
          <PageTitle variant="h1">Create a Climate Mind account</PageTitle>

          <form className={classes.form} onSubmit={formik.handleSubmit}>
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
                      className={classes.eyeIcon}
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
        <ModalWrapper
          isOpen={showSuccessModal}
          handleClose={handleCloseSuccessModal}
        >
          <CMCard header={<CardHeader title="Success!" index={2} />}>
            <CmTypography variant="body">Account created.</CmTypography>
            <CmButton
              variant="text"
              text='Home'
              onClick={() => navigate(ROUTES.HOME_PAGE)}
            />
          </CMCard>
        </ModalWrapper>
      )}
    </>
  );
}

export default UserBSignUpPage;
