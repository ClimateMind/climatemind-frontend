import { Outlet } from "react-router-dom";
import { CookieDialog } from "shared/components";

function RootPage() {
  return (
    <>
      <CookieDialog />
      <Outlet />
    </>
  );
}

export default RootPage;
