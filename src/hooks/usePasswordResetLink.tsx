import { useMutation } from 'react-query';
import { useErrorLogging } from './useErrorLogging';
import { useApiClient, useToastMessage } from 'shared/hooks';

export function usePasswordResetLink() {
  const apiClient = useApiClient();

  const { showSuccessToast, showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();

  // * Request a password reset link
  const postPasswordResetLinkMutation = useMutation(
    ({ email }: { email: string }) => apiClient.postPasswordResetLink(email), {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error.email || 'Unknow Error has occoured');
        logError(error);
      },
      onSuccess: () => {
        showSuccessToast('Email sent!');
      },
    }
  );

  const { mutateAsync: mutatePostAsync } = postPasswordResetLinkMutation;
  const sendPasswordResetLink = async ({ email }: { email: string }) => {
    await mutatePostAsync({
      email,
    });
  };

  // * Verify a password reset link
  const getPasswordResetLinkMutation = useMutation(
    (passwordResetLinkUuid: string) =>
      apiClient.checkPasswordResetLink(passwordResetLinkUuid),
    {}
  );

  const { mutateAsync: mutateGetAsync } = getPasswordResetLinkMutation;
  const verifyPasswordResetLink = async (passwordResetLinkUuid: string) => {
    await mutateGetAsync(passwordResetLinkUuid);
  };

  // * Reset the password
  const resetPasswordResetLinkMutation = useMutation(
    (passwordDetails: {
      passwordResetLinkUuid: string;
      newPassword: string;
      confirmPassword: string;
    }) =>
      apiClient.resetPassword(passwordDetails.passwordResetLinkUuid, passwordDetails.newPassword, passwordDetails.confirmPassword),
    {}
  );

  const { mutateAsync: mutatePutAsync } = resetPasswordResetLinkMutation;
  const resetPassword = async ({
    passwordResetLinkUuid,
    newPassword,
    confirmPassword,
  }: {
    passwordResetLinkUuid: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    await mutatePutAsync({
      passwordResetLinkUuid,
      newPassword,
      confirmPassword,
    });
  };

  return {
    sendPasswordResetLink,
    verifyPasswordResetLink,
    resetPassword,
  };
}
