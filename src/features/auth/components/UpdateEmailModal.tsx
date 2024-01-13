import { useEffect, useState } from 'react';

import { useAppSelector } from 'src/store/hooks';
import { CmButton, CmModal, CmTextInput, CmTypography } from 'shared/components';
import { useUpdateEmail } from '../hooks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function UpdateEmailModal({ isOpen, onClose }: Props) {
  const { email } = useAppSelector(state => state.auth.userA);
  const { isLoading, updateEmail } = useUpdateEmail();

  const [newEmail, setNewEmail] = useState({ value: '', touched: false });
  const [confirmEmail, setConfirmEmail] = useState({ value: '', touched: false });
  const [password, setPassword] = useState({ value: '', touched: false });

  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEmail.value);
  const emailsMatch = newEmail.value === confirmEmail.value;
  const formIsValid = emailValid && emailsMatch && password.value !== '';

  useEffect(() => {
    setNewEmail({ value: '', touched: false });
    setConfirmEmail({ value: '', touched: false });
    setPassword({ value: '', touched: false });
  }, [isOpen]);

  return (
    <CmModal open={isOpen} onClose={onClose} title='Update your email address' maxWidth='sm'>
      <CmTypography variant="body">Current email address: <em>{email}</em></CmTypography>

      <CmTextInput
        id='newEmail'
        value={newEmail.value}
        onChange={(e) => setNewEmail({ value: e.target.value, touched: newEmail.touched })}
        onBlur={() => setNewEmail({ value: newEmail.value, touched: true })}
        placeholder="New email"
        type='email'
        helperText={!emailValid && newEmail.touched && 'Invalid email address'}
        error={!emailValid && newEmail.touched}
        style={{ marginTop: 10 }}
      />

      <CmTextInput
        id='confirmEmail'
        value={confirmEmail.value}
        onChange={(e) => setConfirmEmail({ value: e.target.value, touched: confirmEmail.touched })}
        onBlur={() => setConfirmEmail({ value: confirmEmail.value, touched: true })}
        placeholder="Confirm new email"
        type='email'
        helperText={!emailsMatch && confirmEmail.touched && 'Emails do not match'}
        error={!emailsMatch && confirmEmail.touched}
        style={{ marginTop: 10 }}
      />

      <CmTextInput
        id='password'
        value={password.value}
        onChange={(e) => setPassword({ value: e.target.value, touched: password.touched })}
        onBlur={() => setPassword({ value: password.value, touched: true })}
        placeholder="Password"
        type='password'
        style={{ marginTop: 10 }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 50, marginTop: 50 }}>
        <CmButton variant='text' text='Cancel' onClick={onClose} />
        <CmButton variant='text' text='Confirm' isLoading={isLoading} onClick={() => updateEmail(newEmail.value, confirmEmail.value, password.value)} disabled={!formIsValid} />
      </div>
    </CmModal>
  );
}

export default UpdateEmailModal;
