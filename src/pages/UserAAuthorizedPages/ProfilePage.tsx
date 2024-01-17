import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAppSelector } from 'store/hooks';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { ChangePasswordModal, ChangeEmailModal, useLogout } from 'features/auth';

function ProfilePage() {
  const { logoutUserA } = useLogout();
  const { firstName } = useAppSelector(state => state.auth.userA);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);

  return (
    <Page>
      <PageContent style={{ alignItems: 'flex-start', maxWidth: 320 }}>
        <CmTypography variant="h1">{firstName}'s account</CmTypography>

        <CmButton text='Change Password' onClick={() => setShowChangePasswordModal(true)} style={{ marginTop: 30 }} />
        <CmButton text='Update Email' onClick={() => setShowChangeEmailModal(true)} style={{ marginTop: 10, marginBottom: 10 }} />
        <CmButton text='Logout' startIcon={<LogoutIcon />} onClick={logoutUserA} />

        <ChangePasswordModal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} />
        <ChangeEmailModal isOpen={showChangeEmailModal} onClose={() => setShowChangeEmailModal(false)} />
      </PageContent>
    </Page>
  );
}

export default ProfilePage;
