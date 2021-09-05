import { createStyles, Grid, makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import axios from 'axios';
import { COLORS } from '../common/styles/CMTheme';
import CMButton from '../components/Button';
import ChangePasswordForm from '../components/ChangePasswordForm';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import UpdateEmailForm from '../components/UpdateEmailForm';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/auth/useAuth';
import { getAppSetting } from '../getAppSetting'; 
import { useToast } from '../hooks/useToast';

const ProfileMenu: React.FC = () => {
    const { auth, logout } = useAuth();
    const { showToast } = useToast();
   
    const [isPwdUpdateModal, setIsPwdUpdateModal] = React.useState(false)
    const [isEmailUpdateModal, setIsEmailUpdateModal] = React.useState(false)

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
    

  const onLogout = () => {
      logout()
  }

  const onConfirmPwdResetData = (values:any) => {
    console.log("onConfirm",values);
  } 

  const onConfirmEmailUpdateData = async (values:any) : Promise<void> => {
    const { newEmail, confirmNewEmail, password } = values;
    const API_HOST = getAppSetting('REACT_APP_API_URL');

    const HEADERS = { Authorization: auth.accessToken ? `Bearer ${auth.accessToken}` : ''};

    const BODY = {
      newEmail : newEmail,
      confirmEmail : confirmNewEmail,
      password : password
    };

    try {
      const resp = await axios.put(`${API_HOST}/email`, BODY, { headers : HEADERS });
      setIsEmailUpdateModal(false);
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
            <UpdateEmailForm handleClose={() => setIsEmailUpdateModal(false)} onConfirm={onConfirmEmailUpdateData}  isOpenModal={isEmailUpdateModal} />

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