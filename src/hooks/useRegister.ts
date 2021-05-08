import { useMutation } from 'react-query';
import { postRegister, registrationPayload } from '../api/postRegister';
import { useHistory } from 'react-router-dom';
import ROUTES from '../components/Router/RouteConfig';
import { useToast } from './useToast';

export function useRegister() {
  const mutation = useMutation(
    (userDetails: registrationPayload) => postRegister(userDetails),
    {
      onError: (error: any) => {
        console.log({ error });
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

  const register = async ({
    fullname,
    email,
    password,
    sessionId,
  }: registrationPayload) => {
    console.log('trying to register');
    try {
      // Post Login
      const res = await mutateAsync({
        fullname,
        email,
        password,
        sessionId,
      });
      // Redirect to login on sucess
      if (res) {
        push('/');
        showToast({
          message: 'Account created',
          type: 'success',
        });
      }
    } catch (err) {
      console.log(err);
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
