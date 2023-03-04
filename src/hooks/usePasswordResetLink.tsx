import { useToast } from './useToast';
import { useMutation } from 'react-query';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useSession } from './useSession';
import { useAuth } from './auth/useAuth';
import { PutPasswordResetLinkRequest } from '../api/requests';

export function usePasswordResetLink() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();
  
  const { showToast } = useToast();
  const { logError } = useErrorLogging();

  // * Request a password reset link
  const postPasswordResetLinkMutation = useMutation(
    ({ email }: { email: string }) =>
      new ClimateApi(sessionId, accessToken).postPasswordResetLink(email),
    {
      onError: (error: any) => {
        showToast({
          message:
            error.response?.data?.error.email || 'Unknow Error has occoured',
          type: 'error',
        });
        logError(error);
      },
      onSuccess: (res: { message: string}) => {
        // Show Success Message
        showToast({
          message: 'Email sent!',
          type: 'success',
        });
      },
    }
  );

  const { mutateAsync: mutatePostAsync } = postPasswordResetLinkMutation;
  const sendPasswordResetLink = async ({
    email,
  }: { email: string }) => {
    await mutatePostAsync({
      email,
    });
  };

  // * Verify a password reset link
  const getPasswordResetLinkMutation = useMutation(
    (passwordResetLinkUuid: string) =>
      new ClimateApi(sessionId, accessToken).getPasswordResetLink(passwordResetLinkUuid),
    {}
  );

  const { mutateAsync: mutateGetAsync } = getPasswordResetLinkMutation;
  const verifyPasswordResetLink = async (
    passwordResetLinkUuid: string,
  ) => {
    await mutateGetAsync(passwordResetLinkUuid);
  };

  // * Reset the password
  const resetPasswordResetLinkMutation = useMutation(
    (passwordDetails: PutPasswordResetLinkRequest) =>
      new ClimateApi(sessionId, accessToken).putPasswordResetLink(passwordDetails),
    {}
  );

  const { mutateAsync: mutatePutAsync } = resetPasswordResetLinkMutation;
  const resetPassword = async ({
    passwordResetLinkUuid,
    newPassword,
    confirmPassword,
  }: PutPasswordResetLinkRequest) => {
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
