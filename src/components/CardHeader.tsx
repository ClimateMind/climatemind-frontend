import { Typography, Grid, Box, Theme } from '@material-ui/core';
import CardIcon from './CardIcon';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { COLORS } from '../common/styles/CMTheme';

import React from 'react';

export interface CardHeaderProps {
  title: string;
  index?: number;
  cardIcon?: 'adaptation' | 'mitigation' | 'idea' | false;
  bgColor?: string;
  preTitle?: string;
  preTitleStyle?: 'positive' | 'warning';
  isPossiblyLocal?: boolean;
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
      iconContainer: {
        textAlign: 'center',
      },
      icon: {
        textAlign: 'center',
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
      title: {
        textTransform: 'capitalize',
        margin: 0,
      },
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="CardHeader">
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
        className={classes.cardHeader}
      >
        {cardIcon && (
          <Grid
            item
            xs={2}
            className={classes.iconContainer}
            data-testid="CardIcon"
          >
            <CardIcon actionType={cardIcon} />
          </Grid>
        )}
        <Grid item xs={8} container>
          <Box>
            {preTitle && (
              <Typography
                className={classes.preTitle}
                gutterBottom
                variant="h3"
                component="h3"
              >
                {preTitle}
              </Typography>
            )}
            <Typography
              className={classes.title}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {title}
            </Typography>
          </Box>
        </Grid>
        {isPossiblyLocal && <Grid
            item
            xs={2}
            className={classes.iconContainer}
            data-testid="LocalIcon"
          >
            <CardIcon actionType={'local'} />
          </Grid>}
      </Grid>
    </div>
  );
};

export default CardHeader;
