import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CmButton, CmLoader, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import ROUTES from 'router/RouteConfig';
import usePasswordReset from 'features/auth/hooks/useResetPassword';

function PasswordResetPage() {
  const navigate = useNavigate();
  const { passwordResetLinkUuid } = useParams();
  
  const { verifyPasswordResetLink, resetPassword } = usePasswordReset();
  const [isLoading, setIsLoading] = useState(false);
  const [linkIsValid, setLinkIsValid] = useState(false);

  const [newPassword, setNewPassword] = useState({ value: '', touched: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', touched: false });

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!formIsValid) return;

    setIsLoading(true);
    const result = await resetPassword(passwordResetLinkUuid!, newPassword.value, confirmPassword.value);
    setIsLoading(false);

    if (result) {
      navigate(ROUTES.LOGIN_PAGE);
    }
  }

  // When the page loads, we evaluate the uuid from the url to see if the reset link is valid or not
  useEffect(() => {
    if (passwordResetLinkUuid) {
      setIsLoading(true);

      verifyPasswordResetLink(passwordResetLinkUuid)
        .then((result) => {
          setLinkIsValid(result);
        }).finally(() => setIsLoading(false))
    }
  }, [passwordResetLinkUuid]);

  const passwordValid = /^(?=.*[a-zA-Z])(?=.*[\d!"#$£%&'()*+,-.:;<=>?@[\]^_`{|}~]).{8,128}$/.test(newPassword.value);
  const passwordsMatch = newPassword.value === confirmPassword.value;
  const formIsValid = passwordValid && passwordsMatch;

  return (
    <Page>
      <PageContent>
        {isLoading && <CmLoader />}

        {!isLoading && !linkIsValid && (<>
          <CmTypography variant="body" style={{ textAlign: 'center', marginBottom: 20 }}>
            Your password reset link has expired, please request a new one.
          </CmTypography>
          <CmButton text='Back to login' onClick={() => navigate(ROUTES.LOGIN_PAGE)} />
        </>)}

        {linkIsValid && <CmTypography variant="h2">Reset your password</CmTypography>}
        {linkIsValid && <form onSubmit={handleSubmit} style={styles.form}>
          <CmTextInput
            id='newPassword'
            label='New password'
            value={newPassword.value}
            onChange={(e) => setNewPassword({ value: e.target.value, touched: newPassword.touched })}
            onBlur={() => setNewPassword({ value: newPassword.value, touched: true })}
            placeholder='Super Secret Password'
            helperText={!passwordValid && newPassword.touched && 'Invalid Password. Password must be at least 8 characters and contain one number or one special character'}
            error={!passwordValid && newPassword.touched}
            type='password'
            style={styles.textInput}
          />

          <CmTextInput
            id='confirmPassword'
            label='Confirm new password'
            value={confirmPassword.value}
            onChange={(e) => setConfirmPassword({ value: e.target.value, touched: confirmPassword.touched })}
            onBlur={() => setConfirmPassword({ value: confirmPassword.value, touched: true })}
            placeholder='Confirm Password'
            helperText={!passwordsMatch && confirmPassword.touched && 'Passwords do not match'}
            error={!passwordsMatch && confirmPassword.touched}
            type='password'
            style={styles.textInput}
          />

          <CmButton text='Save' isLoading={isLoading} onClick={handleSubmit} disabled={!formIsValid} style={{ marginTop: 40 }} />
        </form>}
      </PageContent>
    </Page>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    marginTop: 20,
    maxWidth: 400,
  },
};

export default PasswordResetPage;
