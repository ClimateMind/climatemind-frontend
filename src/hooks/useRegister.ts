import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  postRegister,
  registrationPayload,
  registrationResponse,
} from '../api/postRegister';
import { useToast } from './useToast';
import { useAuth } from '../hooks/useAuth';

export function useRegister() {
  const mutation = useMutation(
    (userDetails: registrationPayload) => postRegister(userDetails),
    {
      onError: (error: any) => {
        showToast({
          message: error.response.data.error || 'Unknow Error has occoured',
          type: 'error',
        });
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const { push } = useHistory();
  const { showToast } = useToast();
  const { setUser } = useAuth();

  // Redirect user to the climate feed on success registration
  useEffect(() => {
    if (isSuccess) {
      push('climate-feed');
    }
  }, [isSuccess]);

  const register = async ({
    fullname,
    email,
    password,
    sessionId,
  }: registrationPayload) => {
    try {
      // Post Login
      const res: registrationResponse = await mutateAsync({
        fullname,
        email,
        password,
        sessionId,
      });
      if (res) {
        // Account has been created sucessfully
        showToast({
          message: 'Account created',
          type: 'success',
        });
        // Update auth context to log user in;
        const user = {
          fullName: res.user.full_name,
          email: res.user.email,
          userIntials: 'AA',
          accessToken: res.access_token,
          userId: res.user.user_uuid,
          isLoggedIn: true,
        };
        setUser(user);
      }
    } catch (err) {
      showToast({
        message: err.message,
        type: 'error',
      });
    }
  };

  return {
    register,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
