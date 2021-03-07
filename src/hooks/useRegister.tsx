import { useMutation } from 'react-query';
import { postRegister } from '../api/postRegister';
import { useHistory } from 'react-router-dom';
import ROUTES from '../components/Router/RouteConfig';

type registationPayload = {
  username: string;
  email: string;
  password: string;
};

export function useRegister() {
  const {
    isLoading,
    isError,
    mutateAsync,
    isSuccess,
    error,
  } = useMutation((userDetails: registationPayload) =>
    postRegister(userDetails)
  );

  const { push } = useHistory();

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
      // Redirect to login on sucess
      if (res) {
        push(ROUTES.ROUTE_LOGIN);
      }
    } catch (err) {
      console.error(err);
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
