import { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

import ChangePasswordModal from '../../features/auth/components/ChangePasswordModal';
import UpdateEmailModal from '../../features/auth/components/UpdateEmailModal';
import { getAppSetting } from '../../getAppSetting';
import { useUpdatePassword } from '../../hooks/useUpdatePassword';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { useToastMessage } from 'shared/hooks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout } from 'features/auth';
import ROUTES from 'router/RouteConfig';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const { showSuccessToast, showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();

  const [isPwdUpdateModal, setIsPwdUpdateModal] = useState<boolean>(false);
  const [isEmailUpdateModal, setIsEmailUpdateModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (user.accessToken) getEmail(user.accessToken);
  }, [userEmail, user.accessToken]);

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

  const onConfirmPwdChangeData = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    await updatePassword({ currentPassword, newPassword, confirmPassword });
    setIsPwdUpdateModal(false);
  };

  const putEmail = async (newEmail: string, confirmEmail: string, password: string): Promise<void> => {
    const API_HOST = getAppSetting('REACT_APP_API_URL');

    const HEADERS = {
      Authorization: user.accessToken ? `Bearer ${user.accessToken}` : '',
    };

    const BODY = { newEmail: newEmail, confirmEmail, password: password };

    try {
      await axios.put(`${API_HOST}/email`, BODY, { headers: HEADERS });
      setIsEmailUpdateModal(false);
      getEmail(user.accessToken);
      showSuccessToast('Email updated!');
    } catch (err) {
      showErrorToast(err.message || 'Unknow Error has occoured');
      logError(err);
    }
  };

  function handleLogout() {
    dispatch(logout());
    navigate(ROUTES.HOME_PAGE);
  }

  return (
    <Page>
      <PageContent style={{ alignItems: 'flex-start', maxWidth: 320 }}>
        <CmTypography variant="h1">
          {user.firstName ? `${user.firstName}'s account` : ''}
        </CmTypography>

        <CmButton text='Change Password' onClick={() => setIsPwdUpdateModal(true)} style={{ marginTop: 30 }} />
        <CmButton text='Update Email' onClick={() => setIsEmailUpdateModal(true)} style={{ marginTop: 10, marginBottom: 10 }} />
        <CmButton text='Logout' startIcon={<LogoutIcon />} onClick={handleLogout} />

        <ChangePasswordModal isOpen={isPwdUpdateModal} onClose={() => setIsPwdUpdateModal(false)} onConfirm={onConfirmPwdChangeData} />
        <UpdateEmailModal isOpen={isEmailUpdateModal} onClose={() => setIsEmailUpdateModal(false)} onConfirm={putEmail} initialEmail={userEmail} />
      </PageContent>
    </Page>
  );
}

export default ProfilePage;
