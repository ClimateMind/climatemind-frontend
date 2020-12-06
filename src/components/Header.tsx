import { Typography, Grid, CardContent, Box } from '@material-ui/core';
import { ActionIcon } from './CardIcon';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ActionHeadline from './CardHeadline';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import React from 'react';

export interface CardHeaderProps {
  title: string;
  index: number;
  numberedCards?: boolean;
  cardIcon?: 'prevention' | 'protection' | false;
  bgColor?: string;
  preTitle?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  index,
  numberedCards,
  cardIcon = false,
  bgColor,
  preTitle,
}: CardHeaderProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        margin: '1em 0',
        width: '100%',
        backgroundColor: bgColor ? bgColor : 'inherit',
      },
      card: {
        backgroundColor: bgColor,
        height: '100%',
        width: '100%',
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
      media: {
        margin: 0,
        paddingTop: '56.25%',
      },
      more: {
        textTransform: 'capitalize',
        marginBottom: '-0.5em',
        fontSize: '11pt',
        letterSpacing: '1pt',
      },
    })
  );

  const classes = useStyles();

  return (
    <CardContent>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        {cardIcon && (
          <Grid item xs={2} className={classes.iconContainer}>
            <ActionIcon actionType={cardIcon} />
          </Grid>
        )}
        <Grid item xs={10} container>
          <Box>
            {numberedCards && (
              <Typography
                className={classes.cardNumber}
                gutterBottom
                variant="h3"
                component="h3"
              >
                {numberedCards ? `NO. ${index + 1}` : null}
              </Typography>
            )}
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
