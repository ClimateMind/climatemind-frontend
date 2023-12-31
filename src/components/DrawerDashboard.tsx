import { useState } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { ReactComponent as DownArrowIcon } from '../assets/icon-arrow-down-white.svg';
import { ReactComponent as UpArrowIcon } from '../assets/icon-arrow-up-white.svg';
import { useLocation } from 'react-router-dom';
import { useUrlParamQuery } from '../hooks/useUrlParamQuery';
import { CmTypography } from 'shared/components';

export interface DrawerDashboardProps {
  drawerTitle?: string;
  children?: React.ReactNode;
  bgColor?: string;
  offsetAnchorY?: number;
  spaceToTop?: number;
}

const DrawerDashboard: React.FC<DrawerDashboardProps> = ({
  drawerTitle = 'Ongoing Conversations',
  children,
  bgColor,
  offsetAnchorY = 0,
  spaceToTop = 0,
}: DrawerDashboardProps) => {
  const props = {
    drawerTitle,
    children,
    bgColor,
    offsetAnchorY,
    spaceToTop,
  };

  // Check if route is provided a location state with an id. If so, the id of the conversation
  // should be in focus and the conversation drawer should be open.
  const location = useLocation();
  const query = useUrlParamQuery();
  const [showDash, setShowDash] = useState(
    location?.state?.id || query.get('conversation') ? true : false
  );

  const handleShowClick = () => {
    setShowDash(!showDash);
  };

  return (
    <div
      data-testid={`dashboard-drawer-${showDash ? 'open' : 'closed'}`}
      style={{ ...styles.drawerContainer, backgroundColor: bgColor ? bgColor : '#FFF', bottom: props.offsetAnchorY }}
    >
      <Button
        fullWidth
        style={styles.openDrawer}
        onClick={handleShowClick}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <UpArrowIcon />
          <CmTypography
            variant="h4"
            style={{ ...styles.buttonText, margin: 0 }}
          >
            {drawerTitle}
          </CmTypography>
        </Box>
      </Button>
      <Drawer
        sx={{
          paper: {...styles.paper, height: `calc(100% - ${props.spaceToTop}px)`,
          backgroundColor: bgColor ? bgColor : '#FFF',},
        }}
        anchor="bottom"
        open={showDash}
        onClose={handleShowClick}
        // onOpen={handleShowClick} - Add this back in if we make the drawer swipable again
      >
        <Button
          fullWidth
          style={styles.closeDrawer}
          onClick={handleShowClick}
          data-testid="close-drawer-button"
          aria-label="close conversations drawer"
        >
          <DownArrowIcon />
        </Button>
        <div style={styles.dashContainer}>{children}</div>
      </Drawer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    padding: `0 8px`,
  },
  paper: {
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
  },
  drawerContainer: {
    position: 'fixed',
    width: '100%',
    height: '88px',
    left: 0,
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
  },
  openDrawer: {
    height: '100%',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
  },
  buttonText: {
    letterSpacing: '1pt',
    fontSize: '1.125em',
    textTransform: 'none',
  },
};

export default DrawerDashboard;
