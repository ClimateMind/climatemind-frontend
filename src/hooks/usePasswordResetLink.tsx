import { useMutation } from 'react-query';
import {
  postPasswordResetLink,
  passwordResetLinkPayload,
  passwordResetLinkResponse,
} from '../api/postPasswordResetLink';
import { useToast } from './useToast';

export function usePasswordResetLink() {
  const mutation = useMutation(
    (passwordDetails: passwordResetLinkPayload) =>
      postPasswordResetLink(passwordDetails),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
      },
      onSuccess: (res: passwordResetLinkResponse) => {
        // Show Success Message
        showToast({
          message: 'Email sent!',
          type: 'success',
        });
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;
  const { showToast } = useToast();

  const sendPasswordResetLink = async ({ email }: passwordResetLinkPayload) => {
    await mutateAsync({
      email,
    });
  };

  return {
    sendPasswordResetLink,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
