import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { COLORS } from '../../common/styles/CMTheme';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import PageContent from '../../components/PageContent';
import PageTitle from '../../components/PageTitle';
import UpdateEmailForm from '../../components/UpdateEmailForm';
import Wrapper from '../../components/Wrapper';
import { useAuth } from '../../hooks/auth/useAuth';
import { useToast } from '../../hooks/useToast';
import { getAppSetting } from '../../getAppSetting';
import { useUpdatePassword } from '../../hooks/useUpdatePassword';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { PutPasswordRequest } from '../../api/requests';
import { CmButton } from 'shared/components';

interface IResetPasswordValues {
  newEmail: string;
  confirmNewEmail: string;
  password: string;
}
interface IResetPasswordParams {
  values: IResetPasswordValues;
  resetForm: () => void;
}

function ProfilePage() {
  const { auth, logout } = useAuth();
  const { showToast } = useToast();
  const { logError } = useErrorLogging();

  const [isPwdUpdateModal, setIsPwdUpdateModal] = useState<boolean>(false);
  const [isEmailUpdateModal, setIsEmailUpdateModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (auth.accessToken) getEmail(auth.accessToken);
    //eslint-disable-next-line
  }, [userEmail, auth.accessToken]);

  //TODO: [CM-1096] Refactor getEmail and putEmail methods into a hook
  const getEmail = async (jwt: string): Promise<void> => {
    const API_HOST = getAppSetting('REACT_APP_API_URL');
    const HEADERS = { Authorization: jwt ? `Bearer ${jwt}` : '' };

    try {
      const resp = await axios.get(`${API_HOST}/email`, {
        headers: HEADERS,
      });
      setUserEmail(resp.data.currentEmail);
    } catch (err) {
      console.log(err);
      logError(err);
    }
  };

  const { updatePassword } = useUpdatePassword();

  const onConfirmPwdChangeData = async (values: PutPasswordRequest) => {
    await updatePassword(values);
    setIsPwdUpdateModal(false);
  };

  const putEmail = async (
    resetPasswordOption: IResetPasswordParams
  ): Promise<void> => {
    const { newEmail, confirmNewEmail, password } = resetPasswordOption.values;
    const API_HOST = getAppSetting('REACT_APP_API_URL');

    const HEADERS = {
      Authorization: auth.accessToken ? `Bearer ${auth.accessToken}` : '',
    };

    const BODY = {
      newEmail: newEmail,
      confirmEmail: confirmNewEmail,
      password: password,
    };

    try {
      await axios.put(`${API_HOST}/email`, BODY, { headers: HEADERS });
      setIsEmailUpdateModal(false);
      getEmail(auth.accessToken);
      showToast({
        message: 'Email updated!',
        type: 'success',
      });

      resetPasswordOption.resetForm();
    } catch (err) {
      // TODO: Improve error handling
      showToast({
        message: err.message,
        type: 'error',
      });
      logError(err);
    }
  };

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT8} fullHeight>
        {auth?.isLoggedIn ? (
          <PageContent>
            <ChangePasswordForm
              handleClose={() => setIsPwdUpdateModal(false)}
              onConfirm={onConfirmPwdChangeData}
              isOpenModal={isPwdUpdateModal}
            />
            <UpdateEmailForm
              handleClose={() => setIsEmailUpdateModal(false)}
              onConfirm={putEmail}
              isOpenModal={isEmailUpdateModal}
              userEmail={userEmail}
            />

            <PageTitle align="left">
              {auth?.firstName ? `${auth?.firstName}'s account` : ''}
            </PageTitle>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item>
                <CmButton
                  text='Change Password'
                  onClick={() => setIsPwdUpdateModal(true)}
                />
              </Grid>
              <Grid item>
                <CmButton
                  text='Update Email'
                  onClick={() => setIsEmailUpdateModal(true)}
                />
              </Grid>
              <Grid item>
                <CmButton
                  text='Logout'
                  startIcon={<ExitToAppIcon />}
                  onClick={logout}
                />
              </Grid>
            </Grid>
          </PageContent>
        ) : null}
      </Wrapper>
    </>
  );
}

export default ProfilePage;
