import { Typography, Grid, CardContent, Box } from '@material-ui/core';
import { ActionIcon } from './CardIcon';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import React from 'react';

export interface CardHeaderProps {
  title: string;
  index: number;
  cardIcon?: 'prevention' | 'protection' | 'idea' | false;
  bgColor?: string;
  preTitle?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  index,
  cardIcon = false,
  bgColor,
  preTitle,
}: CardHeaderProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        // margin: '1em 0',
        width: '100%',
        backgroundColor: bgColor ? bgColor : 'inherit',
      },
      cardHeader: {
        paddingTop: '8px',
        paddingBottom: '0',
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
      },
      title: {
        textTransform: 'capitalize',
        margin: 0,
      },
    })
  );

  const classes = useStyles();

  return (
    <CardContent className={classes.root}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
        className={classes.cardHeader}
      >
        {cardIcon && (
          <Grid item xs={2} className={classes.iconContainer}>
            <ActionIcon actionType={cardIcon} />
          </Grid>
        )}
        <Grid item xs={10} container>
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
      </Grid>
    </CardContent>
  );
};

export default CardHeader;
