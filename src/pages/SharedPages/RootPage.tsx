import { login, setSessionId } from "features/auth";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "router/RouteConfig";

import { CmAppBar, CmBottomTabsNavigation, CookieDialog, MenuDrawer } from "shared/components";
import { useApiClient } from "shared/hooks";
import { useAppDispatch, useAppSelector } from "store/hooks";

function RootPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const { sessionId } = useAppSelector(state => state.auth);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!sessionId) {
      apiClient.postSession().then((response) => {
        dispatch(setSessionId(response.sessionId));
      });
    }

    // On first load, check if there is a user in local storage and log them in if so
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(login(JSON.parse(user)));
      navigate(ROUTES.CLIMATE_FEED_PAGE);
    }
  }, []);

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
