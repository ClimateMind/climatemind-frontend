import { useToast } from './useToast';
import { useMutation } from 'react-query';
import {
  postPasswordResetLink,
  postPasswordResetLinkPayload,
  postPasswordResetLinkResponse,
} from '../api/postPasswordResetLink';
import {
  getPasswordResetLink,
  getPasswordResetLinkPayload,
} from '../api/getPasswordResetLink';
import {
  putPasswordResetLink,
  putPasswordResetLinkPayload,
} from '../api/putPasswordResetLink';
import { useErrorLogging } from './useErrorLogging';

export function usePasswordResetLink() {
  const { showToast } = useToast();
  const { logError } = useErrorLogging();

  // * Request a password reset link
  const postPasswordResetLinkMutation = useMutation(
    (passwordDetails: postPasswordResetLinkPayload) =>
      postPasswordResetLink(passwordDetails),
    {
      onError: (error: any) => {
        showToast({
          message:
            error.response?.data?.error.email || 'Unknow Error has occoured',
          type: 'error',
        });
        logError(error);
      },
      onSuccess: (res: postPasswordResetLinkResponse) => {
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
  }: postPasswordResetLinkPayload) => {
    await mutatePostAsync({
      email,
    });
  };

  // * Verify a password reset link
  const getPasswordResetLinkMutation = useMutation(
    (passwordResetLinkUuid: getPasswordResetLinkPayload) =>
      getPasswordResetLink(passwordResetLinkUuid),
    {}
  );

  const { mutateAsync: mutateGetAsync } = getPasswordResetLinkMutation;
  const verifyPasswordResetLink = async ({
    passwordResetLinkUuid,
  }: getPasswordResetLinkPayload) => {
    await mutateGetAsync({
      passwordResetLinkUuid,
    });
  };

  // * Reset the password
  const resetPasswordResetLinkMutation = useMutation(
    (passwordDetails: putPasswordResetLinkPayload) =>
      putPasswordResetLink(passwordDetails),
    {}
  );

  const { mutateAsync: mutatePutAsync } = resetPasswordResetLinkMutation;
  const resetPassword = async ({
    passwordResetLinkUuid,
    newPassword,
    confirmPassword,
  }: putPasswordResetLinkPayload) => {
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
