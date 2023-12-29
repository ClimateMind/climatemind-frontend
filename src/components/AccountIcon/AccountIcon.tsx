import React from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../common/styles/CMTheme';
import { useAuth } from '../../hooks/auth/useAuth';
import theme from '../../common/styles/CMTheme';
import ROUTES from '../../router/RouteConfig';
import CmTypography from 'shared/components/CmTypography';

type StyleProps = {
  isXS: boolean;
  isLoggedIn: boolean;
};

export const AccountIcon: React.FC<{}> = () => {
  const { auth } = useAuth();
  const { isLoggedIn } = auth;
  const navigate = useNavigate();
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: (props: StyleProps) => (props.isLoggedIn ? '40px' : '25px'),
        height: (props: StyleProps) => (props.isLoggedIn ? '40px' : '25px'),
        borderRadius: '50%',
        backgroundColor: COLORS.SECONDARY,
        marginLeft: (props: StyleProps) => (props.isXS ? '12px' : 'auto'),
        marginRight: (props: StyleProps) => (props.isXS ? '-12px' : '30px'),
      },
      wrapperAsBtn: {
        cursor: 'pointer',
      },
    })
  );
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({ isLoggedIn, isXS });

  return (
    <div
      className={classes.wrapperAsBtn}
      onClick={() => navigate(ROUTES.PROFILE_PAGE)}
    >
      {isLoggedIn && (
        <Grid
          id="AccountIcon"
          container
          item
          className={classes.root}
          alignItems="center"
          justifyContent="center"
        >
          <CmTypography variant="h4" style={{ margin: 0, letterSpacing: 1 }}>
            {auth.userIntials ? auth.userIntials : 'CM'}
          </CmTypography>
        </Grid>
      )}
    </div>
  );
};
