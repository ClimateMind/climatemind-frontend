import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { resetPasswordSchema } from '../../helpers/validationSchemas';
import { usePasswordResetLink } from '../../hooks/usePasswordResetLink';
import { useFormik } from 'formik';
import { useSession } from '../../hooks/useSession';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { ClimateApi } from '../../api/ClimateApi';
import { CmButton, CmLoader, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import { useToastMessage } from 'shared/hooks';
import { useAppSelector } from 'store/hooks';

type UrlParamType = {
  passwordResetLinkUuid: string;
};

function PasswordResetPage() {
  const navigate = useNavigate();

  const { setSessionId, sessionId } = useSession();
  const { user } = useAppSelector(state => state.auth);

  const { showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();

  const { passwordResetLinkUuid } = useParams<UrlParamType>();
  const { verifyPasswordResetLink, resetPassword } = usePasswordResetLink();

  const [isBusy, setBusy] = useState(true);
  const [linkIsValid, setLinkIsValid] = useState(false);

  const onConfirm = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    resetPassword({
      passwordResetLinkUuid: passwordResetLinkUuid ?? '',
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    })
      .then(() => {
        navigate(ROUTES.LOGIN_PAGE);
      })
      .catch((err) => {
        showErrorToast('Resetting the password failed');
        logError(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values: any) => {
      onConfirm(values);
    },
  });

  const passwordsMatch = formik.values.newPassword === formik.values.confirmPassword;

  const confirmPasswordCheck = () => {
    if (!passwordsMatch) {
      return <CmTypography variant='label'>Passwords must match!</CmTypography>;
    } else {
      return <></>;
    }
  };

  // When the page loads, we evaluate the uuid from the url to see if the reset link is valid or not
  useEffect(() => {
    new ClimateApi(sessionId, user.accessToken).postSession().then((res) => {
      setSessionId(res.sessionId);
      verifyPasswordResetLink(passwordResetLinkUuid ?? '')
        .then(() => {
          setLinkIsValid(true);
          setBusy(false);
        })
        .catch(() => setBusy(false));
    });
  }, [passwordResetLinkUuid]);

  // As long as the verification isn't finished, we display nothing
  if (isBusy) {
    return <CmLoader />;
  }

  if (!linkIsValid) {
    return (
      <Page>
        <PageContent>
          <CmTypography variant="body" style={{ textAlign: 'center' }}>
            Your password reset link has expired, please request a new one.
          </CmTypography>
          <CmButton
            text='Back to login'
            onClick={() => navigate(ROUTES.LOGIN_PAGE)}
            style={{ marginTop: 20 }}
          />
        </PageContent>
      </Page>
    );
  } else {
    return (
      <Page>
        <PageContent>
            <CmTypography variant="h2">
              Reset your password
            </CmTypography>
            <form onSubmit={formik.handleSubmit}>
              <CmTextInput
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
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
                style={{ marginTop: 10 }}
              />

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <CmButton
                  text='Save'
                  onClick={formik.handleSubmit}
                  disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
                />
              </div>
            </form>
        </PageContent>
      </Page>
    );
  }
}

export default PasswordResetPage;
