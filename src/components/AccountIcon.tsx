import React from 'react';
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import { useAuth } from '../hooks/auth/useAuth';
import theme from '../common/styles/CMTheme';
import ROUTES from '../components/Router/RouteConfig';

type StyleProps = {
  isXS: boolean;
  isLoggedIn: boolean;
};

type Props = {
  resetTabAndGoToProfileMenu?:any
}

const AccountIcon: React.FC<Props> = ({resetTabAndGoToProfileMenu}) => {
  const { auth } = useAuth();
  const { isLoggedIn } = auth;
  const { push } = useHistory();
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        width: (props: StyleProps) => (props.isLoggedIn ? '40px' : '25px'),
        height: (props: StyleProps) => (props.isLoggedIn ? '40px' : '25px'),
        borderRadius: '50%',
        backgroundColor: COLORS.SECONDARY,
        marginLeft: (props: StyleProps) => (props.isXS ? '12px' : 'auto'),
        marginRight: (props: StyleProps) => (props.isXS ? '-12px' : '30px'),
      },
    })
  );
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({ isLoggedIn, isXS });

  return (
     <Button onClick={resetTabAndGoToProfileMenu ? resetTabAndGoToProfileMenu : () =>  push(ROUTES.PROFILE_MENU)}>
      {isLoggedIn && (
        <Grid
          id="AccountIcon"
          container
          item
          className={classes.root}
          alignItems="center"
          justify="center"
        >
          <Typography variant="h6">
            {auth.userIntials ? auth.userIntials : 'CM'}
          </Typography>
        </Grid>
      )}
    </Button>
  );
};

export default AccountIcon;
