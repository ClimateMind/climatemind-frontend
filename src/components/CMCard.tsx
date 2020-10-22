import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 1em',
      // height: '100%',
    },
    card: {
      backgroundColor: '#fff',
      height: '100%',
      minWidth: '343px',
    },
    cardHeader: {
      paddingTop: '8px',
      paddingBottom: '0',
    },
    title: {
      textTransform: 'capitalize',
      marginTop: '-0.5em',
    },
    media: {
      height: 0,
      maxWidth: '100%',
      paddingTop: '56.25%', // 16:9
    },
  })
);

interface CMCardProps {
  title: string;
  bodyText: string;
  index: number;
  numberedCards?: boolean;
  imageUrl?: string;
}

const CMCard: React.FC<CMCardProps> = ({
  title,
  bodyText,
  index,
  numberedCards,
  imageUrl,
}: CMCardProps) => {
  const classes = useStyles();

  return (
    <Grid
      item
      sm={12}
      lg={12}
      container
      className={classes.root}
      data-testid="CMCard"
    >
      <Card className={classes.card}>
        <CardContent className={classes.cardHeader}>
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
          />
        )}
        <CardContent>
          <Typography variant="body1" component="p">
            {bodyText}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

CMCard.defaultProps = {
  title: 'Climate Mind',
  bodyText:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
  numberedCards: true,
};

export default CMCard;
