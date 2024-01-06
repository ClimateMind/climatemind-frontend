import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';

import ROUTES from '../../router/RouteConfig';
import { registerSchema } from '../../helpers/validationSchemas';
import { useRegister } from '../../hooks/auth/useRegister';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { analyticsService, RegistrationPageOpenEvent } from 'services';
import { CmButton, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';

function SignUpPage() {
  const { register } = useRegister();
  const navigate = useNavigate();

  const { sessionId, quizId } = useSession();
  const { isLoggedIn } = useAuth();
  const signUpId = uuidv4();

  useEffect(() => {
    if (sessionId)
      analyticsService.postEvent(RegistrationPageOpenEvent, signUpId);
  }, []);

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
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      // Register user
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

  return (
    <Page>
      <PageContent>
        <CmTypography variant="h1">Create a Climate Mind account</CmTypography>
        <CmTypography variant="h4" style={{ margin: 0 }}>
          Save your results, see your climate topics, and start talking.
        </CmTypography>

        <form
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10em',
          }}
          onSubmit={formik.handleSubmit}
        >
          <Box py={4}>
            <CmTextInput
              id="firstname"
              name="firstname"
              label="First Name"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="John"
              fullWidth={true}
              variant="filled"
              color="secondary"
              margin="none"
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
              style={{ marginBottom: 15 }}
            />

            <CmTextInput
              id="lastname"
              name="lastname"
              label="Last Name"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Smith"
              fullWidth={true}
              variant="filled"
              color="secondary"
              margin="none"
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              style={{ marginBottom: 15 }}
            />

            <CmTextInput
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
              style={{ marginBottom: 15 }}
            />

            <CmTextInput
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
              type="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              style={{ marginBottom: 15 }}
            />

            <CmTextInput
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
              error={
                formik.touched.confirmPassword &&
                (Boolean(formik.errors.confirmPassword) || !passwordsMatch)
              }
              helperText={formik.touched.confirmPassword && confirmPasswordCheck()}
              style={{ marginBottom: 15 }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0',
              }}
            >
              <CmButton
                text="Create Account"
                disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
                onClick={() => formik.handleSubmit}
              />
            </div>

            <Box textAlign="center">
              <CmButton
                variant="text"
                text="Skip"
                onClick={() => navigate('/climate-feed')}
              />
            </Box>
          </Box>
        </form>
      </PageContent>
    </Page>
  );
}

export default SignUpPage;
