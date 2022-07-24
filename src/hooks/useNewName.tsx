import { useMutation } from 'react-query';
import { postNewName } from '../api/postNewName';

export const useNewName = (options = {}) => {
  const { mutate, isLoading } = useMutation(postNewName, {
    mutationKey: 'POST_NEW_NAME',
    ...options,
  });

  return { mutate, isLoading };
};