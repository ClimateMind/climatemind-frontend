import { useMutation } from 'react-query';
import { getPasswordResetLink, getPasswordResetLinkPayload, getPasswordResetLinkResponse } from '../api/getPasswordResetLink';
import {
  postPasswordResetLink,
  postPasswordResetLinkPayload,
  postPasswordResetLinkResponse,
} from '../api/postPasswordResetLink';
import { useToast } from './useToast';

export function usePasswordResetLink() {

  const { showToast } = useToast();

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
  const sendPasswordResetLink = async ({ email }: postPasswordResetLinkPayload) => {
    await mutatePostAsync({
      email,
    });
  };

  // * Verify a password reset link
  const getPasswordResetLinkMutation = useMutation(
    (passwordResetLinkUuid: getPasswordResetLinkPayload) =>
      getPasswordResetLink(passwordResetLinkUuid),
    {
      onError: (error: any) => {},
      onSuccess: (res: getPasswordResetLinkResponse) => {},
    }
  );

  const { mutateAsync: mutateGetAsync } = getPasswordResetLinkMutation;
  const verifyPasswordResetLink = async ({passwordResetLinkUuid}: getPasswordResetLinkPayload) => {
    await mutateGetAsync({
      passwordResetLinkUuid,
    })
  }

  return {
    sendPasswordResetLink,
    verifyPasswordResetLink,
  };
}
