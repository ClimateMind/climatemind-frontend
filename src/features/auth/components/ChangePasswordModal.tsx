import { useEffect, useState } from 'react';
import { CmButton, CmModal, CmTextInput } from 'shared/components';
import { useChangePassword } from '../hooks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function ChangePasswordModal({isOpen, onClose}: Props) {
  const { isLoading, changePassword } = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState({ value: '', touched: false });
  const [newPassword, setNewPassword] = useState({ value: '', touched: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', touched: false });

  const passwordValid = /^(?=.*[a-zA-Z])(?=.*[\d!"#$£%&'()*+,-.:;<=>?@[\]^_`{|}~]).{8,128}$/.test(newPassword.value);
  const passwordsMatch = newPassword.value === confirmPassword.value;
  const formIsValid = passwordValid && passwordsMatch && currentPassword.value !== '';

  async function onConfirm() {
    const isSuccessful = await changePassword(currentPassword.value, newPassword.value, confirmPassword.value);
    if (isSuccessful) {
      onClose();
    }
  }

  useEffect(() => {
    setCurrentPassword({ value: '', touched: false });
    setNewPassword({ value: '', touched: false });
    setConfirmPassword({ value: '', touched: false });
  }, [isOpen]);

  return (
    <CmModal open={isOpen} onClose={onClose} title='Change your password' maxWidth='sm'>
      <CmTextInput
        id='currentPassword'
        value={currentPassword.value}
        onChange={(e) => setCurrentPassword({ value: e.target.value, touched: currentPassword.touched })}
        onBlur={() => setCurrentPassword({ value: currentPassword.value, touched: true })}
        placeholder="Current password"
        type='password'
        style={{ marginTop: 10 }}
      />

      <CmTextInput
        id='newPassword'
        value={newPassword.value}
        onChange={(e) => setNewPassword({ value: e.target.value, touched: newPassword.touched})}
        onBlur={() => setNewPassword({ value: newPassword.value, touched: true})}
        placeholder="New password"
        type='password'
        helperText={!passwordValid && newPassword.touched &&
          'Invalid Password. Password must be at least 8 characters and contain one number or one special character'
        }
        error={!passwordValid && newPassword.touched}
        style={{ marginTop: 10 }}
      />

      <CmTextInput
        id='confirmPassword'
        value={confirmPassword.value}
        onChange={(e) => setConfirmPassword({ value: e.target.value, touched: confirmPassword.touched})}
        onBlur={() => setConfirmPassword({ value: confirmPassword.value, touched: true})}
        placeholder="Confirm new password"
        type='password'
        helperText={!passwordsMatch && confirmPassword.touched && 'Passwords do not match'}
        error={!passwordsMatch && confirmPassword.touched}
        style={{ marginTop: 10 }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 50, marginTop: 50 }}>
        <CmButton variant='text' text='Cancel' onClick={onClose} />
        <CmButton variant='text' text='Confirm' isLoading={isLoading} onClick={onConfirm} disabled={!formIsValid}
        />
      </div>
    </CmModal>
  );
}

export default ChangePasswordModal;
