import { logoutUserB } from "features/auth";
import { useEffect } from "react";
import { useAppDispatch } from "store/hooks";

function useResetAppStateUserB() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutUserB());
  }, [dispatch]);
}

export default useResetAppStateUserB;
