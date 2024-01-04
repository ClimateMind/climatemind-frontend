import { useState } from 'react';
import { CmButton, CmModal, CmTextInput, CmTypography } from 'shared/components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

function RequestPasswordResetModal({ isOpen, onClose, onSubmit}: Props) {
  const [email, setEmail] = useState('');

  return (
    <CmModal open={isOpen} onClose={onClose} title='Reset your password'>
      <CmTypography variant="body">Enter the email associated with your account and we will email you a link to reset your password.</CmTypography>

      <CmTextInput
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        type='email'
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 50, marginTop: 50 }}>
        <CmButton variant='text' text='Cancel' onClick={onClose} />
        <CmButton variant='text' text='Submit' onClick={() => onSubmit(email)} disabled={email === ''} />
      </div>
    </CmModal>
  );
}

export default RequestPasswordResetModal;
