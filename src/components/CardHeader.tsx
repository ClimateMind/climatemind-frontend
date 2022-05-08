import { Typography, Grid, Theme, Box } from '@material-ui/core';
import CardIcon from './CardIcon';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { COLORS } from '../common/styles/CMTheme';
import RoomIcon from '@material-ui/icons/Room';

import React from 'react';

export interface CardHeaderProps {
  title: string | undefined;
  index?: number;
  cardIcon?: 'adaptation' | 'mitigation' | 'idea' | false;
  bgColor?: string;
  preTitle?: string | undefined;
  preTitleStyle?: 'positive' | 'warning';
  isPossiblyLocal?: 0 | 1;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  cardIcon = false,
  bgColor,
  preTitle,
  preTitleStyle,
  isPossiblyLocal,
}: CardHeaderProps) => {
  const preTitleColor = () => {
    switch (preTitleStyle) {
      case 'positive':
        return COLORS.SUCCESS;
      case 'warning':
        return COLORS.WARNING;
      default:
        return 'inherit';
    }
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: '1em 0',
        width: '100%',
        backgroundColor: bgColor ? bgColor : 'inherit',
      },
      cardHeader: {
        paddingTop: '8px',
        paddingBottom: '0',
        width: '100%',
        padding: theme.spacing(2),
      },
      cardNumber: {
        textTransform: 'uppercase',
        letterSpacing: '0.5pt',
        fontSize: '10px',
      },
      preTitle: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        marginBottom: '-0.4em',
        color: preTitleColor,
      },
      preTitleIcon: {
        marginTop: '-5px',
        marginBottom: '-10px',
      },
      title: {
        // textTransform: 'capitalize',
        margin: 0,
        '&::first-letter': {
          textTransform: 'capitalize',
        },
      },
    })
  );

  const classes = useStyles();
  const preIconStyles = { fontSize: 12, margin: 0, padding: 0 };

  return (
    <div className={classes.root} data-testid="CardHeader">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        className={classes.cardHeader}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          {cardIcon && (
            <Grid item data-testid="CardIcon">
              <CardIcon actionType={cardIcon} />
            </Grid>
          )}
          <Box p={1}>
            <Grid item xs={12} container>
              {preTitle && (
                <Grid item xs={10} container alignItems="center">
                  {isPossiblyLocal === 1 && (
                    <Grid
                      item
                      xs={1}
                      className={classes.preTitleIcon}
                      data-testid="LocalIcon"
                    >
                      <RoomIcon style={preIconStyles} />
                    </Grid>
                  )}
                  <Grid item xs={9} data-testid="PreTitle">
                    <Typography
                      className={classes.preTitle}
                      gutterBottom
                      variant="h3"
                      component="h3"
                    >
                      {preTitle}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              <Typography
                className={classes.title}
                gutterBottom
                variant="subtitle2"
                component="h2"
              >
                {title}
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default CardHeader;
