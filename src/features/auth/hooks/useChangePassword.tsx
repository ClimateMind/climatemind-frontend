import { useState } from 'react';
import { useApiClient, useToastMessage } from 'shared/hooks';

function useChangePassword() {
  const apiClient = useApiClient();
  const { showSuccessToast, showErrorToast } = useToastMessage();

  const [isLoading, setIsLoading] = useState(false);

  async function changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    setIsLoading(true);

    try {
      await apiClient.putPassword(currentPassword, newPassword, confirmPassword);
      showSuccessToast('Password updated!');
    } catch (error) {
      showErrorToast((error as any).response.data.error || 'Unknown error has occurred');
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    changePassword,
  };
}

export default useChangePassword;
