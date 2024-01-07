import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { CmAppBar, CmBottomTabsNavigation, CookieDialog, MenuDrawer } from "shared/components";

function RootPage() {
  const location = useLocation();
  const isSmall = useMediaQuery('(max-width: 960px)');

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <CookieDialog />
      <MenuDrawer isShowing={showMenu} setIsShowing={setShowMenu} />

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'auto' }}>
        <div style={{ height: isSmall ? 58 : 64 }}>
          <CmAppBar onShowMenu={() => setShowMenu(true)} />
        </div>

        <Outlet />

        <CmBottomTabsNavigation />
      </div>
    </>
  );
}

export default RootPage;
