import { useState } from 'react';
import { CmButton, CmTextInput } from 'shared/components';

interface Props {
  isLoading: boolean;
  onCancel?: () => void;
  onSignUp: (firstname: string, lastname: string, email: string, password: string) => void;
}

function SignUpForm({ isLoading, onCancel, onSignUp }: Props) {
  const [firstname, setFirstname] = useState({ value: '', touched: false });
  const [lastname, setLastname] = useState({ value: '', touched: false });
  const [email, setEmail] = useState({ value: '', touched: false });
  const [password, setPassword] = useState({ value: '', touched: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', touched: false });

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!formIsValid) return;

    onSignUp(firstname.value, lastname.value, email.value, password.value);
  }

  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
  const passwordValid = /^(?=.*[a-zA-Z])(?=.*[\d!"#$£%&'()*+,-.:;<=>?@[\]^_`{|}~]).{8,128}$/.test(password.value);
  const passwordsMatch = password.value === confirmPassword.value;
  const formIsValid = emailValid && passwordValid && passwordsMatch && firstname.value !== '' && lastname.value !== '';

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CmTextInput
        id='firstname'
        label='First Name'
        value={firstname.value}
        onChange={(e) => setFirstname({ value: e.target.value, touched: firstname.touched })}
        onBlur={() => setFirstname({ value: firstname.value, touched: true })}
        error={firstname.touched && !firstname.value}
        helperText={firstname.touched && !firstname.value && 'First name is required'}
        placeholder='John'
        style={styles.textInput}
      />

      <CmTextInput
        id='lastname'
        label='Last Name'
        value={lastname.value}
        onChange={(e) => setLastname({ value: e.target.value, touched: lastname.touched })}
        onBlur={() => setLastname({ value: lastname.value, touched: true })}
        error={lastname.touched && !lastname.value}
        helperText={lastname.touched && !lastname.value && 'Last name is required'}
        placeholder='Smith'
        style={styles.textInput}
      />

      <CmTextInput
        id='email'
        label='Email'
        value={email.value}
        onChange={(e) => setEmail({ value: e.target.value, touched: email.touched })}
        onBlur={() => setEmail({ value: email.value, touched: true })}
        error={email.touched && !email.value}
        helperText={email.touched && !emailValid && 'Invalid email address'}
        placeholder='hello@climatemind.org'
        type='email'
        style={styles.textInput}
      />

      <CmTextInput
        id='password'
        label='Password'
        value={password.value}
        onChange={(e) => setPassword({ value: e.target.value, touched: password.touched })}
        onBlur={() => setPassword({ value: password.value, touched: true })}
        error={password.touched && !passwordValid}
        helperText={password.touched && !passwordValid && 'Invalid Password. Password must be at least 8 characters and contain one number or one special character'}
        placeholder='Super Secret Password'
        type='password'
        style={styles.textInput}
      />

      <CmTextInput
        id='confirmPassword'
        label='Confirm Password'
        value={confirmPassword.value}
        onChange={(e) => setConfirmPassword({ value: e.target.value, touched: confirmPassword.touched })}
        onBlur={() => setConfirmPassword({ value: confirmPassword.value, touched: true })}
        error={confirmPassword.touched && !passwordsMatch}
        helperText={confirmPassword.touched && !passwordsMatch && 'Passwords do not match'}
        placeholder='Confirm Password'
        type='password'
        style={styles.textInput}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
        {onCancel && <CmButton text='Cancel' style={{ backgroundColor: 'transparent', borderColor: 'black' }} onClick={onCancel} />}
        <CmButton text='Create Account' isLoading={isLoading} type='submit' disabled={!formIsValid} onClick={handleSubmit} style={{ marginLeft: 'auto' }} />
      </div>
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    marginTop: 20,
    maxWidth: 400,
  },
};

export default SignUpForm;
