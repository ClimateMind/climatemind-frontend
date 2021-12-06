import { createStyles, Grid, makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import ChangePasswordForm from '../components/ChangePasswordForm';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import UpdateEmailForm from '../components/UpdateEmailForm';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/auth/useAuth';
import { useToast } from '../hooks/useToast';
import { getAppSetting } from '../getAppSetting';

interface IResetPasswordValues {
  newEmail: string;
  confirmNewEmail: string;
  password: string;
}
interface IResetPasswordParams {
  values: IResetPasswordValues;
  resetForm: () => void;
}

const ProfileMenu: React.FC = () => {
  const { auth, logout } = useAuth();
  const { showToast } = useToast();

  const [isPwdUpdateModal, setIsPwdUpdateModal] = useState<boolean>(false);
  const [isEmailUpdateModal, setIsEmailUpdateModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (auth.accessToken) getEmail(auth.accessToken);
  }, [userEmail, auth.accessToken]);

  const useStyles = makeStyles((theme) =>
    createStyles({
      profileMenuBtn: {
        backgroundColor: '#fff',
        border: `1px solid ${COLORS.SECONDARY}`,
        '&:FOCUS': {
          backgroundColor: '#fff',
        },
        '&:ACTIVE': {
          backgroundColor: '#fff',
        },
        paddingLeft: 10,
        paddingRight: 10,
      },
      buttonText: {
        paddingLeft: 5,
      },
    })
  );

  const classes = useStyles();

  const getEmail = async (jwt: string): Promise<void> => {
    const API_HOST = getAppSetting('REACT_APP_API_URL');
    const HEADERS = { Authorization: jwt ? `Bearer ${jwt}` : '' };

    try {
      const resp = await axios.get(`${API_HOST}/email`, { headers: HEADERS });
      setUserEmail(resp.data.currentEmail);
    } catch (err) {
      console.log(err);
    }
  };

  const onConfirmPwdResetData = (values: any) => {
    console.log('onConfirm', values);
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
        message: 'Email Address has been successfully updated',
        type: 'success',
      });

      resetPasswordOption.resetForm();
    } catch (err) {
      // TODO: Improve error handling
      showToast({
        message: err.message,
        type: 'error',
      });
    }
  };

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT8} fullHeight>
        {auth?.isLoggedIn ? (
          <PageContent>
            <ChangePasswordForm
              handleClose={() => setIsPwdUpdateModal(false)}
              onConfirm={onConfirmPwdResetData}
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
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item>
                {/* Add this back in when we can change the password */}
                {/* <CMButton
                  onClick={() => setIsPwdUpdateModal(true)}
                  className={classes.profileMenuBtn}
                >
                  CHANGE PASSWORD
                </CMButton> */}
              </Grid>
              <Grid item>
                <Button
                  id="UpdateEmailButton"
                  onClick={() => setIsEmailUpdateModal(true)}
                  className={classes.profileMenuBtn}
                >
                  UPDATE EMAIL
                </Button>
              </Grid>
              <Grid item>
                <Button
                  id="LogoutButton"
                  onClick={logout}
                  className={classes.profileMenuBtn}
                >
                  <ExitToAppIcon />{' '}
                  <span className={classes.buttonText}>LOGOUT</span>
                </Button>
              </Grid>
            </Grid>
          </PageContent>
        ) : null}
      </Wrapper>
    </>
  );
};

export default ProfileMenu;
