import { useState } from 'react';
import { useApiClient, useToastMessage } from 'shared/hooks';

function useChangePassword() {
  const apiClient = useApiClient();
  const { showSuccessToast, showErrorToast } = useToastMessage();

  const [isLoading, setIsLoading] = useState(false);

  async function changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    setIsLoading(true);
    let isSuccessful = false;

    try {
      await apiClient.putPassword(currentPassword, newPassword, confirmPassword);
      showSuccessToast('Password updated!');
      isSuccessful = true;
    } catch (error) {
      showErrorToast(error.response.data.error || 'Unknown error has occurred');
    }

    setIsLoading(false);
    return isSuccessful;
  }

  return {
    isLoading,
    changePassword,
  };
}

export default useChangePassword;
