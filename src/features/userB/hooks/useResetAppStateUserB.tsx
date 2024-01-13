import { useEffect } from "react";

import { logoutUserB } from "features/auth";
import { useAppDispatch } from "src/store/hooks";

function useResetAppStateUserB() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutUserB());
  }, [dispatch]);
}

export default useResetAppStateUserB;
