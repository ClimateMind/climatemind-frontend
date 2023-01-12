import { useContext } from 'react';

import {
  ResponsesDispatchContext,
  ResponsesContext,
} from '../contexts/responses';

// Returns State and Dispatch together
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useResponses = () => {
  const state = useContext(ResponsesContext);
  const dispatch = useContext(ResponsesDispatchContext);

  return { state, dispatch };
};

// Returns only state for situations where modication is not required. Eg submission
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useResponsesData = () => {
  const state = useContext(ResponsesContext);

  return state;
};
