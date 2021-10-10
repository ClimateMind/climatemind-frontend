import React from 'react';
import {
  Typography,
  TypographyProps,
  Box,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import theme from '../common/styles/CMTheme';


export interface PageTitleProps {
  align?: string,
}

const PageTitle: React.FC<TypographyProps & PageTitleProps> = ({ children, variant = 'h1', align }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        textAlign: align ? align : 'center',
        width: '100%',
      },
      heading: {
        fontSize: '32px',
        [theme.breakpoints.up('sm')]: {
          fontSize: '50px',
        },
        // [theme.breakpoints.up('lg')]: {
        //   fontSize: '60px',
        // },
      },
    })
  );

  const isXS = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  return (
    <Box py={isXS ? 4 : 8} className={classes.root}>
      <Typography className={classes.heading} variant={variant} component="h1">
        {children}
      </Typography>
    </Box>
  );
};

export default PageTitle;
