import { useContext } from 'react';

import {
  ResponsesDispatchContext,
  ResponsesContext,
} from '../contexts/responses';

// Returns State and Dispatch together
export const useResponses = () => {
  const state = useContext(ResponsesContext);
  const dispatch = useContext(ResponsesDispatchContext);

  return { state, dispatch };
};

// Returns only state for situations where modication is not required. Eg submission
export const useResponsesData = () => {
  const state = useContext(ResponsesContext);

  return state;
};
