import { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

import ChangePasswordModal from '../../features/auth/components/ChangePasswordModal';
import UpdateEmailModal from '../../features/auth/components/UpdateEmailModal';
import { useAuth } from '../../hooks/auth/useAuth';
import { getAppSetting } from '../../getAppSetting';
import { useUpdatePassword } from '../../hooks/useUpdatePassword';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { useToastMessage } from 'shared/hooks';

function ProfilePage() {
  const { auth, logout } = useAuth();

  const { showSuccessToast, showErrorToast } = useToastMessage();
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

  const onConfirmPwdChangeData = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    await updatePassword({ currentPassword, newPassword, confirmPassword });
    setIsPwdUpdateModal(false);
  };

  const putEmail = async (newEmail: string, confirmEmail: string, password: string): Promise<void> => {
    const API_HOST = getAppSetting('REACT_APP_API_URL');

    const HEADERS = {
      Authorization: auth.accessToken ? `Bearer ${auth.accessToken}` : '',
    };

    const BODY = { newEmail: newEmail, confirmEmail, password: password };

    try {
      await axios.put(`${API_HOST}/email`, BODY, { headers: HEADERS });
      setIsEmailUpdateModal(false);
      getEmail(auth.accessToken);
      showSuccessToast('Email updated!');
    } catch (err) {
      showErrorToast(err.message || 'Unknow Error has occoured');
      logError(err);
    }
  };

  return (
    <Page style={{ minHeight: '100%' }}>
      <PageContent style={{ alignItems: 'flex-start', maxWidth: 320 }}>
        <CmTypography variant="h1">
          {auth?.firstName ? `${auth?.firstName}'s account` : ''}
        </CmTypography>

        <CmButton text='Change Password' onClick={() => setIsPwdUpdateModal(true)} style={{ marginTop: 30 }} />
        <CmButton text='Update Email' onClick={() => setIsEmailUpdateModal(true)} style={{ marginTop: 10, marginBottom: 10 }} />
        <CmButton text='Logout' startIcon={<LogoutIcon />} onClick={logout} />

        <ChangePasswordModal isOpen={isPwdUpdateModal} onClose={() => setIsPwdUpdateModal(false)} onConfirm={onConfirmPwdChangeData} />
        <UpdateEmailModal isOpen={isEmailUpdateModal} onClose={() => setIsEmailUpdateModal(false)} onConfirm={putEmail} initialEmail={userEmail} />
      </PageContent>
    </Page>
  );
}

export default ProfilePage;
