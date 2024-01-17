import { AxiosError } from 'axios';
import { useState } from 'react';
import { useApiClient, useToastMessage } from 'shared/hooks';

function useChangeEmail() {
  const apiClient = useApiClient();
  const { showSuccessToast, showErrorToast } = useToastMessage();

  const [isLoading, setIsLoading] = useState(false);

  async function updateEmail(newEmail: string, confirmEmail: string, password: string) {
    setIsLoading(true);

    try {
      await apiClient.putEmail(newEmail, confirmEmail, password);
      showSuccessToast('Email updated!');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Axios Error', error.response?.status)
        if (error.response?.status === 401) {
          showErrorToast('Incorrect password');
        } else if (error.response?.status === 409) {
          showErrorToast('Email already in use');
        }
      } else {
        showErrorToast(error.response.data.error || 'Unknown error has occurred');
      }
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    updateEmail,
  };
}

export default useChangeEmail;
