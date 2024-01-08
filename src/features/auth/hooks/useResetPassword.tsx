import { useApiClient, useToastMessage } from 'shared/hooks';

function usePasswordReset() {
  const apiClient = useApiClient();
  const { showSuccessToast } = useToastMessage();

  async function sendPasswordResetLink(email: string) {
    await apiClient.postPasswordResetLink(email);
    showSuccessToast('Email sent!');
  }

  return { sendPasswordResetLink };
}

export default usePasswordReset;
