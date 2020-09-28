import { useContext } from 'react';

import {
  ResponsesDispatchContext,
  ResponsesContext,
} from '../contexts/responses';

export const useResponses = () => {
  const state = useContext(ResponsesContext);
  const dispatch = useContext(ResponsesDispatchContext);

  return { state, dispatch };
};
