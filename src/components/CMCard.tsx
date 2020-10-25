/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Collapse,
  CardActions,
  Button,
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

interface CMCardProps {
  title: string;
  shortDescription: string;
  description?: string;
  index: number;
  numberedCards?: boolean;
  imageUrl?: string;
}

const CMCard: React.FC<CMCardProps> = ({
  title,
  shortDescription,
  description,
  index,
  numberedCards,
  imageUrl,
}: CMCardProps) => {
  const classes = useStyles();

  const [showMore, setShowMore] = React.useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

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
        <Collapse in={showMore} timeout="auto" unmountOnExit>
          <CardContent>
            {description && (
              <Typography variant="body1" component="p">
                {description}
              </Typography>
            )}
          </CardContent>
        </Collapse>

        {/* Card More Less Buttons */}
        <CardActions>
          <Button
            className={classes.more}
            variant="text"
            onClick={handleShowMoreClick}
            data-testid="CMCardMore"
          >
            {showMore ? 'LESS' : 'MORE'}
          </Button>
        </CardActions>
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
