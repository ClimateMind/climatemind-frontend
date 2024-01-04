import { useState } from "react";
import { Outlet } from "react-router-dom";

import { CmAppBar, CmBottomTabsNavigation, CookieDialog, MenuDrawer } from "shared/components";

function RootPage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <CookieDialog />
      <MenuDrawer isShowing={showMenu} setIsShowing={setShowMenu} />

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
