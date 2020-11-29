/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ActionHeadline from './ActionHeadline';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 0',
      width: '100%',
    },
    card: {
      backgroundColor: '#fff',
      height: '100%',
      width: '100%',
      // minWidth: '343px',
    },
    cardHeader: {
      paddingTop: '8px',
      paddingBottom: '0',
    },
    title: {
      textTransform: 'capitalize',
      marginBottom: '-0.3em',
    },
    media: {
      // height: '100px',
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

export interface CMCardProps {
  title: string;
  shortDescription: string;
  index: number;
  numberedCards?: boolean;
  imageUrl?: string;
  footer?: React.ReactNode;
  actionHeadline?: string;
}

const CMCard: React.FC<CMCardProps> = ({
  title,
  shortDescription,
  index,
  numberedCards,
  imageUrl,
  footer,
  actionHeadline,
}: CMCardProps) => {
  const classes = useStyles();

  return (
    <Grid item sm={12} lg={12} className={classes.root} data-testid="CMCard">
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="overline"
            component="p"
          >
            {numberedCards ? `NO. ${index + 1}` : null}
          </Typography>

          <Typography
            className={classes.title}
            gutterBottom
            variant="h6"
            component="h2"
          >
            {title}
          </Typography>
        </CardContent>

        {imageUrl && (
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={`${title} icon`}
            data-testid="CMCard-Image"
          />
        )}

        <CardContent>
          <Typography variant="body1" component="p">
            {/* TODO - Make this show conditionally when we have long descriptions */}
            {shortDescription}
          </Typography>
        </CardContent>

        {footer} 
        {actionHeadline && (
          <ActionHeadline actionHeadline={actionHeadline} icon={<EmojiObjectsIcon fontSize="default"/>} />
        )}
        </Card>
    </Grid>
  );
};

CMCard.defaultProps = {
  title: 'Climate Mind',
  shortDescription:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
  numberedCards: true,
};

export default CMCard;
