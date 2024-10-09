import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, useMediaQuery } from "@mui/material";
import { EmojiObjects, Announcement, Menu, Home, Star } from "@mui/icons-material";

import ROUTES from "router/RouteConfig";
import { useAppSelector } from "store/hooks";
import CmTypography from "../CmTypography";
import CmAppBarTab from "./CmAppBarTab";
import CmAppBarTabs from "./CmAppBarTabs";
import { ProfileIcon } from "features/auth/components";

const tabRoutes = [
  ROUTES.CLIMATE_FEED_PAGE,
  ROUTES.SOLUTIONS_FEED_PAGE,
  ROUTES.CONVERSATIONS_PAGE,
  ROUTES.MYTHS_FEED_PAGE,
  ROUTES.BADGE_PAGE
];

const conversationRoutes = [
  ROUTES.CONVERSATIONS_PAGE,
  ROUTES.SHARED_VALUES_PAGE,
  ROUTES.USERA_SHARED_FEED_PAGE,
]

interface Props {
  onShowMenu: () => void;
}

function CmAppBar({ onShowMenu }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useAppSelector(state => state.auth.userA);
  const isSmall = useMediaQuery('(max-width: 960px)');
  const isMenuShowing = true;

  const [selectedTab, setSelectedTab] = useState<number | boolean>(0);

  function changeTabHandler(newTab: number) {
    const selectedRoute = tabRoutes[newTab];
    if (selectedRoute) {
      setSelectedTab(newTab);
      navigate(selectedRoute);
    } else {
      setSelectedTab(false);
    }
  }

  // Whenever the url changes, update the selected tab
  useEffect(() => {
    const selectedRoute = tabRoutes.findIndex(route => route === location.pathname);
    if (selectedRoute !== -1) {
      setSelectedTab(selectedRoute);
    } else {
      if (conversationRoutes.filter(route => location.pathname.includes(route)).length > 0) {
        setSelectedTab(2);
      } else {
        setSelectedTab(false);
      }
    }
  }, [location.pathname]);


  return (
    <div style={{ ...styles.root, height: isSmall ? 58 : 64 }}>
      {(!isLoggedIn || isSmall) && <CmTypography variant='h4' style={{ color: 'white', margin: 0 }}>Climate Mind</CmTypography>}

      {!isSmall && isLoggedIn && (
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 13, left: -80 }}>
            <ProfileIcon />
          </div>
          <CmAppBarTabs value={selectedTab} onChange={(_, newValue) => changeTabHandler(newValue)}>
            <CmAppBarTab icon={<img style={{ width: '20px', height: '20px', color: "red" }} src="/cm-impact.svg" alt="cm weely goals" />} label='Impact' />
            <CmAppBarTab icon={<EmojiObjects fontSize='small' />} label='Solutions' />
            <CmAppBarTab icon={<Home fontSize="small" />} label='Hub' />
            <CmAppBarTab icon={<Announcement fontSize='small' />} label='Myths' />
            <CmAppBarTab icon={<Star fontSize="small" />} label="Badges" />
          </CmAppBarTabs>
        </div>
      )}
      {!isSmall && !isLoggedIn && <img src='/app-bar-cm-logo.svg' alt='Climate Mind' style={{ height: 25, position: 'absolute', left: 20, top: 16 }} />}

      {isSmall && isLoggedIn && (<div style={{ position: 'absolute', left: 20, top: 9 }}><ProfileIcon /></div>)}
      {isSmall && !isLoggedIn && <img src='/app-bar-cm-logo.svg' alt='Climate Mind' style={{ height: 25, position: 'absolute', left: 20, top: 16 }} />}

      {isMenuShowing && <IconButton style={{ position: 'absolute', right: 20 }} onClick={onShowMenu}>
        <Menu style={{ color: 'white' }} />
      </IconButton>}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    backgroundColor: '#07373b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
};

export default CmAppBar;
