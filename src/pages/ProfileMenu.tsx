import { createStyles, Grid, makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { COLORS } from '../common/styles/CMTheme';
import CMButton from '../components/Button';
import ChangePasswordForm from '../components/ChangePasswordForm';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import UpdateEmailForm from '../components/UpdateEmailForm';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/auth/useAuth';
import { useToast } from '../hooks/useToast';
import { getAppSetting } from '../getAppSetting';
// import putEmail from '../api/putEmail'; 
// import { getEmail } from '../api/getEmail';

const ProfileMenu: React.FC = () => {
    const { auth, logout } = useAuth();
    const { showToast } = useToast();
   
    const [isPwdUpdateModal, setIsPwdUpdateModal] = useState<boolean>(false)
    const [isEmailUpdateModal, setIsEmailUpdateModal] = useState<boolean>(false)
    const [ userEmail, setUserEmail ] = useState('');

    useEffect(() => {
      getEmail(auth.accessToken);
    }, [userEmail, auth.accessToken]);
    
    const useStyles = makeStyles((theme) =>
    createStyles({
      profileMenuBtn: {
        backgroundColor: "#fff",
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
      buttonText:{
        paddingLeft: 5,
      }
    })
    );
    
    const classes = useStyles();
    
    const getEmail = async (jwt : string) : Promise<void> => {
      const API_HOST = getAppSetting('REACT_APP_API_URL');
      const HEADERS = { Authorization : jwt ? `Bearer ${jwt}` : ''};

      try {
        const resp = await axios.get(`${API_HOST}/email`, { headers : HEADERS });
        setUserEmail(resp.data.currentEmail);
      } catch (err) {
        console.log(err);
      };
    };

  const onLogout = () => {
      logout()
  }

  const onConfirmPwdResetData = (values:any) => {
    console.log("onConfirm",values);
  } 

  const onConfirmEmailUpdateData = async (updateEmailObj : { newEmail: string, confirmNewEmail: string, password: string }) : Promise<void> => {
    const { newEmail, confirmNewEmail, password } = updateEmailObj;
    const API_HOST = getAppSetting('REACT_APP_API_URL');

    const HEADERS = { Authorization: auth.accessToken ? `Bearer ${auth.accessToken}` : ''};

    const BODY = {
      newEmail : newEmail,
      confirmEmail : confirmNewEmail,
      password : password
    };

    try {
      await axios.put(`${API_HOST}/email`, BODY, { headers : HEADERS });
      setIsEmailUpdateModal(false);
      getEmail(auth.accessToken);
      showToast({
        message : "Email Address has been successfully updated",
        type : "success"
      });
    } catch (err) {
      // TODO: Improve error handling
      console.log(err);
      showToast({
        message : "Unable to update email address",
        type : "error"
      });
    }
  }

    return (
        <>
        <Wrapper bgColor={COLORS.ACCENT8} fullHeight>
        {auth?.isLoggedIn ? 
          <PageContent>
            <ChangePasswordForm handleClose={() => setIsPwdUpdateModal(false)} onConfirm={onConfirmPwdResetData} isOpenModal={isPwdUpdateModal}/>
            <UpdateEmailForm handleClose={() => setIsEmailUpdateModal(false)} onConfirm={onConfirmEmailUpdateData} isOpenModal={isEmailUpdateModal} userEmail={userEmail} />

            <PageTitle align="left">{auth?.firstName ? `${auth?.firstName}'s account` : ""}</PageTitle>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
              >
                <Grid item>
                  <CMButton onClick = {() => setIsPwdUpdateModal(true)} className={classes.profileMenuBtn}>CHANGE PASSWORD</CMButton>
                </Grid>
                <Grid item>
                  <CMButton onClick = {() => setIsEmailUpdateModal(true)} className={classes.profileMenuBtn}>UPDATE EMAIL</CMButton>
                </Grid>
                <Grid item>
                  <CMButton onClick = {logout} className={classes.profileMenuBtn}>
                    <ExitToAppIcon/> <span className={classes.buttonText}>LOGOUT</span>
                  </CMButton>
                </Grid>
            </Grid>
          </PageContent> : null}
        </Wrapper>
        </>
    )
}

export default ProfileMenu;