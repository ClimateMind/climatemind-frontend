import { useApiClient, useToastMessage } from 'shared/hooks';

function usePasswordReset() {
  const apiClient = useApiClient();
  const { showSuccessToast, showErrorToast } = useToastMessage();

  // Step 1: Send password reset link
  async function sendPasswordResetLink(email: string) {
    await apiClient.postPasswordResetLink(email);
    showSuccessToast('Email sent!');
  }

  // Step 2: Verify password reset link is valid
  async function verifyPasswordResetLink(passwordResetLinkUuid: string): Promise<boolean> {
    try {
      await apiClient.checkPasswordResetLink(passwordResetLinkUuid);
      return true;
    } catch (error) {
      showErrorToast(error.response.data.message || 'Invalid password reset link');
      return false;
    }
  }

  // Step 3: Reset password
  async function resetPassword(passwordResetLinkUuid: string, newPassword: string, confirmPassword: string) {
    try {
      await apiClient.resetPassword(passwordResetLinkUuid, newPassword, confirmPassword);
      showSuccessToast('Password reset!');
      return true;
    } catch (error) {
      showErrorToast(error.response.data.message || 'Password reset failed');
      return false;
    }
  }

  return {
    sendPasswordResetLink,
    verifyPasswordResetLink,
    resetPassword,
  };
}

export default usePasswordReset;
