const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const handleCredentialResponse = (response: any) => {
  const credential = response.credential;
  // Pass the credential to your login function
  return credential;
};

const handleGoogleLogin = () => {
  (window as any).google.accounts.id.prompt(); // Triggers the Google sign-in prompt
};

handleGoogleLogin();
