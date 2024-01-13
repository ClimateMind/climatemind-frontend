import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAppSelector } from 'src/store/hooks';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { ChangePasswordModal, UpdateEmailModal, useLogout } from 'features/auth';

function ProfilePage() {
  const { logoutUserA } = useLogout();
  const { firstName } = useAppSelector(state => state.auth.userA);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showUpdateEmailModal, setShowUpdateEmailModal] = useState(false);

  return (
    <Page>
      <PageContent style={{ alignItems: 'flex-start', maxWidth: 320 }}>
        <CmTypography variant="h1">{firstName}'s account</CmTypography>

        <CmButton text='Change Password' onClick={() => setShowChangePasswordModal(true)} style={{ marginTop: 30 }} />
        <CmButton text='Update Email' onClick={() => setShowUpdateEmailModal(true)} style={{ marginTop: 10, marginBottom: 10 }} />
        <CmButton text='Logout' startIcon={<LogoutIcon />} onClick={logoutUserA} />

        <ChangePasswordModal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} />
        <UpdateEmailModal isOpen={showUpdateEmailModal} onClose={() => setShowUpdateEmailModal(false)} />
      </PageContent>
    </Page>
  );
}

export default ProfilePage;
