import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { CmAppBar, CmBottomTabsNavigation, CookieDialog, MenuDrawer } from 'shared/components';
import { useApiClient } from 'shared/hooks';
import { updateUserAInfo, updateUserBInfo, useAutoLogin } from 'features/auth';

const userBRoutes = ['landing', 'login-user-b', 'how-cm-works', 'questionnaire', 'core-values', 'shared-values-user-b', 'shared-impacts', 'shared-solutions', 'shared-summary', 'shared', 'sign-up-user-b'];

function RootPage() {
  useAutoLogin();
  const location = useLocation();

  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const { sessionId } = useAppSelector((state) => state.auth.userA);

  const [showMenu, setShowMenu] = useState(false);

  const userBRoutePath = location.pathname.split('/')[1];
  const isUserBRoute = userBRoutes.includes(userBRoutePath);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!sessionId) {
      apiClient.postSession().then((response) => {
        dispatch(updateUserAInfo({ sessionId: response.sessionId }));
        dispatch(updateUserBInfo({ sessionId: response.sessionId }));
      });
    }
  }, []);

  if (!sessionId) return null;

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        {!isUserBRoute && <CmAppBar onShowMenu={() => setShowMenu(true)} />}
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>

      {!isUserBRoute && <footer style={styles.footer}>
        <CmBottomTabsNavigation />
      </footer>}

      <CookieDialog />
      <MenuDrawer isShowing={showMenu} setIsShowing={setShowMenu} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  main: {
    flexGrow: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
};

export default RootPage;
