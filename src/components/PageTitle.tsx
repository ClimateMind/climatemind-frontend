import React from 'react';
import {
  Typography,
  TypographyProps,
  Box,
  useMediaQuery,
  Grid,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import theme from '../common/styles/CMTheme';

export interface PageTitleProps {
  align?: string;
}

const PageTitle: React.FC<TypographyProps & PageTitleProps> = ({
  children,
  variant = 'h1',
  align = 'center',
}) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        textAlign: align ? align : 'center',
        width: '100%',
        // Reduced width of title on narrow screens
        [theme.breakpoints.down('sm')]: {
          width: '87.5%',
        },
      },
      heading: {
        fontSize: '32px',
        [theme.breakpoints.up('sm')]: {
          fontSize: '50px',
        },
      },
    })
  );

  const isXS = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  return (
    <Grid container direction="row" justifyContent="center">
      <Box py={isXS ? 4 : 8} className={classes.root}>
        <Typography
          className={classes.heading}
          variant={variant}
          component="h1"
        >
          {children}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PageTitle;
