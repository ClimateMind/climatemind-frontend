import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { CmAppBar, CmBottomTabsNavigation, CookieDialog, MenuDrawer } from "shared/components";

function RootPage() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <CookieDialog />
      <MenuDrawer isShowing={showMenu} setIsShowing={setShowMenu} />

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <CmAppBar onShowMenu={() => setShowMenu(true)} />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </div>
        <CmBottomTabsNavigation />
      </div>
    </>
  );
}

export default RootPage;
