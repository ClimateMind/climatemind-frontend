import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, useMediaQuery } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import MenuIcon from '@mui/icons-material/Menu';

import ROUTES from "router/RouteConfig";
import { useAuth } from "hooks/auth/useAuth";
import CmTypography from "../CmTypography";
import CmAppBarTab from "./CmAppBarTab";
import CmAppBarTabs from "./CmAppBarTabs";
import { ProfileIcon } from "features/auth/components";

interface Props {
  onShowMenu: () => void;
}

function CmAppBar({ onShowMenu }: Props) {
  const navigate = useNavigate();
  
  const { isLoggedIn } = useAuth();
  const isSmall = useMediaQuery('(max-width: 960px)');
  const isMenuShowing = true;

  const [selectedTab, setSelectedTab] = useState(0);

  function changeTabHandler(newTab: number) {
    switch (newTab) {
      case 0:
        navigate(ROUTES.CLIMATE_FEED_PAGE);
        break;
      case 1:
        navigate(ROUTES.SOLUTIONS_FEED_PAGE);
        break;
      case 2:
        navigate(ROUTES.CONVERSATIONS_INTRO_PAGE);
        break;
      case 3:
        navigate(ROUTES.MYTHS_FEED_PAGE);
        break;
      default:
        break;
    }
    setSelectedTab(newTab);
  }

  return (
    <div style={{ ...styles.root, height: isSmall ? 58 : 64 }}>
      {(!isLoggedIn || isSmall) && <CmTypography variant='h4' style={{ color: 'white', margin: 0 }}>Climate Mind</CmTypography>}

      {isLoggedIn && !isSmall && (
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 13, left: -80 }}>
            <ProfileIcon />
          </div>
          <CmAppBarTabs value={selectedTab} onChange={(_, newValue) => changeTabHandler(newValue)}>
            <CmAppBarTab icon={<HomeIcon fontSize='small' />} label='Home' />
            <CmAppBarTab icon={<EmojiObjectsIcon fontSize='small' />} label='Actions' />
            <CmAppBarTab icon={<QuestionAnswerIcon fontSize='small' />} label='Talk' />
            <CmAppBarTab icon={<AnnouncementIcon fontSize='small' />} label='Myths' />
          </CmAppBarTabs>
        </div>
      )}

      {isLoggedIn && isSmall && (
        <div style={{ position: 'absolute', left: 20, top: 9 }}>
          <ProfileIcon />
        </div>
      )}

      {isMenuShowing && <IconButton style={{ position: 'absolute', right: 20 }} onClick={onShowMenu}>
        <MenuIcon style={{ color: 'white' }} />
      </IconButton>}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    backgroundColor: '#07373b',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
  },
};

export default CmAppBar;
