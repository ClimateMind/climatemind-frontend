import { useNavigate } from "react-router-dom";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';

import { useAuth } from "hooks/auth/useAuth";
import CmTypography from "./CmTypography";
import ROUTES from "router/RouteConfig";
import SocialImagesGrid from "./SocialImagesGrid";
import CmButton from "./CmButton";

interface Props {
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuDrawer({ isShowing, setIsShowing }: Props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  function navigateToPage(page: string) {
    navigate(page);
    setIsShowing(false);
  }

  return (
    <Drawer
      open={isShowing}
      onClose={() => setIsShowing(false)}
      anchor='right'
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: '30px',
          width: '100%',
          maxWidth: '360px',
        }
      }}
    >
      <div style={{ position: 'absolute', top: 10, right: 20 }}>
        <IconButton onClick={() => setIsShowing(false)}><CloseIcon /></IconButton>
      </div>

      <div style={{ marginTop: -10 }}>
        {isLoggedIn && <CmTypography variant='h4' style={styles.texts} onClick={() => navigateToPage(ROUTES.PERSONAL_VALUES_PAGE)}>Personal Values</CmTypography>}
        {isLoggedIn && <CmTypography variant='h4' style={styles.texts} onClick={() => navigateToPage(ROUTES.QUIZ_PAGE)}>Retake the Quiz</CmTypography>}
        {isLoggedIn && <CmTypography variant='h4' style={styles.texts} onClick={() => navigateToPage(ROUTES.CONVERSATIONS_INTRO_PAGE)}>Conversations</CmTypography>}
        

        <CmTypography variant='h4' style={styles.texts} onClick={() => window.open('https://climatemind.org')}>About Climate Mind</CmTypography>
        <CmTypography variant='h4' style={styles.texts} onClick={() => window.open('https://t.me/climatemind_chat')}>Community & Chat</CmTypography>
        <CmTypography variant='h4' style={styles.texts} onClick={() => navigateToPage(ROUTES.PRIVACY_PAGE)}>Privacy Policy</CmTypography>
      </div>

      <div>
        <SocialImagesGrid />

        {isLoggedIn && <CmButton text='Log out' style={styles.buttons} startIcon={<LogoutIcon />} onClick={() => navigateToPage(ROUTES.HOME_PAGE)} />}
        {!isLoggedIn && <CmButton text='Log in' style={styles.buttons} startIcon={<LoginIcon />} onClick={() => navigateToPage(ROUTES.LOGIN_PAGE)} />}

        <CmButton text='Feedback' style={{...styles.buttons, marginBottom: 30 }} startIcon={<MailIcon />} onClick={() => window.open('mailto:hello@climatemind.org')} />
      </div>
    </Drawer>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  texts: {
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 0,
    cursor: 'pointer',
  },
  buttons: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
};

export default MenuDrawer;
