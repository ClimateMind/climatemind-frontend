import { Box, Button, Drawer, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { ReactComponent as DownArrowIcon } from '../assets/icon-arrow-down-white.svg';
import { ReactComponent as UpArrowIcon } from '../assets/icon-arrow-up-white.svg';
import { useLocation } from 'react-router-dom';
import { TLocation } from '../types/Location';
import { useUrlParamQuery } from '../hooks/useUrlParamQuery';

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
  const useStyles = makeStyles<Theme, DrawerDashboardProps>((theme: Theme) =>
    createStyles({
      root: {
        padding: `0 8px`,
      },
      paper: (props: DrawerDashboardProps) => ({
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        height: `calc(100% - ${props.spaceToTop}px)`,
        backgroundColor: bgColor ? bgColor : '#FFF',
      }),
      dashContainer: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      },
      buttonDrawer: (props: DrawerDashboardProps) => ({
        position: 'fixed',
        bottom: props.offsetAnchorY,
        height: '88px',
        left: 0,
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        backgroundColor: bgColor ? bgColor : '#FFF',
      }),
      buttonText: {
        letterSpacing: '1pt',
        fontSize: '1.125em',
        textTransform: 'none',
      },
    })
  );

  const props = {
    drawerTitle,
    children,
    bgColor,
    offsetAnchorY,
    spaceToTop,
  };

  const classes = useStyles(props);

  // Check if route is provided a location state with an id. If so, the id of the conversation
  // should be in focus and the conversation drawer should be open.
  const location = useLocation<TLocation>();
  const query = useUrlParamQuery();
  const [showDash, setShowDash] = useState(
    location?.state?.id || query.get('conversation') ? true : false
  );

  const handleShowClick = () => {
    setShowDash(!showDash);
  };

  return (
    <div data-testid={`dashboard-drawer-${showDash ? 'open' : 'closed'}`}>
      <Button
        fullWidth
        className={classes.buttonDrawer}
        onClick={handleShowClick}
        data-testid="dashboard-drawer-button"
        aria-label="open conversations drawer"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <UpArrowIcon />
          <Typography
            className={classes.buttonText}
            gutterBottom
            variant="h3"
            component="h3"
          >
            {drawerTitle}
          </Typography>
        </Box>
      </Button>
      <Drawer
        classes={{
          paper: classes.paper,
        }}
        anchor="bottom"
        open={showDash}
        onClose={handleShowClick}
        // onOpen={handleShowClick} - Add this back in if we make the drawer swipable again
      >
        <Button
          fullWidth
          className={classes.closeDrawer}
          onClick={handleShowClick}
          data-testid="close-drawer-button"
          aria-label="close conversations drawer"
        >
          <DownArrowIcon />
        </Button>
        <div className={classes.dashContainer}>{children}</div>
      </Drawer>
    </div>
  );
};

export default DrawerDashboard;
