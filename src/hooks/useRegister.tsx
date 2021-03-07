import { useMutation } from 'react-query';
import { postRegister } from '../api/postRegister';
import { useHistory } from 'react-router-dom';
import ROUTES from '../components/Router/RouteConfig';
import { useToast } from './useToast';

type registationPayload = {
  username: string;
  email: string;
  password: string;
};

export function useRegister() {
  const mutation = useMutation((userDetails: registationPayload) =>
    postRegister(userDetails)
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const { push } = useHistory();
  const { showToast } = useToast();

  const register = async ({
    username,
    email,
    password,
  }: registationPayload) => {
    console.log('trying to register');
    try {
      // Post Login
      const res = await mutateAsync({
        username,
        email,
        password,
      });
      console.log({ res });
      // Redirect to login on sucess
      if (res) {
        push(ROUTES.ROUTE_LOGIN);
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
