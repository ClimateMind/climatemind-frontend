/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  Box,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    more: {
      textTransform: 'capitalize',
      marginBottom: '-0.5em',
      fontSize: '11pt',
      letterSpacing: '1pt',
    },
    topActions: {
      marginTop: '-15px',
    },
    pretitle: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontSize: '10px',
      marginBottom: '0.3em',
      marginTop: '1em',
    },
    title: {
      textTransform: 'capitalize',
      marginBottom: '0.3em',
    },
    card: {
      backgroundColor: '#fff',
      height: '100%',
      minWidth: '343px',
    },
    paper: {
      maxWidth: 'calc(100% - 8px)',
    },
    dialogBody: {
      border: '1px solid red',
    },
    media: {
      margin: 0,
      paddingTop: '56.25%',
    },
    arrow: {
      padding: 0,
      marginTop: '-10px',
    },
    bookmark: {
      color: '#07373B',
      height: '24px',
      marginTop: '-0.3em',
    },
  })
);

interface CMCardOverlayProps {
  title?: string;
  imageUrl?: string;
  shortDescription: string;
}

const CMCardOverlay: React.FC<CMCardOverlayProps> = ({
  title,
  imageUrl,
  shortDescription,
}: CMCardOverlayProps) => {
  const classes = useStyles();

  const [showMore, setShowMore] = React.useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Dialog
        onClose={handleShowMoreClick}
        aria-labelledby="simple-dialog-title"
        open={showMore}
        fullWidth
        scroll="body"
        maxWidth="sm"
        classes={{
          paperScrollBody: classes.dialogBody,
          paperWidthSm: classes.paper,
        }}
      >
        <Card className={classes.card}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              className={classes.topActions}
            >
              <Typography variant="body1" component="p">
                Close
              </Typography>
              <IconButton
                aria-label="show more"
                onClick={handleShowMoreClick}
                className={classes.arrow}
              >
                <ArrowDown />
              </IconButton>
            </Box>
            <Typography
              className={classes.pretitle}
              gutterBottom
              variant="overline"
              component="p"
            >
              Achievement
            </Typography>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Grid item xs={9}>
                <Typography
                  className={classes.title}
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="bookmark" className={classes.bookmark}>
                  <BookmarkBorderIcon />
                </IconButton>
              </Grid>
            </Grid>
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
              {shortDescription}
              Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt
              est incididunt mollit reprehenderit tempor irure excepteur. Do
              labore aliquip reprehenderit consectetur dolore mollit Lorem
              fugiat exercitation magna elit aliquip commodo commodo. Dolor
              adipisicing exercitation incididunt irure dolor ad aute ad commodo
              mollit proident. Ullamco sunt voluptate sunt quis. Cupidatat aute
              Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt
              mollit reprehenderit tempor irure excepteur. Do labore aliquip
              reprehenderit consectetur dolore mollit Lorem fugiat exercitation
              magna elit aliquip commodo commodo. Dolor adipisicing exercitation
              incididunt irure dolor ad aute ad commodo mollit proident. Ullamco
              sunt voluptate sunt quis.
            </Typography>
          </CardContent>
        </Card>
      </Dialog>
      <Button
        className={classes.more}
        variant="text"
        onClick={handleShowMoreClick}
        data-testid="CMCardMore"
      >
        MORE
      </Button>
    </>
  );
};

CMCardOverlay.defaultProps = {
  shortDescription:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
};

export default CMCardOverlay;
