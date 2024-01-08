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
    <div style={styles.root}>
      <header style={styles.header}>
        <CmAppBar onShowMenu={() => setShowMenu(true)} />
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>

      <footer style={styles.footer}>
        <CmBottomTabsNavigation />
      </footer>

      <CookieDialog />
      <MenuDrawer isShowing={showMenu} setIsShowing={setShowMenu} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    position: "sticky",
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    display: 'flex',
  },
  page: {
    width: '100%',
  },
  pageContent: {
    maxWidth: 800,
    padding: '50px 20px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  footer: {
    position: "sticky",
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default RootPage;
